"use client";
import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function ScatterBubblesB() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // ENGINE ONLY (NO RENDER)
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // FIX: container MUST be relative + overflow hidden
    container.style.position = "relative";
    container.style.overflow = "hidden";

    const labels = ["Design", "Branding", "UI/UX", "Web", "Motion", "Logo"];

    const items = labels.map((text) => {
      const el = document.createElement("div");
      el.innerText = text;
      el.style.position = "absolute";
      el.style.padding = "18px 28px";
      el.style.borderRadius = "50px";
      el.style.background = "#000";
      el.style.color = "#fff";
      el.style.fontSize = "18px";
      el.style.whiteSpace = "nowrap";
      el.style.userSelect = "none";
      el.style.pointerEvents = "none";
      container.appendChild(el);

      const radius = 60;

      const body = Matter.Bodies.circle(
        Math.random() * (window.innerWidth - radius * 2) + radius,
        Math.random() * (window.innerHeight - radius * 2) + radius,
        radius,
        {
          restitution: 0.9,
          frictionAir: 0.02,
          inertia: Infinity,
        }
      );

      return { el, body, radius };
    });
    

    Matter.World.add(
      engine.world,
      items.map((i) => i.body)
    );

    // THIN WALLS (NEVER CAUSE OVERFLOW)
    const walls = [
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        0,
        window.innerWidth,
        10,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight,
        window.innerWidth,
        10,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        0,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true }
      ),
    ];
    Matter.World.add(engine.world, walls);

    // MOUSE REPELLING
    window.addEventListener("mousemove", (e) => {
      items.forEach(({ body }) => {
        const dx = body.position.x - e.clientX;
        const dy = body.position.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          Matter.Body.applyForce(body, body.position, {
            x: dx * 0.002,
            y: dy * 0.002,
          });
        }
      });
    });

    // SYNC HTML TO PHYSICS
    Matter.Events.on(engine, "afterUpdate", () => {
      items.forEach(({ el, body }) => {
        el.style.left = body.position.x - el.offsetWidth / 2 + "px";
        el.style.top = body.position.y - el.offsetHeight / 2 + "px";
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden"
    ></div>
  );
}







