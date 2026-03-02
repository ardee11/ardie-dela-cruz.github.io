import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

interface AvatarProps {
  setNodes: (nodes: any) => void;
}

export function Avatar({ setNodes }: AvatarProps) {
  const { scene, nodes } = useGLTF("/avatar.glb");

  useEffect(() => {
    if (nodes) {
      setNodes(nodes);
      
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (nodes.LeftArm) nodes.LeftArm.rotation.z = -0.5;
      if (nodes.RightArm) nodes.RightArm.rotation.z = 0.5;
    }

    return () => setNodes(null);
  }, [nodes, scene, setNodes]);

  return (
    <primitive 
      object={scene} 
      scale={8} 
      position={[0, -13.5, 4.5]} 
      dispose={null} 
    />
  );
}

useGLTF.preload("/avatar.glb");