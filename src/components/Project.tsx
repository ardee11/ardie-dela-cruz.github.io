import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Camera } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  stack: string[];
  index: number;
}

export const ProjectCard = ({
  title,
  description,
  stack,
  index,
}: ProjectProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const timestamp = new Date().toLocaleDateString();

  useEffect(() => {
    if (!cardRef.current) return;

    // IN: Glitchy terminal pop-in
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9, filter: "brightness(3) blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: 0.5,
        delay: 1 + index * 0.1, // Staggered entry
        ease: "back.out(1.2)",
      },
    );

    // OUT: Smooth glitch exit when unmounting
    return () => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          opacity: 0,
          scale: 0.95,
          filter: "brightness(0) blur(5px)",
          duration: 0.5,
          ease: "power2.in",
        });
      }
    };
  }, [index]);

  return (
    <div ref={cardRef} className="project-card cctv-style">
      <div className="project-visual">
        <div className="cctv-overlay">
          <div className="cctv-rec">
            <span className="rec-dot"></span> LIVE_FEED
          </div>
          <div className="cctv-cam-id">CH_0{index + 1}</div>
          <div className="cctv-timestamp">{timestamp}</div>
          <div className="cctv-coords">LAT: 34.05 / LON: -118.24</div>
        </div>

        <div className="hologram-scanline" style={{ opacity: 0.15 }} />

        <div className="preview-placeholder">
          <Camera size={40} strokeWidth={1} />
          <p className="status-blink">ENCRYPTED_SIGNAL_STABLE</p>
        </div>
      </div>

      <div className="project-content">
        <div className="project-text">
          <h3 className="project-title">{title}</h3>
          <p className="project-description italic-mono">{description}</p>
        </div>

        <div className="project-footer">
          <div className="project-stack">
            {stack.map((item) => (
              <span key={item} className="stack-item">
                [{item}]
              </span>
            ))}
          </div>
          <div className="project-arrow-circle">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
