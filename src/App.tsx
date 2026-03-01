import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Loader, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HelpCircle, User, Briefcase, Award } from "lucide-react";

import { Avatar } from "./components/Avatar";
import { NavButton } from "./components/NavButton";
import { SkillBubble } from "./components/SkillBubble";
import { AboutCard } from "./components/About";
import { ProjectCard } from "./components/Project";
import { CertificateCard } from "./components/Certificates";

export default function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const overlayRef = useRef<HTMLDivElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);
  const loopRef = useRef<gsap.core.Timeline | null>(null);

  const [nodes, setNodes] = useState<any>(null);
  const [activeMode, setActiveMode] = useState<
    "home" | "about" | "skills" | "projects" | "certificates"
  >("home");

  const skillList = [
    { name: "React", icon: "/icons/react.png", color: "#61DAFB" },
    { name: "PostgreSQL", icon: "/icons/postgresql.png", color: "#336791" },
    { name: "Node.js", icon: "/icons/nodejs.webp", color: "#339933" },
    { name: "TypeScript", icon: "/icons/typescript.png", color: "#3178C6" },
    { name: "JavaScript", icon: "/icons/javascript.svg", color: "#a79826" },
    { name: "Tailwind", icon: "/icons/tailwind.png", color: "#06B6D4" },
    { name: "Google Cloud", icon: "/icons/google-cloud.png", color: "#4285F4" },
    { name: "Git", icon: "/icons/git.png", color: "#F05032" },
    { name: "Bootstrap", icon: "/icons/bootstrap.png", color: "#7952B3" },
    { name: "Vue.js", icon: "/icons/vue.png", color: "#4FC08D" },
    { name: "C++", icon: "/icons/c++.png", color: "#00599C" },
    { name: "Figma", icon: "/icons/figma.png", color: "#cc4820" },
    { name: "RESTful API", icon: "/icons/rest-api.png", color: "#8fbcb7" },
  ];

  const projectList = [
    {
      title: "Corporate Identity Hub",
      type: "Public Website",
      description:
        "Architected a high-fidelity marketing engine focused on sub-second performance and seamless interaction design.",
      stack: ["React", "TypeScript", "GSAP", "Three.js"],
    },
    {
      title: "Lumina Nexus",
      type: "Internal Portal",
      description:
        "Developed a mission-critical management system featuring role-based access, real-time data streaming, and automated reporting.",
      stack: ["Node.js", "PostgreSQL", "Socket.io", "Tailwind"],
    },
  ];

  const certList = [
    {
      name: "AWS Architect",
      icon: "/badge/cloud-eng.png",
      link: "",
      locked: true,
    },
    {
      name: "Cisco 700",
      icon: "/badge/cisco-700.png",
      link: "https://example.com",
      locked: false,
    },
    {
      name: "GCP Cloud Engineer",
      icon: "/badge/cloud-eng.png",
      link: "https://example.com",
      locked: false,
    },
    {
      name: "GWS Administrator",
      icon: "/badge/gws-admin.png",
      link: "https://example.com",
      locked: false,
    },
    { name: "Security+", icon: "/badge/cisco-700.png", link: "", locked: true },
  ];

  const moveCameraAndPose = (
    x: number,
    y: number,
    z: number,
    mode: "about" | "skills" | "home" | "projects" | "certificates",
  ) => {
    if (!cameraRef.current || !nodes) return;

    setActiveMode(mode);

    if (loopRef.current) {
      loopRef.current.kill();
      loopRef.current = null;

      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });

      const tlText = gsap.timeline();
      tlText.to(textRef.current, {
        left: "100%",
        xPercent: -100,
        x: -40,
        bottom: "20px",
        duration: 1.8,
        ease: "expo.inOut",
      });
      tlText.to(
        ".hero-name",
        {
          fontSize: "1.5rem",
          fontWeight: 600,
          duration: 1.8,
          ease: "expo.inOut",
        },
        0,
      );
      tlText.to(
        ".hero-sub",
        {
          fontSize: "0.5rem",
          letterSpacing: "0.3em",
          opacity: 0.8,
          duration: 1.8,
          ease: "expo.inOut",
        },
        0,
      );
    }

    if (cameraRef.current.position.z < 0) {
      gsap.set(cameraRef.current.position, { x: 0, y: 0, z: 10 });
    }

    const duration = 2.0;
    const ease = "power2.inOut";

    if (mode === "projects") {
      cameraRef.current.lookAt(0, 0.2, 0);
      gsap.to(cameraRef.current.position, { x, y, z, duration, ease });
    } else {
      gsap.to(cameraRef.current.position, {
        x,
        y,
        z,
        duration,
        ease,
        onUpdate: () => cameraRef.current.lookAt(0, 0.2, 0),
      });
    }

    // 4. AVATAR POSES
    if (mode === "about") {
      gsap.to(nodes.LeftArm.rotation, { x: 1, y: 0.05, z: 1, duration, ease });
      gsap.to(nodes.LeftForeArm.rotation, { x: 1.9, duration, ease });
      gsap.to(nodes.RightArm.rotation, {
        x: 1,
        y: -0.05,
        z: -0.7,
        duration,
        ease,
      });
      gsap.to(nodes.RightForeArm.rotation, { x: 1.85, duration, ease });
      gsap.to(nodes.Head.rotation, { x: -0.32, y: 0.15, z: 0, duration, ease });
    } else if (mode === "skills") {
      gsap.to(nodes.LeftArm.rotation, {
        x: 0.7,
        y: -1.2,
        z: -0.3,
        duration,
        ease,
      });
      gsap.to(nodes.LeftForeArm.rotation, { x: 1.6, duration, ease });
      gsap.to(nodes.RightArm.rotation, {
        x: 0.7,
        y: 1.2,
        z: 0.3,
        duration,
        ease,
      });
      gsap.to(nodes.RightForeArm.rotation, { x: 1.4, duration, ease });
      gsap.to(nodes.Head.rotation, { x: -0.1, y: 0, z: 0, duration, ease });
    } else if (mode === "projects") {
      gsap.to(nodes.Head.rotation, { x: -0.5, y: 0, z: 0, duration, ease });
    } else if (mode === "certificates") {
      gsap.to(nodes.LeftArm.rotation, {
        x: 0.6,
        y: 0.5,
        z: 0.1,
        duration,
        ease,
      });
      gsap.to(nodes.LeftForeArm.rotation, { x: 1.6, duration, ease });
      gsap.to(nodes.RightArm.rotation, {
        x: 0.8,
        y: -0.5,
        z: 0.1,
        duration,
        ease,
      });
      gsap.to(nodes.RightForeArm.rotation, { x: 1.4, duration, ease });
      gsap.to(nodes.Head.rotation, { x: -0.1, y: 0, z: 0, duration, ease });
    }
  };

  useEffect(() => {
    if (!cameraRef.current || !nodes) return;
    const tl = gsap.timeline({ repeat: -1 });
    loopRef.current = tl;
    const fadeOut = () =>
      tl.to(overlayRef.current, { opacity: 1, duration: 0.5 });
    const fadeIn = () =>
      tl.to(overlayRef.current, { opacity: 0, duration: 0.5 });

    tl.set(cameraRef.current.position, { x: 0, y: 0, z: 9 });
    tl.set(cameraRef.current, {
      onUpdate: () => cameraRef.current.lookAt(0, 0, 4),
    });
    fadeIn();
    tl.to(cameraRef.current.position, {
      x: 1.4,
      duration: 4,
      ease: "none",
      onUpdate: () => cameraRef.current.lookAt(0, 0, 4),
    });
    fadeOut();
    tl.set(cameraRef.current.position, { x: -3, y: -7, z: -5 });
    tl.set(cameraRef.current, {
      onUpdate: () => cameraRef.current.lookAt(0, -7, 4.5),
    });
    fadeIn();
    tl.to(cameraRef.current.position, {
      x: 3,
      duration: 4,
      ease: "none",
      onUpdate: () => cameraRef.current.lookAt(0, -7, 4.5),
    });
    fadeOut();
    tl.set(cameraRef.current.position, { x: -3, y: -12.5, z: 11 });
    tl.set(cameraRef.current, {
      onUpdate: () => cameraRef.current.lookAt(0, -11, 4.5),
    });
    fadeIn();
    tl.to(cameraRef.current.position, {
      x: 4,
      duration: 4,
      ease: "none",
      onUpdate: () => cameraRef.current.lookAt(0, -11, 4.5),
    });
    fadeOut();
    return () => {
      tl.kill();
    };
  }, [nodes]);

  return (
    <div className="main-container">
      <nav className="game-nav">
        <NavButton
          icon={HelpCircle}
          label="About"
          active={activeMode === "about"}
          onClick={() => moveCameraAndPose(4, -0.8, 10, "about")}
        />
        <NavButton
          icon={User}
          label="Skills"
          active={activeMode === "skills"}
          onClick={() => moveCameraAndPose(0, -5, 30, "skills")}
        />
        <NavButton
          icon={Briefcase}
          label="Projects"
          active={activeMode === "projects"}
          onClick={() => moveCameraAndPose(0, 20, 15, "projects")}
        />
        <NavButton
          icon={Award}
          label="Certificates"
          active={activeMode === "certificates"}
          onClick={() => moveCameraAndPose(0, -2, 20, "certificates")}
        />
      </nav>

      <div className="dots-vignette" />

      {activeMode === "about" && <AboutCard />}

      {activeMode === "skills" && (
        <div className="ferris-wheel-container">
          {skillList.map((skill, i) => (
            <SkillBubble
              key={skill.name}
              skill={skill}
              index={i}
              total={skillList.length}
            />
          ))}
        </div>
      )}

      {activeMode === "projects" && (
        <div className="projects-view-overlay">
          {projectList.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      )}

      {activeMode === "certificates" && (
        <div className="certificates-view-overlay">
          <div className="cert-row-flat">
            {certList.map((cert, i) => (
              <CertificateCard key={i} {...cert} index={i} />
            ))}
          </div>
        </div>
      )}

      <div
        className="canvas-wrapper"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <div
          ref={overlayRef}
          className="scene-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#030303",
            zIndex: 10,
            pointerEvents: "none",
            opacity: 0,
          }}
        />

        <Canvas shadows gl={{ alpha: true }}>
          <Suspense fallback={null}>
            <PerspectiveCamera
              makeDefault
              ref={cameraRef}
              position={[0, 0, 9]}
            />
            <Environment preset="city" />
            <spotLight
              position={[15, 15, -10]}
              intensity={5}
              angle={0.3}
              penumbra={1}
              castShadow
            />
            <pointLight
              position={[-15, 10, -10]}
              intensity={3}
              color="#2d4bff"
            />
            <ambientLight intensity={0.2} />
            <Avatar setNodes={setNodes} />
          </Suspense>
        </Canvas>
      </div>

      <div ref={textRef} className="hero-text-container">
        <h1 className="hero-name">ARDIE DELA CRUZ</h1>
        <p className="hero-sub">CREATIVE DEVELOPER & DESIGNER</p>
      </div>
      <Loader />
    </div>
  );
}
