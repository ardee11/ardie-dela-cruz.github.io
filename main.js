import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function Character({ pose }) {
  // Load the file you just uploaded
  const { nodes } = useGLTF('/avatar.glb') 
  const group = useRef()

  useEffect(() => {
    if (pose === 'about') {
      // "Arms Crossed" Pose via Code
      gsap.to(nodes.c_arm_fk_l.rotation, { x: 1.2, y: -0.5, z: 0.8, duration: 1 })
      gsap.to(nodes.c_arm_fk_r.rotation, { x: 1.2, y: 0.5, z: -0.8, duration: 1 })
      gsap.to(nodes.c_head_x.rotation, { x: 0.2, duration: 1 })
    } else if (pose === 'skills') {
      // "Thinking" or Neutral Pose
      gsap.to(nodes.c_arm_fk_l.rotation, { x: 0, y: 0, z: 0, duration: 1 })
      gsap.to(nodes.c_arm_fk_r.rotation, { x: 0, y: 0, z: 0, duration: 1 })
      gsap.to(nodes.c_head_x.rotation, { y: 0.5, duration: 1 })
    }
  }, [pose, nodes])

  return <primitive object={nodes.root} ref={group} />
}