import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Stars } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function Earth({ zoom }) {

  const meshRef = useRef()

const texture = new THREE.TextureLoader().load(
"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
)

  useFrame((state) => {

    meshRef.current.rotation.y += 0.0015

    if (zoom && state.camera.position.z > 1.2) {
      state.camera.position.z -= 0.01
    }

  })

  return (
    <Sphere ref={meshRef} args={[2,64,64]}>
      <meshStandardMaterial map={texture}/>
    </Sphere>
  )
}

export default function Globe({ zoom }) {

  return (
    <Canvas camera={{ position:[0,0,4] }}>

      <ambientLight intensity={1.8}/>
      <directionalLight position={[5,5,5]}/>

      <Stars
        radius={100}
        depth={50}
        count={600}
        factor={4}
      />

      <Earth zoom={zoom}/>

    </Canvas>
  )
}