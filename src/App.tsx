import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Loader, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Avatar } from "./components/Avatar";
import { DesktopUI } from "./views/DesktopUI";
// import { MobileUI } from "./views/MobileUI";
import { useAvatarController } from "./hooks/avatarController";

export default function App() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const [nodes, setNodes] = useState<any>(null);
  const [isBlinking, setIsBlinking] = useState(true);
  const [activeMode, setActiveMode] = useState<any>("home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { moveCameraAndPose, overlayRef, textRef } = useAvatarController(
    cameraRef, nodes, isMobile, setActiveMode, setIsBlinking
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main-container">
      {!isMobile && (
        <>
          <DesktopUI 
            activeMode={activeMode} 
            moveCameraAndPose={moveCameraAndPose} 
            isBlinking={isBlinking} 
            textRef={textRef} 
          />
          
          <div className="canvas-wrapper">
            <div ref={overlayRef} className="scene-overlay" />
            <Canvas 
              shadows={{ type: THREE.PCFShadowMap }}
              gl={{ 
                alpha: true, 
                antialias: true 
              }}
            >
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 9]} />
                <Environment preset="city" />
                <spotLight position={[15, 15, -10]} intensity={5} angle={0.3} penumbra={1} castShadow />
                <pointLight position={[-15, 10, -10]} intensity={3} color="#2d4bff" />
                <ambientLight intensity={0.2} />
                <Avatar setNodes={setNodes} />
              </Suspense>
            </Canvas>
          </div>
        </>
      )}
      {/* {!isMobile ? (
        <DesktopUI 
          activeMode={activeMode} 
          moveCameraAndPose={moveCameraAndPose} 
          isBlinking={isBlinking} 
          textRef={textRef} 
        />
      ) : (
        <MobileUI 
          activeMode={activeMode} 
          setActiveMode={setActiveMode} 
        />
      )} */}
      <Loader />
    </div>
  );
}