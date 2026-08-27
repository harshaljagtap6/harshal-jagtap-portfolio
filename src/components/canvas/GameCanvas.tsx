"use client";

import React, { useRef, useEffect } from "react";
import {
  isCoarsePointer,
  isInteractiveTarget,
  prefersReducedMotion,
} from "./canvasEnv";

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  distanceTraveled: number;
  totalDistance: number;
  /** "r, g, b" triplet, so per-frame alpha strings need no colour parsing. */
  rgb: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  rgb: string;
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

const CYAN_RGB = "0, 240, 255";
const PURPLE_RGB = "189, 0, 255";

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

    const reducedMotion = prefersReducedMotion();
    const coarsePointer = isCoarsePointer();

    // Touch devices can't hover to aim, so they get fewer particles too.
    const sparkScale = coarsePointer ? 0.5 : 1;
    const maxSparks = coarsePointer ? 90 : 220;
    const maxLasers = coarsePointer ? 12 : 30;

    let animationFrameId = 0;
    let resizeFrameId = 0;
    const lasers: Laser[] = [];
    const sparks: Spark[] = [];
    const enemies: Enemy[] = [];
    let nextEnemyId = 0;

    const applyResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === canvas.width && height === canvas.height) return;
      canvas.width = width;
      canvas.height = height;
    };

    applyResize();

    // Aim at the middle of the screen until the pointer says otherwise.
    // Without this the stickman spends every touch session aiming at 0,0.
    mouseRef.current.x = canvas.width / 2;
    mouseRef.current.y = canvas.height / 2;

    // Track mouse coordinates globally
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Fire laser bullet on click
    const handleMouseClick = (e: MouseEvent) => {
      // The listener is on window, so without this a tap on a nav link or the
      // Unity canvas would also fire a shot underneath it.
      if (isInteractiveTarget(e.target)) return;

      // A tap has no hover, so the tap point is also the aim point.
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

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
        rgb: Math.random() > 0.5 ? CYAN_RGB : PURPLE_RGB // Cyan or Purple
      });

      // Discard the oldest shot rather than letting a held-down click grow
      // the array without bound.
      if (lasers.length > maxLasers) lasers.shift();

      // Apply recoil physics push
      recoilRef.current = 15;
      flashTimerRef.current = 4; // Muzzle flash frames
    };

    // Spawn sparks on impact or death
    const spawnImpactSparks = (
      x: number,
      y: number,
      rgb: string,
      count = 8,
      isLarge = false
    ) => {
      const scaled = Math.max(3, Math.round(count * sparkScale));
      for (let i = 0; i < scaled; i++) {
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
          rgb
        });
      }
      // Drop the oldest particles once the cap is reached.
      if (sparks.length > maxSparks) sparks.splice(0, sparks.length - maxSparks);
    };

    // Draws one complete frame. Runs on a loop normally, or exactly once when
    // the visitor has asked for reduced motion.
    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const screenWidth = canvas.width;
      const screenHeight = canvas.height;
      if (animate) gameFrameRef.current++;

      // Ground level feet base y-coordinate
      const groundY = screenHeight - 120;
      const playerX = screenWidth - 100;

      // Red damage screen overlay
      if (damageFlashRef.current > 0) {
        if (animate) damageFlashRef.current--;
        ctx.fillStyle = `rgba(239, 68, 68, ${0.12 * (damageFlashRef.current / 8)})`;
        ctx.fillRect(0, 0, screenWidth, screenHeight);
      }

      // Spawning enemies from left side (approx every 3 seconds)
      if (animate && gameFrameRef.current % 180 === 0 && enemies.length < 5) {
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
      if (animate) recoilRef.current *= 0.82;

      ctx.lineCap = "round";

      // Shooting Arm & Blaster (recoil shifts back along angle vector)
      const handX =
        shoulderX - Math.cos(angle) * recoilOffset * 0.45 + Math.cos(angle) * 22;
      const handY =
        shoulderY - Math.sin(angle) * recoilOffset * 0.45 + Math.sin(angle) * 22;

      // The whole figure goes into one path, then gets stroked twice: a wide
      // faint pass for the glow and a crisp pass on top. That replaces the old
      // per-limb shadowBlur, which was by far the most expensive call here.
      const player = new Path2D();
      player.moveTo(shoulderX + headRadius, shoulderY - headRadius - 8);
      player.arc(shoulderX, shoulderY - headRadius - 8, headRadius, 0, Math.PI * 2);
      player.moveTo(shoulderX, shoulderY - 8); // Spine
      player.lineTo(hipsX, hipsY);
      player.moveTo(hipsX, hipsY); // Left Leg
      player.lineTo(playerX - 12, groundY);
      player.moveTo(hipsX, hipsY); // Right Leg
      player.lineTo(playerX + 12, groundY);
      player.moveTo(shoulderX, shoulderY); // Left Arm (supporting)
      player.lineTo(shoulderX - 12, shoulderY + 12);
      player.moveTo(shoulderX, shoulderY); // Shooting Arm
      player.lineTo(handX, handY);

      ctx.strokeStyle = `rgba(${CYAN_RGB}, 0.18)`;
      ctx.lineWidth = 9;
      ctx.stroke(player);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 3.5;
      ctx.stroke(player);

      // Blaster body
      ctx.save();
      ctx.translate(handX, handY);
      ctx.rotate(angle);
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

      // Draw Muzzle Flash: faint wide disc under a white core, in place of
      // the old shadowBlur bloom.
      if (flashTimerRef.current > 0) {
        if (animate) flashTimerRef.current--;
        const barrelX = shoulderX + Math.cos(angle) * 32;
        const barrelY = shoulderY + Math.sin(angle) * 32;
        const flashRadius = Math.random() * 8 + 5;

        ctx.beginPath();
        ctx.arc(barrelX, barrelY, flashRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN_RGB}, 0.22)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(barrelX, barrelY, flashRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();
      }

      // 2. Update & Draw Enemies (Walking Stickmen in neon red)
      const enemyPath = new Path2D();
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        // Walk towards player
        if (animate) enemy.x += enemy.speed;

        // Walking cycle calculation for swing legs
        const walkCycle = (gameFrameRef.current + enemy.swingOffset) * 0.15;
        const swingAngle = Math.sin(walkCycle) * 12;

        const enemyHipsX = enemy.x;
        const enemyHipsY = enemy.y - 15;
        const enemyShoulderX = enemy.x;
        const enemyShoulderY = enemy.y - 35;

        enemyPath.moveTo(enemyShoulderX + headRadius, enemyShoulderY - headRadius - 8);
        enemyPath.arc(
          enemyShoulderX,
          enemyShoulderY - headRadius - 8,
          headRadius,
          0,
          Math.PI * 2
        );
        enemyPath.moveTo(enemyShoulderX, enemyShoulderY - 8); // Spine
        enemyPath.lineTo(enemyHipsX, enemyHipsY);
        enemyPath.moveTo(enemyHipsX, enemyHipsY); // Swinging Leg 1
        enemyPath.lineTo(enemy.x + swingAngle, enemy.y);
        enemyPath.moveTo(enemyHipsX, enemyHipsY); // Swinging Leg 2
        enemyPath.lineTo(enemy.x - swingAngle, enemy.y);
        enemyPath.moveTo(enemyShoulderX, enemyShoulderY); // Swinging Arms
        enemyPath.lineTo(enemy.x - swingAngle * 0.8, enemyShoulderY + 12);

        // Hitting the Player Base
        if (enemy.x >= playerX - 55) {
          // Trigger shield impact sparks
          spawnImpactSparks(playerX - 30, groundY - 20, CYAN_RGB, 15, false);

          // Apply damage flash and reset scoreboard
          damageFlashRef.current = 8;
          scoreRef.current = 0;

          // Remove enemy
          enemies.splice(i, 1);
        }
      }

      ctx.strokeStyle = "rgba(239, 68, 68, 0.18)";
      ctx.lineWidth = 8;
      ctx.stroke(enemyPath);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.95)"; // Neon Red Enemy
      ctx.lineWidth = 3;
      ctx.stroke(enemyPath);

      // 3. Update & Draw Lasers & Collision Detections
      // Trails are batched per colour so the whole volley is two strokes
      // rather than a shadowBlur stroke per bullet.
      const laserPaths = new Map<string, Path2D>();

      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        const prevX = laser.x;
        const prevY = laser.y;

        if (animate) {
          laser.x += laser.vx;
          laser.y += laser.vy;
          laser.distanceTraveled += Math.sqrt(
            laser.vx * laser.vx + laser.vy * laser.vy
          );
        }

        // Draw bullet trail line
        let path = laserPaths.get(laser.rgb);
        if (!path) {
          path = new Path2D();
          laserPaths.set(laser.rgb, path);
        }
        path.moveTo(prevX, prevY);
        path.lineTo(laser.x, laser.y);

        // Hit registration AABB checks
        let hitRegistered = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
          const enemy = enemies[j];

          // Enemy bounding box coordinates
          const leftBound = enemy.x - 15;
          const rightBound = enemy.x + 15;
          const topBound = enemy.y - 55;
          const bottomBound = enemy.y;

          if (
            laser.x >= leftBound && laser.x <= rightBound &&
            laser.y >= topBound && laser.y <= bottomBound
          ) {
            // Spark explosion at enemy center
            spawnImpactSparks(enemy.x, enemy.y - 25, laser.rgb, 18, true);

            // Increment Score
            scoreRef.current += 100;
            if (scoreRef.current > highScoreRef.current) {
              highScoreRef.current = scoreRef.current;
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "portfolio-shoot-highscore",
                  highScoreRef.current.toString()
                );
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
        if (
          laser.distanceTraveled >= laser.totalDistance ||
          laser.x < 0 || laser.x > screenWidth ||
          laser.y < 0 || laser.y > screenHeight
        ) {
          // Draw standard impact sparks
          spawnImpactSparks(laser.targetX, laser.targetY, laser.rgb, 8, false);
          lasers.splice(i, 1);
        }
      }

      for (const [rgb, path] of laserPaths) {
        ctx.strokeStyle = `rgba(${rgb}, 0.2)`;
        ctx.lineWidth = 7;
        ctx.stroke(path);
        ctx.strokeStyle = `rgb(${rgb})`;
        ctx.lineWidth = 2.5;
        ctx.stroke(path);
      }

      // 4. Draw sparks particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];

        if (animate) {
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.vy += 0.085; // Gravity
          spark.alpha -= spark.decay;
        }

        if (spark.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${spark.rgb}, ${spark.alpha})`;
        ctx.fill();
      }

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

      const scoreStr = scoreRef.current.toString().padStart(5, "0");
      const highStr = highScoreRef.current.toString().padStart(5, "0");
      ctx.fillText(`SCORE: ${scoreStr}  |  BEST: ${highStr}`, hudX, hudY);
    };

    // Coalesced through one animation frame; resize fires in bursts.
    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(() => {
        applyResize();
        // Resizing clears the canvas, and there is no loop to repaint it.
        if (reducedMotion) drawFrame(false);
      });
    };

    window.addEventListener("resize", handleResize);

    if (reducedMotion) {
      // Static scene: the player stands ready, nothing animates.
      drawFrame(false);
      return () => {
        cancelAnimationFrame(resizeFrameId);
        window.removeEventListener("resize", handleResize);
      };
    }

    if (!coarsePointer) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("click", handleMouseClick);

    // Draw Loop
    const draw = () => {
      drawFrame(true);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", handleResize);
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
