"use client";

import React, { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseTimer: number;
  id: number;
  label: string;
}

interface Signal {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  color: string;
  depth: number;
  targetNodeId: number;
}

interface CodeStream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export default function AICanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let codeStreams: CodeStream[] = [];
    let nextNodeId = 0;

    const techLabels = [
      "n8n", "RAG", "LLM", "VectorDB", "FastAPI", "Docker", "AzureFn", 
      "Postgres", "Webhook", "Cron", "OpenAI", "Gemini", "Python", 
      "REST_API", "OAuth2", "SMTP", "IMAP", "LangChain"
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
      initCodeStreams();
    };

    const initNodes = () => {
      nodes = [];
      const density = 14000; // Screen area per node
      const numberOfNodes = Math.min(
        90,
        Math.floor((canvas.width * canvas.height) / density)
      );

      for (let i = 0; i < numberOfNodes; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 2,
          baseRadius: Math.random() * 2 + 2,
          pulseTimer: 0,
          id: nextNodeId++,
          label: techLabels[i % techLabels.length]
        });
      }
    };

    const initCodeStreams = () => {
      codeStreams = [];
      const numberOfStreams = Math.floor(canvas.width / 80);
      for (let i = 0; i < numberOfStreams; i++) {
        const streamLen = Math.floor(Math.random() * 15) + 10;
        const chars: string[] = [];
        for (let j = 0; j < streamLen; j++) {
          chars.push(Math.random() > 0.5 ? "1" : "0");
        }

        codeStreams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 1.5 + 0.8,
          chars,
          opacity: Math.random() * 0.025 + 0.015 // Keep it extremely faint as backdrop
        });
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.active = false;
    };

    // Cascade Signals
    const sendSignalsFromNode = (sourceNode: Node, depth: number) => {
      if (depth > 2) return;
      sourceNode.pulseTimer = 15; // Trigger concentric pulse expand

      const neighbors: Node[] = [];
      const connectionThreshold = 140;

      for (const target of nodes) {
        if (target.id === sourceNode.id) continue;
        const dx = target.x - sourceNode.x;
        const dy = target.y - sourceNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionThreshold) {
          neighbors.push(target);
        }
      }

      // Sort by closest distance
      neighbors.sort((a, b) => {
        const daX = a.x - sourceNode.x;
        const daY = a.y - sourceNode.y;
        const dbX = b.x - sourceNode.x;
        const dbY = b.y - sourceNode.y;
        return daX * daX + daY * daY - (dbX * dbX + dbY * dbY);
      });

      const limit = Math.min(3, neighbors.length);
      for (let i = 0; i < limit; i++) {
        const target = neighbors[i];
        signals.push({
          fromX: sourceNode.x,
          fromY: sourceNode.y,
          toX: target.x,
          toY: target.y,
          progress: 0,
          speed: Math.random() * 0.02 + 0.018,
          color: depth === 0 ? "#10b981" : "#3b82f6", // Emerald or Electric Blue
          depth: depth + 1,
          targetNodeId: target.id
        });
      }
    };

    const triggerRipple = (startX: number, startY: number, depth = 0) => {
      let closestNode: Node | null = null;
      let minDist = 120;

      for (const node of nodes) {
        const dx = node.x - startX;
        const dy = node.y - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closestNode = node;
        }
      }

      if (closestNode) {
        sendSignalsFromNode(closestNode, depth);
      } else if (depth === 0) {
        // Spawn active node if clicked in void
        const tempNode: Node = {
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: 3.5,
          baseRadius: 3.5,
          pulseTimer: 15,
          id: nextNodeId++,
          label: techLabels[Math.floor(Math.random() * techLabels.length)]
        };
        nodes.push(tempNode);
        sendSignalsFromNode(tempNode, 0);

        if (nodes.length > 120) {
          nodes.shift();
        }
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      triggerRipple(e.clientX, e.clientY, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleMouseClick);

    // Alive periodic triggers
    const randomTriggerInterval = setInterval(() => {
      if (nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        sendSignalsFromNode(randomNode, 1);
      }
    }, 3000);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const connectionThreshold = 140;

      // 1. Draw Digital Rain code stream background
      ctx.font = "9px monospace";
      for (const stream of codeStreams) {
        stream.y += stream.speed;
        if (stream.y > canvas.height) {
          stream.y = Math.random() * -200;
          stream.x = Math.random() * canvas.width;
        }

        // Draw character column
        for (let j = 0; j < stream.chars.length; j++) {
          const charY = stream.y + j * 12;
          if (charY < 0 || charY > canvas.height) continue;
          
          // Tail fades out
          const tailFade = 1 - j / stream.chars.length;
          ctx.fillStyle = `rgba(16, 185, 129, ${stream.opacity * tailFade})`;
          
          // Randomly fluctuate characters
          if (Math.random() > 0.98) {
            stream.chars[j] = Math.random() > 0.5 ? "1" : "0";
          }
          ctx.fillText(stream.chars[j], stream.x, charY);
        }
      }

      // 2. Update & Draw Nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse avoidance physics
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelDist = 130;

          if (dist < repelDist) {
            const force = (repelDist - dist) / repelDist;
            const angle = Math.atan2(dy, dx);
            node.x += Math.cos(angle) * force * 1.6;
            node.y += Math.sin(angle) * force * 1.6;
          }
        }

        // Concentric pulse decay
        if (node.pulseTimer > 0) {
          node.pulseTimer -= 0.45;
          node.radius = node.baseRadius + (node.pulseTimer / 15) * 4;

          // Render outer ring pulse
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.baseRadius + (1 - node.pulseTimer / 15) * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${node.pulseTimer / 15 * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          node.radius = node.baseRadius;
        }

        // Draw Node Center Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        if (node.pulseTimer > 0) {
          ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + (node.pulseTimer / 15) * 0.6})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#10b981";
        } else {
          ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw drifting labels next to nodes
        ctx.font = "9px var(--font-share-mono), Share Tech Mono, monospace";
        if (node.pulseTimer > 0) {
          ctx.fillStyle = "#10b981";
          ctx.shadowBlur = 4;
          ctx.shadowColor = "#10b981";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
          ctx.shadowBlur = 0;
        }
        ctx.fillText(node.label, node.x + 8, node.y + 3);
        ctx.shadowBlur = 0;
      }

      // 3. Draw connection lines
      ctx.lineWidth = 0.55;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionThreshold) {
            const alpha = (1 - dist / connectionThreshold) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 4. Update & Draw traveling signal pulses
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;

        // Follow drift nodes
        const targetNode = nodes.find((n) => n.id === sig.targetNodeId);
        if (targetNode) {
          sig.toX = targetNode.x;
          sig.toY = targetNode.y;
        }

        const currentX = sig.fromX + (sig.toX - sig.fromX) * sig.progress;
        const currentY = sig.fromY + (sig.toY - sig.fromY) * sig.progress;

        // Draw glowing pulse dot
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = sig.color;
        ctx.fill();

        if (sig.progress >= 1) {
          if (targetNode) {
            triggerRipple(targetNode.x, targetNode.y, sig.depth);
          }
          signals.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 5. Draw Diagnostic Target HUD around active cursor
      if (mouse.active) {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;

        // Draw crosshair circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
        ctx.setLineDash([4, 4]); // Dashed circle
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Coordinates text logs
        ctx.font = "8px var(--font-share-mono), Share Tech Mono, monospace";
        ctx.fillStyle = "rgba(16, 185, 129, 0.35)";
        ctx.fillText(`LOC: [${mouse.x}, ${mouse.y}]`, mouse.x + 12, mouse.y - 12);
        ctx.fillText(`SYS: RAG_ACTIVE`, mouse.x + 12, mouse.y + 18);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleMouseClick);
      clearInterval(randomTriggerInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
