import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Github, Linkedin, Mail, ChevronRight, Cpu } from "lucide-react";

gsap.registerPlugin(TextPlugin);

export const MobileUI = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const age = useMemo(() => {
    const birthDate = new Date("2001-09-11");
    const today = new Date();
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ageNow--;
    return ageNow;
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;

    const lines = terminalRef.current.querySelectorAll(".code-line");
    const originalTexts: string[] = [];
    
    lines.forEach((el) => {
      const p = el as HTMLElement;
      originalTexts.push(p.innerText);
      gsap.set(p, { text: "" });
    });

    const tl = gsap.timeline({ delay: 0.8 });

    // Fade in the whole card container first
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20, scale: 0.95 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    lines.forEach((el, index) => {
      const p = el as HTMLElement;
      tl.to(p, {
        duration: originalTexts[index].length * 0.015,
        text: originalTexts[index],
        ease: "none",
        onUpdate: function () {
          p.innerHTML = this.targets()[0].innerText + '<span class="terminal-cursor">|</span>';
        },
        onComplete: () => {
          p.innerHTML = originalTexts[index];
          if (index === lines.length - 1) {
            p.innerHTML += '<span class="terminal-cursor blinking">_</span>';
          }
        },
      }, index === 0 ? ">" : "+=0.1");
    });

    return () => { gsap.killTweensOf(containerRef.current); };
  }, []);

  return (
    <div className="mobile-container">
      <header className="mobile-header">
        <div className="status-indicator">
          <span className="blink-dot"></span>
          SYSTEM_ACTIVE
        </div>
        <h1 className="mobile-name">
          ARDIE <br /> DELA CRUZ
        </h1>
        <p className="mobile-sub">WEB DEVELOPER</p>
      </header>

      <main className="mobile-content">
        {/* THE TERMINAL CARD */}
        <div className="terminal-card-container" ref={containerRef}>
          <div className="card-glow" />
          
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
            </div>

            <div className="terminal-body">
              <div className="terminal-row meta-row">
                <span className="line-num">01</span>
                <p className="code-line highlight">
                  {`ID: RDCZ // CLASS: WEB_DVLPR`}
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">02</span>
                <p className="code-line">
                  It all started with gaming. I got into coding because I wanted to
                  build my own "perfect game."
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">03</span>
                <p className="code-line">
                  At 14, I was staring at walls of code
                  and documentations that made zero sense to me at that time, but I
                  was hooked.
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">04</span>
                <p className="code-line">
                  That "build-it-myself" mindset followed me through university and
                  into professional world.
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">05</span>
                <p className="code-line">
                  I’ve turned that energy into building
                  company websites and the internal portals that keep daily operations
                  running.
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">06</span>
                <p className="code-line">
                  I’m still driven by that same goal: creating products that look
                  sharp and feel seamless.
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">07</span>
                <p className="code-line">
                  Whether it's a game or a corporate system,
                  I believe tech should be an experience, not just a tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="mobile-nav-grid">
          <a href="https://github.com/ardee11" className="nav-item">
            <Github size={18} />
            <span>GITHUB</span>
            <ChevronRight size={14} className="dim" />
          </a>
          <a href="https://linkedin.com/in/ardie-dela-cruz" className="nav-item">
            <Linkedin size={18} />
            <span>LINKEDIN</span>
            <ChevronRight size={14} className="dim" />
          </a>
        </div>
      </main>

      <footer className="mobile-footer">
        <div className="desktop-callout">SWITCH TO DESKTOP FOR BETTER VIEWING EXPERIENCE</div>
      </footer>
    </div>
  );
};