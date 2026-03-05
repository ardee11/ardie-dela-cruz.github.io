import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export const AboutCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const age = useMemo(() => {
    const birthDate = new Date("2001-09-11");
    const today = new Date();
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow--;
    }
    return ageNow;
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const paras = cardRef.current.querySelectorAll(".dossier-para");
    const footer = cardRef.current.querySelector(".dossier-footer");
    const metaItems = cardRef.current.querySelectorAll(".meta-item");
    const divider = cardRef.current.querySelector(".dossier-divider");

    const originalTexts: string[] = [];
    paras.forEach((el) => {
      const p = el as HTMLElement;
      originalTexts.push(p.innerText);
      gsap.set(p, { text: "" });
    });

    gsap.set(cardRef.current, { opacity: 0, x: 50, scaleY: 0 });
    gsap.set([footer, divider, ...metaItems], { opacity: 0 });

    const tl = gsap.timeline({ delay: 1 });

    tl.to(cardRef.current, {
      opacity: 1,
      x: 0,
      scaleY: 1,
      duration: 0.4,
      ease: "power4.out",
    });

    tl.to([footer, divider, ...metaItems], { opacity: 1, duration: 0.1 }, "<");

    tl.to(
      cardRef.current,
      {
        y: "+=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
      "<",
    );

    paras.forEach((el, index) => {
      const p = el as HTMLElement;

      tl.to(
        p,
        {
          duration: originalTexts[index].length * 0.005,
          text: originalTexts[index],
          ease: "none",
          onUpdate: function () {
            p.innerHTML =
              this.targets()[0].innerText +
              '<span class="typing-cursor">|</span>';
          },
          onComplete: () => {
            p.innerHTML = originalTexts[index];

            if (index === paras.length - 1) {
              p.innerHTML += '<span class="typing-cursor">_</span>';
            }
          },
        },
        index === 0 ? "<" : "-=0.01",
      );
    });

    return () => {
      gsap.killTweensOf(cardRef.current);
    };
  }, []);

  return (
    <div className="hologram-wrapper">
      <div ref={cardRef} className="hologram-card">
        <div className="hologram-scanline" />
        <h2 className="hologram-title" data-text="ORIGIN_STORY">
          CHARACTER_ORIGIN_STORY
        </h2>

        <div className="hologram-content">
          <div className="profile-meta-grid">
            <div className="meta-item">
              <span className="meta-label">
                LVL: <span className="meta-value">{age}</span>
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">
                CLASS: <span className="meta-value">WEB_DVLPR</span>{" "}
              </span>
            </div>
          </div>

          <div className="dossier-divider" />

          <p className="dossier-para">
            It all started with gaming. I got into coding because I wanted to
            build my own "perfect game." At 14, I was staring at walls of code
            and documentations that made zero sense to me at that time, but I
            was hooked.
          </p>

          <p className="dossier-para">
            That "build-it-myself" mindset followed me through university and
            into professional world. I’ve turned that energy into building
            company websites and the internal portals that keep daily operations
            running.
          </p>

          <p className="dossier-para">
            I’m still driven by that same goal: creating products that look
            sharp and feel seamless. Whether it's a game or a corporate system,
            I believe tech should be an experience, not just a tool.
          </p>

          <div className="dossier-footer">
            <span className="status-blink">●</span> READY_FOR_NEW_CHALLENGES
          </div>
        </div>
      </div>
    </div>
  );
};
