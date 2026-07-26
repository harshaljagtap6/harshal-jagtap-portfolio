"use client";

import React, { useRef, useEffect } from "react";

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  distanceTraveled: number;
  totalDistance: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Enemy {
  x: number;
  y: number;
  speed: number;
  id: number;
  width: number;
  height: number;
  health: number;
  swingOffset: number;
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const recoilRef = useRef(0);
  const flashTimerRef = useRef(0);
  
  // Game session refs (to read inside animation loop safely)
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const damageFlashRef = useRef(0);
  const gameFrameRef = useRef(0);

  useEffect(() => {
    // Load high score from localStorage
    if (typeof window !== "undefined") {
      const savedHighScore = localStorage.getItem("portfolio-shoot-highscore");
      if (savedHighScore) {
        highScoreRef.current = parseInt(savedHighScore, 10);
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lasers: Laser[] = [];
    let sparks: Spark[] = [];
    let enemies: Enemy[] = [];
    let nextEnemyId = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Track mouse coordinates globally
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Fire laser bullet on click
    const handleMouseClick = (e: MouseEvent) => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Bottom right coordinates for Player Stickman shoulder joint
      const shoulderX = screenWidth - 100;
      const shoulderY = screenHeight - 140;

      // Calculate angle pointing to mouse
      const angle = Math.atan2(e.clientY - shoulderY, e.clientX - shoulderX);

      // Gun barrel end coordinates
      const gunLength = 32;
      const barrelX = shoulderX + Math.cos(angle) * gunLength;
      const barrelY = shoulderY + Math.sin(angle) * gunLength;

      // Distance calculations
      const dx = e.clientX - barrelX;
      const dy = e.clientY - barrelY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) return; // Prevent self-fires

      const speed = 25; // Laser speed
      const vx = (dx / dist) * speed;
      const vy = (dy / dist) * speed;

      // Add laser projectile
      lasers.push({
        x: barrelX,
        y: barrelY,
        vx,
        vy,
        targetX: e.clientX,
        targetY: e.clientY,
        distanceTraveled: 0,
        totalDistance: dist,
        color: Math.random() > 0.5 ? "#00f0ff" : "#bd00ff" // Cyan or Purple
      });

      // Apply recoil physics push
      recoilRef.current = 15;
      flashTimerRef.current = 4; // Muzzle flash frames
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);

    // Spawn sparks on impact or death
    const spawnImpactSparks = (x: number, y: number, color: string, count = 8, isLarge = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isLarge ? 6 : 4) + (isLarge ? 3 : 2);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isLarge ? 2 : 1), // Upward buoyancy
          radius: Math.random() * (isLarge ? 3 : 2) + 1,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
          color
        });
      }
    };

    // Draw Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const screenWidth = canvas.width;
      const screenHeight = canvas.height;
      gameFrameRef.current++;

      // Ground level feet base y-coordinate
      const groundY = screenHeight - 120;
      const playerX = screenWidth - 100;

      // Red damage screen overlay
      if (damageFlashRef.current > 0) {
        damageFlashRef.current--;
        ctx.fillStyle = `rgba(239, 68, 68, ${0.12 * (damageFlashRef.current / 8)})`;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
      }

      // Spawning enemies from left side (approx every 3 seconds)
      if (gameFrameRef.current % 180 === 0 && enemies.length < 5) {
        enemies.push({
          x: -30,
          y: groundY,
          speed: Math.random() * 0.45 + 0.75, // Walk speed
          id: nextEnemyId++,
          width: 24,
          height: 55,
          health: 1,
          swingOffset: Math.random() * 100
        });
      }

      // 1. Draw Player Stickman
      const shoulderX = playerX;
      const shoulderY = groundY - 35;
      const hipsX = playerX;
      const hipsY = groundY - 15;
      const headRadius = 9;

      const mouse = mouseRef.current;
      const angle = Math.atan2(mouse.y - shoulderY, mouse.x - shoulderX);

      // Recoil dampening
      const recoilOffset = recoilRef.current;
      recoilRef.current *= 0.82;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 240, 255, 0.4)";

      // Draw Head
      ctx.beginPath();
      ctx.arc(shoulderX, shoulderY - headRadius - 8, headRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Spine
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY - 8);
      ctx.lineTo(hipsX, hipsY);
      ctx.stroke();

      // Left Leg
      ctx.beginPath();
      ctx.moveTo(hipsX, hipsY);
      ctx.lineTo(playerX - 12, groundY);
      ctx.stroke();

      // Right Leg
      ctx.beginPath();
      ctx.moveTo(hipsX, hipsY);
      ctx.lineTo(playerX + 12, groundY);
      ctx.stroke();

      // Left Arm (supporting)
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(shoulderX - 12, shoulderY + 12);
      ctx.stroke();

      // Shooting Arm & Blaster (recoil shifts back along angle vector)
      const handX = shoulderX - Math.cos(angle) * recoilOffset * 0.45 + Math.cos(angle) * 22;
      const handY = shoulderY - Math.sin(angle) * recoilOffset * 0.45 + Math.sin(angle) * 22;

      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY);
      ctx.lineTo(handX, handY);
      ctx.stroke();

      // Blaster body
      ctx.save();
      ctx.translate(handX, handY);
      ctx.rotate(angle);
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00f0ff";
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-6, -1);
      ctx.lineTo(14, -1);
      ctx.stroke();

      // Blaster stock details
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#bd00ff";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-3, 6);
      ctx.stroke();
      ctx.restore();

      // Draw Muzzle Flash
      if (flashTimerRef.current > 0) {
        flashTimerRef.current--;
        const barrelX = shoulderX + Math.cos(angle) * 32;
        const barrelY = shoulderY + Math.sin(angle) * 32;
        ctx.beginPath();
        ctx.arc(barrelX, barrelY, Math.random() * 8 + 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f0ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Update & Draw Enemies (Walking Stickmen in neon red/purple)
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(239, 68, 68, 0.95)"; // Neon Red Enemy
      ctx.shadowColor = "rgba(239, 68, 68, 0.4)";

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        // Walk towards player
        enemy.x += enemy.speed;

        // Walking cycle calculation for swing legs
        const walkCycle = (gameFrameRef.current + enemy.swingOffset) * 0.15;
        const swingAngle = Math.sin(walkCycle) * 12;

        const enemyHipsX = enemy.x;
        const enemyHipsY = enemy.y - 15;
        const enemyShoulderX = enemy.x;
        const enemyShoulderY = enemy.y - 35;

        // Draw Enemy Head
        ctx.beginPath();
        ctx.arc(enemyShoulderX, enemyShoulderY - headRadius - 8, headRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Spine
        ctx.beginPath();
        ctx.moveTo(enemyShoulderX, enemyShoulderY - 8);
        ctx.lineTo(enemyHipsX, enemyHipsY);
        ctx.stroke();

        // Swinging Leg 1
        ctx.beginPath();
        ctx.moveTo(enemyHipsX, enemyHipsY);
        ctx.lineTo(enemy.x + swingAngle, enemy.y);
        ctx.stroke();

        // Swinging Leg 2
        ctx.beginPath();
        ctx.moveTo(enemyHipsX, enemyHipsY);
        ctx.lineTo(enemy.x - swingAngle, enemy.y);
        ctx.stroke();

        // Swinging Arms (running/walking pose)
        ctx.beginPath();
        ctx.moveTo(enemyShoulderX, enemyShoulderY);
        ctx.lineTo(enemy.x - swingAngle * 0.8, enemyShoulderY + 12);
        ctx.stroke();

        // Hitting the Player Base
        if (enemy.x >= playerX - 55) {
          // Trigger shield impact sparks
          spawnImpactSparks(playerX - 30, groundY - 20, "#00f0ff", 15, false);
          
          // Apply damage flash and reset scoreboard
          damageFlashRef.current = 8;
          scoreRef.current = 0;
          
          // Remove enemy
          enemies.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 3. Update & Draw Lasers & Collision Detections
      ctx.lineWidth = 2.5;
      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        const prevX = laser.x;
        const prevY = laser.y;

        laser.x += laser.vx;
        laser.y += laser.vy;
        laser.distanceTraveled += Math.sqrt(laser.vx * laser.vx + laser.vy * laser.vy);

        // Draw bullet trail line
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(laser.x, laser.y);
        ctx.strokeStyle = laser.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = laser.color;
        ctx.stroke();

        // Hit registration AABB checks
        let hitRegistered = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
          const enemy = enemies[j];
          
          // Enemy bounding box coordinates
          const leftBound = enemy.x - 15;
          const rightBound = enemy.x + 15;
          const topBound = enemy.y - 55;
          const bottomBound = enemy.y;

          if (laser.x >= leftBound && laser.x <= rightBound && 
              laser.y >= topBound && laser.y <= bottomBound) {
            
            // Spark explosion at enemy center
            spawnImpactSparks(enemy.x, enemy.y - 25, laser.color, 18, true);
            
            // Increment Score
            scoreRef.current += 100;
            if (scoreRef.current > highScoreRef.current) {
              highScoreRef.current = scoreRef.current;
              if (typeof window !== "undefined") {
                localStorage.setItem("portfolio-shoot-highscore", highScoreRef.current.toString());
              }
            }

            // Remove hit target and trigger bullet termination
            enemies.splice(j, 1);
            hitRegistered = true;
            break;
          }
        }

        if (hitRegistered) {
          lasers.splice(i, 1);
          continue;
        }

        // Distance range checks
        if (laser.distanceTraveled >= laser.totalDistance || 
            laser.x < 0 || laser.x > screenWidth || 
            laser.y < 0 || laser.y > screenHeight) {
          
          // Draw standard impact sparks
          spawnImpactSparks(laser.targetX, laser.targetY, laser.color, 8, false);
          lasers.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 4. Draw sparks particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.085; // Gravity
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = spark.alpha;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = spark.color;
        ctx.fill();
        ctx.restore();
      }
      ctx.shadowBlur = 0;

      // 5. Draw Retro Arcade Score HUD directly on canvas
      const hudX = Math.max(20, screenWidth - 320);
      const hudY = screenHeight - 40;

      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(hudX - 10, hudY - 20, 240, 30);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(hudX - 10, hudY - 20, 240, 30);

      // Score string drawing
      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 11px var(--font-orbitron), Orbitron, monospace";
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 4;
      
      const scoreStr = scoreRef.current.toString().padStart(5, "0");
      const highStr = highScoreRef.current.toString().padStart(5, "0");
      ctx.fillText(`SCORE: ${scoreStr}  |  BEST: ${highStr}`, hudX, hudY);
      
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 opacity-90"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
