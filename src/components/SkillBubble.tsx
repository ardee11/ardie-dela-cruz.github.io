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

    const angle = (index / total) * Math.PI * 2;
    const radius = 350;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    gsap.set(bubbleRef.current, { x, y });

    const speed = 50; 
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(pivotRef.current, {
      rotation: 360,
      duration: speed, 
      ease: "none",
      onUpdate: () => {
        if (!bubbleRef.current || !pivotRef.current) return;
        
        const bounds = bubbleRef.current.getBoundingClientRect();
        const parentBounds = pivotRef.current.getBoundingClientRect();
        
        if (parentBounds) {
          const isBottomHalf = bounds.top + bounds.height / 2 > parentBounds.top;
          gsap.set(bubbleRef.current, { 
            opacity: isBottomHalf ? 0 : 1,
            pointerEvents: isBottomHalf ? "none" : "auto" 
          });
        }
      }
    }, 0);

    tl.to(bubbleRef.current, {
      rotation: -360,
      duration: speed,
      ease: "none"
    }, 0);

    gsap.fromTo(bubbleRef.current, 
      { scale: 0 },
      { scale: 1, duration: 1, delay: index * 0.1, ease: "back.out(1.7)" }
    );
  }, [index, total]);

  return (
  <div ref={pivotRef} className="wheel-pivot">
    <div ref={bubbleRef} className="skill-bubble-ferris">
      <div 
        className="bubble-circle" 
        style={{ 
          borderColor: `${skill.color}66`, 
          boxShadow: `0 0 25px ${skill.color}44, inset 0 0 10px ${skill.color}33`,
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