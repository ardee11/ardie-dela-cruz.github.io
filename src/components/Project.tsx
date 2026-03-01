import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  stack: string[];
  index: number;
  link: string;
  image: string; // New prop for the screenshot
}

export const ProjectCard = ({
  title,
  description,
  stack,
  index,
  link,
  image,
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
        delay: 1 + index * 0.1,
        ease: "back.out(1.2)",
      },
    );

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
        {/* CCTV Interface Overlays */}
        <div className="cctv-overlay">
          <div className="cctv-rec">
            <span className="rec-dot"></span> LIVE
          </div>
          <div className="cctv-cam-id">CH_0{index + 1}</div>
          <div className="cctv-timestamp">{timestamp}</div>
        </div>

        {/* The Project Image */}
        <img
          src={image}
          alt={title}
          className="project-image-bg"
          loading="lazy"
        />

        {/* Tech Decor */}
        <div className="hologram-scanline" />
        <div className="image-status-overlay">
          <p className="status-blink">SIGNAL_STABLE</p>
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

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-wrapper"
          >
            <div className="project-arrow-circle">
              <ArrowRight size={16} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
