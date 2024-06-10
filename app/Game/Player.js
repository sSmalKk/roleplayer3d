import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef, useState } from "react" // Added useState import
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import PlayerModel from "./Entity"

export function Player({setChunkPosition, initialPosition, speed, direction, frontVector, sideVector, rotation, lerp = THREE.MathUtils.lerp }) {
  const [playerPosition, setPlayerPosition] = useState(initialPosition); // Used useState to manage playerPosition
  const body = useRef()
  const ref = useRef()
  const rapier = useRapier()
  const [, get] = useKeyboardControls()

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get()
    const velocity = ref.current.linvel()
    // update camera
    state.camera.position.set(...ref.current.translation())
        // update hand
        body.current.children[0].rotation.x = lerp(body.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
        body.current.rotation.copy(state.camera.rotation)
        body.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    
    // movement
    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(state.camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    // jumping
    const world = rapier.world.raw()
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })

    // Update the playerPosition state with the current position
    const newPosition = ref.current.translation();
    setPlayerPosition(newPosition);
    setChunkPosition([
      Math.floor(newPosition.x / 10),
      Math.floor(newPosition.y / 10),
      Math.floor(newPosition.z / 10)
    ]);

  });
  const maxHeadRotation = Math.PI / 4; // Exemplo de rotação máxima da cabeça
  const lookDirection = new THREE.Vector3(1, 0, 0); // Usando Vector3 para representar a direção do olhar
 
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 5, 0 ]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
      <group ref={body} onPointerMissed={(e) => (body.current.children[0].rotation.x = -0.5)}>
      <PlayerModel position={[0, -1, 0]}/>
      </group>
    </>
  )
}
