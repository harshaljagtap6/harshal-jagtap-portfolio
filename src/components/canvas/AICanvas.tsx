"use client";

import React, { useRef, useEffect } from "react";
import {
  isCoarsePointer,
  isInteractiveTarget,
  prefersReducedMotion,
} from "./canvasEnv";

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
  /** Per-row rgba strings, precomputed so the draw loop allocates nothing. */
  colors: string[];
}

const CONNECTION_THRESHOLD = 140;
/** Connection lines are drawn as this many batched paths, not one stroke per pair. */
const ALPHA_BUCKETS = 5;
const MAX_CONNECTION_ALPHA = 0.14;

export default function AICanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = prefersReducedMotion();
    const coarsePointer = isCoarsePointer();

    // Touch devices never get the mouse-driven visuals, so spend far less on them.
    const nodeDensity = coarsePointer ? 26000 : 14000;
    const maxNodes = coarsePointer ? 40 : 90;
    const maxTempNodes = coarsePointer ? 55 : 120;
    const streamSpacing = coarsePointer ? 130 : 80;

    let animationFrameId = 0;
    let resizeFrameId = 0;
    let nodes: Node[] = [];
    const signals: Signal[] = [];
    let codeStreams: CodeStream[] = [];
    let nextNodeId = 0;

    // Rebuilt once per frame so signals resolve their target in O(1) instead
    // of scanning every node.
    const nodeById = new Map<number, Node>();

    const techLabels = [
      "n8n", "RAG", "LLM", "VectorDB", "FastAPI", "Docker", "AzureFn",
      "Postgres", "Webhook", "Cron", "OpenAI", "Gemini", "Python",
      "REST_API", "OAuth2", "SMTP", "IMAP", "LangChain"
    ];

    const initNodes = () => {
      nodes = [];
      const numberOfNodes = Math.min(
        maxNodes,
        Math.floor((canvas.width * canvas.height) / nodeDensity)
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
      const numberOfStreams = Math.floor(canvas.width / streamSpacing);
      for (let i = 0; i < numberOfStreams; i++) {
        const streamLen = Math.floor(Math.random() * 15) + 10;
        const opacity = Math.random() * 0.025 + 0.015; // Extremely faint backdrop
        const chars: string[] = [];
        const colors: string[] = [];
        for (let j = 0; j < streamLen; j++) {
          chars.push(Math.random() > 0.5 ? "1" : "0");
          // Tail fade depends only on the row index, so it is fixed per stream.
          colors.push(`rgba(16, 185, 129, ${opacity * (1 - j / streamLen)})`);
        }

        codeStreams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          speed: Math.random() * 1.5 + 0.8,
          chars,
          colors
        });
      }
    };

    // Squared distance boundaries per alpha bucket, so the pair loop never
    // needs Math.sqrt.
    const bucketBoundsSq: number[] = [];
    for (let b = 1; b <= ALPHA_BUCKETS; b++) {
      const edge = CONNECTION_THRESHOLD * (1 - b / ALPHA_BUCKETS);
      bucketBoundsSq.push(edge * edge);
    }
    const connectionThresholdSq = CONNECTION_THRESHOLD * CONNECTION_THRESHOLD;

    const applyResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === canvas.width && height === canvas.height) return;

      const previousWidth = canvas.width;
      const previousHeight = canvas.height;
      const widthChanged = width !== previousWidth;

      canvas.width = width;
      canvas.height = height;

      // A width change is a real layout change, so rebuild the scene. A
      // height-only change is usually just the mobile URL bar showing or
      // hiding, so keep the existing nodes and rescale them instead of
      // resetting the whole scene on every scroll.
      if (widthChanged || nodes.length === 0) {
        initNodes();
        initCodeStreams();
        return;
      }

      const scaleY = height / (previousHeight || height);
      for (const node of nodes) {
        node.y *= scaleY;
      }
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

    applyResize();

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

      const neighbors: { node: Node; distSq: number }[] = [];

      for (const target of nodes) {
        if (target.id === sourceNode.id) continue;
        const dx = target.x - sourceNode.x;
        const dy = target.y - sourceNode.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connectionThresholdSq) {
          neighbors.push({ node: target, distSq });
        }
      }

      // Sort by closest distance
      neighbors.sort((a, b) => a.distSq - b.distSq);

      const limit = Math.min(3, neighbors.length);
      for (let i = 0; i < limit; i++) {
        const target = neighbors[i].node;
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
      let minDistSq = 120 * 120;

      for (const node of nodes) {
        const dx = node.x - startX;
        const dy = node.y - startY;
        const distSq = dx * dx + dy * dy;
        if (distSq < minDistSq) {
          minDistSq = distSq;
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

        if (nodes.length > maxTempNodes) {
          nodes.shift();
        }
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      // The listener is on window, so without this a tap on a nav link or the
      // Unity canvas would also ripple underneath it.
      if (isInteractiveTarget(e.target)) return;
      triggerRipple(e.clientX, e.clientY, 0);
    };

    // Draws one complete frame. Runs on a loop normally, or exactly once when
    // the visitor has asked for reduced motion.
    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // 1. Draw Digital Rain code stream background
      ctx.font = "9px monospace";
      for (const stream of codeStreams) {
        if (animate) {
          stream.y += stream.speed;
          if (stream.y > canvas.height) {
            stream.y = Math.random() * -200;
            stream.x = Math.random() * canvas.width;
          }
        }

        // Draw character column
        for (let j = 0; j < stream.chars.length; j++) {
          const charY = stream.y + j * 12;
          if (charY < 0 || charY > canvas.height) continue;

          ctx.fillStyle = stream.colors[j];

          // Randomly fluctuate characters
          if (animate && Math.random() > 0.98) {
            stream.chars[j] = Math.random() > 0.5 ? "1" : "0";
          }
          ctx.fillText(stream.chars[j], stream.x, charY);
        }
      }

      // 2. Update & Draw Nodes
      nodeById.clear();
      for (const node of nodes) {
        nodeById.set(node.id, node);

        if (animate) {
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

            if (dist < repelDist && dist > 0) {
              const force = (repelDist - dist) / repelDist;
              node.x += (dx / dist) * force * 1.6;
              node.y += (dy / dist) * force * 1.6;
            }
          }

          // Concentric pulse decay
          if (node.pulseTimer > 0) {
            node.pulseTimer -= 0.45;
          }
        }

        if (node.pulseTimer > 0) {
          const pulse = node.pulseTimer / 15;
          node.radius = node.baseRadius + pulse * 4;

          // Render outer ring pulse
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.baseRadius + (1 - pulse) * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${pulse * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Cheap stand-in for the old shadowBlur bloom: one wide, faint disc.
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${pulse * 0.16})`;
          ctx.fill();
        } else {
          node.radius = node.baseRadius;
        }

        // Draw Node Center Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          node.pulseTimer > 0
            ? `rgba(16, 185, 129, ${0.4 + (node.pulseTimer / 15) * 0.6})`
            : "rgba(16, 185, 129, 0.35)";
        ctx.fill();
      }

      // 2b. Draw drifting labels, grouped by state so font and fillStyle are
      // set twice per frame rather than twice per node.
      ctx.font = "9px var(--font-share-mono), Share Tech Mono, monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
      for (const node of nodes) {
        if (node.pulseTimer <= 0) ctx.fillText(node.label, node.x + 8, node.y + 3);
      }
      ctx.fillStyle = "#10b981";
      for (const node of nodes) {
        if (node.pulseTimer > 0) ctx.fillText(node.label, node.x + 8, node.y + 3);
      }

      // 3. Draw connection lines, batched into one path per alpha bucket. This
      // was a beginPath/strokeStyle/stroke per pair, i.e. hundreds of draw
      // calls a frame; it is now at most ALPHA_BUCKETS of them.
      ctx.lineWidth = 0.55;
      const bucketPaths: Path2D[] = [];
      for (let b = 0; b < ALPHA_BUCKETS; b++) bucketPaths.push(new Path2D());

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distSq = dx * dx + dy * dy;

          if (distSq >= connectionThresholdSq) continue;

          // Bucket 0 is the faintest, i.e. the most distant pair.
          let bucket = 0;
          while (bucket < ALPHA_BUCKETS - 1 && distSq < bucketBoundsSq[bucket]) {
            bucket++;
          }

          const path = bucketPaths[bucket];
          path.moveTo(nodeA.x, nodeA.y);
          path.lineTo(nodeB.x, nodeB.y);
        }
      }

      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const alpha = ((b + 0.5) / ALPHA_BUCKETS) * MAX_CONNECTION_ALPHA;
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.stroke(bucketPaths[b]);
      }

      // 4. Update & Draw traveling signal pulses
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        if (animate) sig.progress += sig.speed;

        // Follow drift nodes
        const targetNode = nodeById.get(sig.targetNodeId);
        if (targetNode) {
          sig.toX = targetNode.x;
          sig.toY = targetNode.y;
        }

        const currentX = sig.fromX + (sig.toX - sig.fromX) * sig.progress;
        const currentY = sig.fromY + (sig.toY - sig.fromY) * sig.progress;

        // Glow without shadowBlur: a faint wide disc under a solid core.
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        ctx.fillStyle =
          sig.color === "#10b981"
            ? "rgba(16, 185, 129, 0.18)"
            : "rgba(59, 130, 246, 0.18)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.fill();

        if (sig.progress >= 1) {
          if (targetNode) {
            triggerRipple(targetNode.x, targetNode.y, sig.depth);
          }
          signals.splice(i, 1);
        }
      }

      // 5. Draw Diagnostic Target HUD around active cursor
      if (mouse.active) {
        ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
        ctx.lineWidth = 1;

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
    };

    window.addEventListener("resize", handleResize);

    if (reducedMotion) {
      // Static neural-net still frame: same visual language, no animation.
      drawFrame(false);
      return () => {
        cancelAnimationFrame(resizeFrameId);
        window.removeEventListener("resize", handleResize);
      };
    }

    if (!coarsePointer) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("click", handleMouseClick);

    // Alive periodic triggers. requestAnimationFrame is already throttled to a
    // standstill in a hidden tab, so without this guard the interval would keep
    // queueing signals that all burst at once when the tab is focused again.
    const randomTriggerInterval = setInterval(() => {
      if (document.hidden) return;
      if (nodes.length > 0) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        sendSignalsFromNode(randomNode, 1);
      }
    }, 3000);

    // Animation Loop
    const animate = () => {
      drawFrame(true);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", handleResize);
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
