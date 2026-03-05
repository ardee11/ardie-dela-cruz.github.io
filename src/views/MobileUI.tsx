import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, ChevronRight,ChevronDown } from "lucide-react";

import "../styles/mobile/index.css";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export const MobileUI = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null); 
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!terminalRef.current || !heroRef.current || !scrollIndicatorRef.current || !containerRef.current) return;

  const scrollerSelector = ".mobile-container";
  const h1 = heroRef.current.querySelector(".mobile-hero-name") as HTMLElement;
  const pSub = heroRef.current.querySelector(".mobile-hero-sub") as HTMLElement;
  const bounceTarget = scrollIndicatorRef.current.querySelector(".scroll-bounce-container");

  gsap.set([h1, pSub], { text: "" });
  gsap.set(scrollIndicatorRef.current, { opacity: 0 });
  gsap.set(containerRef.current, { opacity: 0, y: 50 });

  const heroTl = gsap.timeline({ delay: 0.5 });
  heroTl
    .to(h1, { duration: 1.0, text: "ARDIE <br/> DELA CRUZ", ease: "none" })
    .to(pSub, { duration: 0.6, text: "WEB DEVELOPER", ease: "none" }, "+=0.2")
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.5,
      onComplete: () => {
        gsap.to(bounceTarget, {
          y: 10,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });

  ScrollTrigger.create({
    scroller: scrollerSelector,
    trigger: heroRef.current,
    start: "top top",
    end: "30% top", 
    onUpdate: (self) => {
      if (self.progress === 0) {
        gsap.to(scrollIndicatorRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
      } 
      else if (self.progress > 0.1) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
      }
    }
  });

  gsap.to(containerRef.current, {
    scrollTrigger: {
      trigger: containerRef.current,
      scroller: scrollerSelector,
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });

  const expItems = document.querySelectorAll(".exp-group");
  expItems.forEach((item) => {
    gsap.fromTo(item, 
      { opacity: 0, x: 10 },
      {
        scrollTrigger: {
          trigger: item,
          scroller: scrollerSelector,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out"
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf([containerRef.current, h1, pSub, scrollIndicatorRef.current, bounceTarget]);
  };
}, []);

  return (
    <div className="mobile-container">
      <header className="mobile-header" ref={heroRef}>
        <div className="mobile-hero-text-container">
          <div className="status-indicator">
            <span className="blink-dot"></span>
            SYSTEM_ACTIVE
          </div>
          <h1 className="mobile-hero-name">
            ARDIE <br /> DELA CRUZ
          </h1>
          <p className="mobile-hero-sub blinking-cursor">WEB DEVELOPER</p>
        </div>

        <div className="scroll-wrapper" ref={scrollIndicatorRef} style={{ opacity: 0 }}>
          <div className="scroll-bounce-container">
            <div className="scroll-circle">
              <ChevronDown size={18} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </header>

      <main className="mobile-content">
        <div className="terminal-card-container" ref={containerRef}>
          <div className="card-glow" />
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-file-info">about_me.sys</div>
            </div>

            <div className="terminal-body" ref={terminalRef}>
              <div className="terminal-row meta-row">
                <span className="line-num">01</span>
                <p className="code-line highlight">{`ID: RDCZ // CLASS: WEB_DVLPR`}</p>
              </div>

              <div className="terminal-row">
                <span className="line-num">02</span>
                <p className="code-line">
                  It all started with gaming. I got into coding because I wanted to
                  build my own "perfect game." At 14, I was staring at walls of code
                  and documentations that made zero sense to me at that time, but I
                  was hooked.
                </p>
              </div>

              <div className="terminal-row">
                <span className="line-num">03</span>
                <p className="code-line">
                  That "build-it-myself" mindset followed me through university and
                  into professional world. I’ve turned that energy into building
                  company websites and the internal portals that keep daily operations
                  running.
                </p>
              </div>
              
              <div className="terminal-row">
                <span className="line-num">04</span>
                <p className="code-line">
                  I’m still driven by that same goal: creating products that look
                  sharp and feel seamless. Whether it's a game or a corporate system,
                  I believe tech should be an experience, not just a tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="experience-section">
          <div className="exp-group">
            <div className="exp-marker">
              <div className="exp-dot" />
              <span className="exp-year">Sept 2024 - Present</span>
            </div>
            <div className="exp-details">
              <p className="exp-story">
                Right after I graduated with my Computer Science degree in August 2024, 
                I hit the ground running. By September, I joined EZTech IT Solutions
                as a Systems Engineer. 
                <br /><br />
                It’s been an exciting challenge because I wear two hats: one as a Software Engineer
                building custom portals that made internal operations 30% faster, 
                and another as a Systems Administrator managing cloud infrastructure of our clients, 
                acting as the main contact, where I would handle Level 1 support and address clients' concerns
                and Google Workspace security. I love the balance of building apps 
                while making sure the entire system's backbone is rock solid.
                </p>
            </div>
          </div>

          <div className="exp-group">
            <div className="exp-marker">
              <div className="exp-dot" />
              <span className="exp-year">Feb - Apr 2024</span>
            </div>
            <div className="exp-details">
              <p className="exp-story">
                My real "coding genesis" happened during my internship at Pixel8 Web Solutions. 
                This wasn't just about learning the different technology tools, it was about learning how a professional team operate and work together. 
                <br /><br />
                We had daily huddles to make sure no one was left behind, and I learned the importance of 
                collaboration between UI/UX and backend teams. I got my hands dirty with Git, VueJS, Quasar Framework and real-world 
                deployments, and I was even chosen for leadership training by my supervisor—which really 
                boosted my confidence in how I handle technical projects today.
              </p>
            </div>
          </div>
        </section>

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
        <div className="desktop-callout">2026</div>
      </footer>
    </div>
  );
};