import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

interface AvatarProps {
  setNodes: (nodes: any) => void;
}

export function Avatar({ setNodes }: AvatarProps) {
  const { scene, nodes } = useGLTF('/avatar.glb')

  useEffect(() => {
    if (nodes) {
      setNodes(nodes)
      // Initial Arm Pose
      if (nodes.LeftArm) nodes.LeftArm.rotation.z = -.5
      if (nodes.RightArm) nodes.RightArm.rotation.z = .5
    }
  }, [nodes, setNodes])

  return <primitive object={scene} scale={8} position={[0, -13.5, 4.5]} />
}