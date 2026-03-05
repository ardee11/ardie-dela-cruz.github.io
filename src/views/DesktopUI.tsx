import { HelpCircle, User, Briefcase, Award, Github, Linkedin } from "lucide-react";
import { NavButton } from "../components/NavButton";
import { AboutCard } from "../components/About";
import { SkillBubble } from "../components/SkillBubble";
import { ProjectCard } from "../components/Project";
import { CertificateCard } from "../components/Certificates";
import { SKILL_LIST, PROJECT_LIST, CERT_LIST } from "../constants/index";

import "../styles/desktop/navigation.css";
import "../styles/desktop/components/about.css";
import "../styles/desktop/components/certificates.css";
import "../styles/desktop/components/skills.css";
import "../styles/desktop/components/hero.css";
import "../styles/desktop/components/projects.css";

interface DesktopUIProps {
  activeMode: string;
  moveCameraAndPose: (x: number, y: number, z: number, mode: string) => void;
  isBlinking: boolean;
  textRef: React.RefObject<HTMLDivElement>;
  overlayRef: React.RefObject<HTMLDivElement>;
}

export const DesktopUI: React.FC<DesktopUIProps> = ({ 
  activeMode, 
  moveCameraAndPose, 
  isBlinking, 
  textRef
}) => {
  return (
    <>
      <nav className="game-nav">
        <NavButton icon={HelpCircle} label="About" active={activeMode === "about"} onClick={() => moveCameraAndPose(4, -0.8, 10, "about")} />
        <NavButton icon={User} label="Skills" active={activeMode === "skills"} onClick={() => moveCameraAndPose(0, -5, 30, "skills")} />
        <NavButton icon={Briefcase} label="Projects" active={activeMode === "projects"} onClick={() => moveCameraAndPose(-15, 1, 15, "projects")} />
        <NavButton icon={Award} label="Certificates" active={activeMode === "certificates"} onClick={() => moveCameraAndPose(0, -2, 21, "certificates")} />
      </nav>

      <div className="system-hud-right">
        <div className="hud-line" />
        <span className="hud-label">LOCATION: PH </span>
        <span className="hud-time">{new Date().toLocaleTimeString()}</span>
      </div>

      <div className="social-nav">
        <a href="https://github.com/ardee11" target="_blank" rel="noopener noreferrer" className="icon-btn">
          <Github size={20} />
          <span className="tooltip">GitHub</span>
        </a>
        <a href="https://linkedin.com/in/ardie-dela-cruz" target="_blank" rel="noopener noreferrer" className="icon-btn">
          <Linkedin size={20} />
          <span className="tooltip">LinkedIn</span>
        </a>
      </div>

      {activeMode === "about" && <AboutCard />}
      {activeMode === "skills" && (
        <div className="ferris-wheel-container">
          {SKILL_LIST.map((skill, i) => (
            <SkillBubble key={skill.name} skill={skill} index={i} total={SKILL_LIST.length} />
          ))}
        </div>
      )}
      {activeMode === "projects" && (
        <div className="projects-view-overlay">
          {PROJECT_LIST.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      )}
      {activeMode === "certificates" && (
        <div className="certificates-view-overlay">
          <div className="cert-row-flat">
            {CERT_LIST.map((cert, i) => (
              <CertificateCard key={i} {...cert} index={i} />
            ))}
          </div>
        </div>
      )}

      <div ref={textRef} className="hero-text-container" style={{ opacity: 0 }}>
        <h1 className="hero-name"></h1>
        <p className={`hero-sub ${isBlinking ? "blinking-cursor" : ""}`}></p>
      </div>
    </>
  );
};