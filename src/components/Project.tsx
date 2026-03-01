import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  stack: string[];
  index: number;
  link: string;
  image: string;
  year: number;
}

export const ProjectCard = ({
  title,
  description,
  stack,
  index,
  link,
  image,
  year,
}: ProjectProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Use context to ensure clean scoping
    let ctx = gsap.context(() => {
      // 1. Kill any existing tweens to prevent the "double fade"
      gsap.killTweensOf(cardRef.current);

      // 2. Clear initial state
      gsap.set(cardRef.current, { opacity: 0, y: 30 });

      // 3. Play ONLY the entrance
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: 1,
        delay: 1 + index * 0.25,
        ease: "expo.out",
      });
    }, cardRef);

    // REMOVED: The gsap.to opacity 0 exit animation.
    // This was causing the "fading out" glitch on click.
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card cctv-style"
      style={{ opacity: 0 }} // Prevents initial flicker
    >
      <div className="project-visual">
        <div className="cctv-overlay">
          <div className="cctv-rec">
            <span className="rec-dot"></span> LIVE
          </div>
          <div className="cctv-timestamp">{year}</div>
        </div>

        <img
          src={image}
          alt={title}
          className="project-image-bg"
          loading="lazy"
        />
        <div className="hologram-scanline" />
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
