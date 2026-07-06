import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

function Blob() {
  const mesh = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.3
    mesh.current.rotation.y = t * 0.15

    // gentle mouse parallax
    const targetX = (state.mouse.x * 0.4)
    const targetY = (state.mouse.y * 0.4)
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.03
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.03
  })

  return (
    <mesh ref={mesh} scale={1.6}>
      <icosahedronGeometry args={[1, 6]} />
      <MeshDistortMaterial
        color="#FFD400"
        distort={0.45}
        speed={1.6}
        roughness={0.35}
        metalness={0.1}
        wireframe
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.55 }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#2E5EFF" />
        <Blob />
      </Canvas>
    </div>
  )
}
