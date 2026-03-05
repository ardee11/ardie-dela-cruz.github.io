import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

type AvatarNodes = {
  [key: string]: any; 
};

export const useAvatarController = (
  cameraRef: React.RefObject<THREE.PerspectiveCamera>,
  nodes: AvatarNodes | null,
  isMobile: boolean,
  setActiveMode: (mode: string) => void,
  setIsBlinking: (blinking: boolean) => void
) => {
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null!);
  const textRef = useRef<HTMLDivElement>(null!);

  const moveCameraAndPose = (x: number, y: number, z: number, mode: any) => {
    if (isMobile || !cameraRef.current || !nodes) return;
    
    setActiveMode(mode);
    setIsBlinking(false);

    if (loopRef.current) {
      loopRef.current.kill();
      loopRef.current = null;
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      
      const tlText = gsap.timeline();

      tlText.to(textRef.current, { 
        left: "100%",
        top: "100%",
        xPercent: -100, 
        yPercent: -100,
        x: -40,
        y: -70,
        duration: 1.5, 
        ease: "expo.inOut",
        onStart: () => {
          gsap.set(textRef.current, { 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "flex-end" 
          });
        }
      })
      .to(".hero-name", { 
        fontSize: "1.5rem", 
        textAlign: "right",
        lineHeight: "1",
        duration: 1.5, 
        ease: "expo.inOut" 
      }, 0)
      .to(".hero-sub", {
        fontSize: "0.8rem",
        textAlign: "right",
        duration: 1.5,
        ease: "expo.inOut"
      }, 0);
    }

    if (cameraRef.current.position.z < 0) gsap.set(cameraRef.current.position, { x: 0, y: 0, z: 10 });

    const duration = 2.0;
    const ease = "power2.inOut";

    if (mode === "projects") {
      gsap.to(cameraRef.current.position, { x, y, z, duration, ease, onStart: () => cameraRef.current.lookAt(0, y, 0) });
    } else {
      gsap.to(cameraRef.current.position, { x, y, z, duration, ease, onUpdate: () => cameraRef.current.lookAt(0, 0.2, 0) });
    }

    const poses: any = {
      about: () => {
        gsap.to(nodes.LeftArm.rotation, { x: 1, y: 0.05, z: 1, duration, ease });
        gsap.to(nodes.LeftForeArm.rotation, { x: 1.9, duration, ease });
        gsap.to(nodes.RightArm.rotation, { x: 1, y: -0.05, z: -0.7, duration, ease });
        gsap.to(nodes.RightForeArm.rotation, { x: 1.85, duration, ease });
        gsap.to(nodes.Head.rotation, { x: -0.32, y: 0.15, z: 0, duration, ease });
      },
      skills: () => {
        gsap.to(nodes.LeftArm.rotation, { x: 0.7, y: -1.2, z: -0.3, duration, ease });
        gsap.to(nodes.LeftForeArm.rotation, { x: 1.6, duration, ease });
        gsap.to(nodes.RightArm.rotation, { x: 0.7, y: 1.2, z: 0.3, duration, ease });
        gsap.to(nodes.RightForeArm.rotation, { x: 1.4, duration, ease });
        gsap.to(nodes.Head.rotation, { x: -0.1, y: 0, z: 0, duration, ease });
      },
      projects: () => {
        gsap.to(nodes.Head.rotation, { x: -0.5, y: 0, z: 0, duration, ease });
      },
      certificates: () => {
        gsap.to(nodes.LeftArm.rotation, { x: 0.6, y: 0.5, z: 0.1, duration, ease });
        gsap.to(nodes.LeftForeArm.rotation, { x: 1.6, duration, ease });
        gsap.to(nodes.RightArm.rotation, { x: 0.8, y: -0.5, z: 0.1, duration, ease });
        gsap.to(nodes.RightForeArm.rotation, { x: 1.4, duration, ease });
        gsap.to(nodes.Head.rotation, { x: -0.1, y: 0, z: 0, duration, ease });
      }
    };
    if (poses[mode]) poses[mode]();
  };

  useEffect(() => {
    if (!cameraRef.current || !nodes || isMobile) return;
    const tl = gsap.timeline({ repeat: -1 });
    loopRef.current = tl;
    const fade = (op: number) => tl.to(overlayRef.current, { opacity: op, duration: 0.5 });
    
    tl.set(cameraRef.current.position, { x: 0, y: 0, z: 9 });
    tl.set(cameraRef.current, { onUpdate: () => cameraRef.current.lookAt(0, 0, 4) });
    fade(0);
    tl.to(cameraRef.current.position, { x: 1.4, duration: 4, ease: "none", onUpdate: () => cameraRef.current.lookAt(0, 0, 4) });
    fade(1);
    tl.set(cameraRef.current.position, { x: -3, y: -7, z: -5 });
    tl.set(cameraRef.current, { onUpdate: () => cameraRef.current.lookAt(0, -7, 4.5) });
    fade(0);
    tl.to(cameraRef.current.position, { x: 3, duration: 4, ease: "none", onUpdate: () => cameraRef.current.lookAt(0, -7, 4.5) });
    fade(1);
    tl.set(cameraRef.current.position, { x: -3, y: -12.5, z: 11 });
    tl.set(cameraRef.current, { onUpdate: () => cameraRef.current.lookAt(0, -11, 4.5) });
    fade(0);
    tl.to(cameraRef.current.position, { x: 4, duration: 4, ease: "none", onUpdate: () => cameraRef.current.lookAt(0, -11, 4.5) });
    fade(1);
    return () => { tl.kill(); };
  }, [nodes, isMobile]);

  useEffect(() => {
    if (!nodes || isMobile) return;
    gsap.set(textRef.current, { opacity: 1 });
    const tl = gsap.timeline();
    tl.to(".hero-name", { duration: 1.5, text: "ARDIE DELA CRUZ", ease: "none" })
      .to(".hero-sub", { duration: 2, text: "WEB DEVELOPER", ease: "none" }, "-=0.5");
  }, [nodes, isMobile]);

  return { moveCameraAndPose, overlayRef, textRef };
};