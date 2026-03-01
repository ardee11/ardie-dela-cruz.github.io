import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CertProps {
  name: string;
  icon: string;
  link: string;
  locked?: boolean;
  index: number;
}

export const CertificateCard = ({
  name,
  icon,
  link,
  locked,
  index,
}: CertProps) => {
  const badgeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!badgeRef.current) return;

    gsap.fromTo(
      badgeRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 1.0 + index * 0.1,
        ease: "back.out(1.7)",
      },
    );
  }, [index]);

  return (
    <div className="badge-wrapper">
      <a
        href={locked ? undefined : link}
        target="_blank"
        rel="noopener noreferrer"
        className={`badge-container ${locked ? "is-locked" : "is-unlocked"}`}
        ref={badgeRef}
        onClick={(e) => locked && e.preventDefault()}
      >
        <img src={icon} alt={name} className="badge-icon" />
        <div className="badge-tooltip">{locked ? "????" : name}</div>
      </a>
    </div>
  );
};
