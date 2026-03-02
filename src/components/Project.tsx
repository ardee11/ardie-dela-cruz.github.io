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

    let ctx = gsap.context(() => {
      gsap.killTweensOf(cardRef.current);

      const isMobile = window.innerWidth < 768;
      const responsiveY = isMobile ? 15 : 30;
      const responsiveDelay = isMobile ? 0.2 + index * 0.1 : 1 + index * 0.25;

      gsap.set(cardRef.current, { opacity: 0, y: responsiveY });

      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "brightness(1) blur(0px)",
        duration: isMobile ? 0.6 : 1,
        delay: responsiveDelay,
        ease: "expo.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="project-card cctv-style"
      style={{ opacity: 0 }}
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