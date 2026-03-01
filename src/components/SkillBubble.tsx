import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SkillBubbleProps {
  skill: { name: string; icon: string; color: string };
  index: number;
  total: number;
}

export const SkillBubble = ({ skill, index, total }: SkillBubbleProps) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const pivotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pivotRef.current || !bubbleRef.current) return;

    // 1. Initial Position: Spread them out evenly in a circle
    const angle = (index / total) * Math.PI * 2;
    const radius = 350; // Wide radius for that sparse, airy feel

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    gsap.set(bubbleRef.current, { x, y });

    // Define a single variable so they never get out of sync
    const speed = 50; 

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(pivotRef.current, {
      rotation: 360,
      duration: speed, // Updated to 80
      ease: "none",
      onUpdate: () => {
        if (!bubbleRef.current || !pivotRef.current) return;
        
        const bounds = bubbleRef.current.getBoundingClientRect();
        const parentBounds = pivotRef.current.getBoundingClientRect();
        
        if (parentBounds) {
          // Logic stays the same, but now runs slower
          const isBottomHalf = bounds.top + bounds.height / 2 > parentBounds.top;
          gsap.set(bubbleRef.current, { 
            opacity: isBottomHalf ? 0 : 1,
            pointerEvents: isBottomHalf ? "none" : "auto" 
          });
        }
      }
    }, 0);

    // Counter-rotation MUST match the speed exactly
    tl.to(bubbleRef.current, {
      rotation: -360,
      duration: speed, // Updated to 80
      ease: "none"
    }, 0);

    // Initial pop-in
    gsap.fromTo(bubbleRef.current, 
      { scale: 0 },
      { scale: 1, duration: 1, delay: index * 0.1, ease: "back.out(1.7)" }
    );
  }, [index, total]);

  return (
  // Inside your SkillBubble return
  <div ref={pivotRef} className="wheel-pivot">
    <div ref={bubbleRef} className="skill-bubble-ferris">
      <div 
        className="bubble-circle" 
        style={{ 
          // 1. Dynamic Border 
          borderColor: `${skill.color}66`, 
          // 2. Dynamic Glow
          boxShadow: `0 0 25px ${skill.color}44, inset 0 0 10px ${skill.color}33`,
          // 3. Dynamic Background Tint (10% opacity)
          backgroundColor: `${skill.color}30`,
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="skill-icon" 
          style={{ filter: `drop-shadow(0 0 8px ${skill.color}88)` }} 
        />
      </div>
      <span className="skill-label-outside">
        {skill.name}
      </span>
    </div>
  </div>
  );
};