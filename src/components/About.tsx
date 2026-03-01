import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

export const AboutCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const age = useMemo(() => {
    const birthDate = new Date('2001-09-11');
    const today = new Date(); // Current date in 2026
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow--;
    }
    return ageNow;
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.set(cardRef.current, { opacity: 0, x: 50, scaleY: 0 });

    gsap.to(cardRef.current, {
      opacity: 1,
      x: 0,
      scaleY: 1,
      duration: 0.8,
      delay: 1.2,
      ease: "power4.out",
      onComplete: () => {
        gsap.to(cardRef.current, {
          y: "+=10",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, []);

  return (
    <div className="hologram-wrapper">
      <div ref={cardRef} className="hologram-card">
        <div className="hologram-scanline" />
        
        <h2 className="hologram-title" data-text="PERSONNEL_DOSSIER">PERSONNEL_DOSSIER</h2>
        
        <div className="hologram-content">
          {/* --- PROFILE DATA HEADER --- */}
          <div className="profile-meta-grid">
            <div className="meta-item">
              <span className="meta-label">AGE: </span>
              <span className="meta-value">{age}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">DOB: </span>
              <span className="meta-value">SEPTEMBER 11, 2001</span>
            </div>
          </div>

          <div className="dossier-divider" />

          {/* --- NARRATIVE TEXT --- */}
          <p className="dossier-para">
            I am a dedicated <strong>Systems Engineer</strong> currently driving technical 
            innovation at <strong>EZTECH IT SOLUTIONS</strong>. 
          </p>

          <p className="dossier-para">
            Beyond standard systems administration, I have a proven track record in full-cycle product development. 
            I have architected and deployed production-ready POS systems and corporate web ecosystems that serve 
            as the digital backbone for modern enterprises.
          </p>

          <p className="dossier-para">
            Ideating, designing, and creating high-impact products. 
            Obsessed with modern and trending aesthetics that push 
            the boundaries of digital interaction.
          </p>
          
        </div>
      </div>
    </div>
  );
};