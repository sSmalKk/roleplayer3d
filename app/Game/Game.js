  import { Canvas } from "@react-three/fiber";
  import { Sky, PointerLockControls, KeyboardControls } from "@react-three/drei";
  import { Physics } from "@react-three/rapier";
  import { Player } from "./Player";
  import { World } from "./World";
  import { useEffect, useState, useRef } from "react";
  import * as THREE from "three";
  import create from "zustand";
  import PlayerModel from "./Entity"


  const useStore = create((set) => ({
    playerPosition: [0, 10, 0,1],
    setPlayerPosition: (newPosition) => set({ playerPosition: newPosition }),
    chunkPosition: [0, 0, 0,1],
    setChunkPosition: (newPosition) => set({ chunkPosition: newPosition }),
    border: false,
  }));

  
  export default function Game() {
    const [fps, setFps] = useState(0);
    const tickRef = useRef(0);

    const [chunkPosition, setChunkPosition] = useStore((state) => [
      state.chunkPosition,
      state.setChunkPosition,
    ]);

    const [speed] = useState(5);
    const [direction] = useState(new THREE.Vector3());
    const [frontVector] = useState(new THREE.Vector3());
    const [sideVector] = useState(new THREE.Vector3());
    const [rotation] = useState(new THREE.Vector3());

    useEffect(() => {
      let lastFrameTime = performance.now();
      let lastTickTime = performance.now();
      let tickCount = 0;

      const updateLoop = () => {
        const now = performance.now();
        const deltaTime = now - lastFrameTime;

        // Atualiza o FPS
        setFps(Math.floor(1000 / deltaTime));

        // Verifica se já passou 1 segundo desde a última atualização do tick
        if (now - lastTickTime >= 50) {
          // 50ms = 1 segundo / 20 ticks
          // Atualiza o tick
          tickCount++;
          lastTickTime = now; // Atualiza o tempo do último tick
        }

        // Atualiza o contador de ticks
        tickRef.current = tickCount;

        lastFrameTime = now;
        requestAnimationFrame(updateLoop);
      };

      // Inicia o loop de atualização
      updateLoop();

      // Retorno da função de efeito: cancela o loop de atualização
      return () => cancelAnimationFrame(updateLoop);
    }, []);
 const textureArray = {
    1: [
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg",
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg"
    ],
    // Adicione outras arrays de textura conforme necessário para IDs adicionais
    2: [
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg",
      "../assets/dirt.jpg", "../assets/dirt.jpg", "../assets/dirt.jpg"
    ],
    // Adicione mais arrays de textura conforme necessário
  };    
    
    const cubeConfigurations = {
      1: {
        type: "fixed",
        colliders: "cuboid",
        planes: [
          { position: [-0.5, 0, 0,1], rotation: [0, -Math.PI / 2, 0,1], textureIndex: 0 },
          { position: [0.5, 0, 0,1], rotation: [0, Math.PI / 2, 0,1], textureIndex: 1 },
          { position: [0, 0.5, 0,1], rotation: [-Math.PI / 2, 0, 0,1], textureIndex: 2 },
          { position: [0, -0.5, 0,1], rotation: [Math.PI / 2, 0, 0,1], textureIndex: 3 },
          { position: [0, 0, 0.5,1], rotation: [0, 0, 0,1], textureIndex: 4 },
          { position: [0, 0, -0.5,1], rotation: [0, Math.PI, 0,1], textureIndex: 5 }
        ]
      },
      // Adicione mais tipos de blocos conforme necessário
    };
    const cubesArray = [[[0 ,0 ,0],
      [0, 0, 0,1], [0, 0, 1,1], [0, 0, 2,1], [0, 0, 3,1], [0, 0, 4,1], [0, 0, 5,1], [0, 0, 6,1], [0, 0, 7,1], [0, 0, 8,1], [0, 0, 9,1],
      [1, 0, 0,1], [1, 0, 1,1], [1, 0, 2,1], [1, 0, 3,1], [1, 0, 4,1], [1, 0, 5,1], [1, 0, 6,1], [1, 0, 7,1], [1, 0, 8,1], [1, 0, 9,1],
      [2, 0, 0,1], [2, 0, 1,1], [2, 0, 2,1], [2, 0, 3,1], [2, 0, 4,1], [2, 0, 5,1], [2, 0, 6,1], [2, 0, 7,1], [2, 0, 8,1], [2, 0, 9,1],
      [3, 0, 0,1], [3, 0, 1,1], [3, 0, 2,1], [3, 0, 3,1], [3, 0, 4,1], [3, 0, 5,1], [3, 0, 6,1], [3, 0, 7,1], [3, 0, 8,1], [3, 0, 9,1],
      [4, 0, 0,1], [4, 0, 1,1], [4, 0, 2,1], [4, 0, 3,1], [4, 0, 4,1], [4, 0, 5,1], [4, 0, 6,1], [4, 0, 7,1], [4, 0, 8,1], [4, 0, 9,1],
      [5, 0, 0,1], [5, 0, 1,1], [5, 0, 2,1], [5, 0, 3,1], [5, 0, 4,1], [5, 0, 5,1], [5, 0, 6,1], [5, 0, 7,1], [5, 0, 8,1], [5, 0, 9,1],
      [6, 0, 0,1], [6, 0, 1,1], [6, 0, 2,1], [6, 0, 3,1], [6, 0, 4,1], [6, 0, 5,1], [6, 0, 6,1], [6, 0, 7,1], [6, 0, 8,1], [6, 0, 9,1],
      [7, 0, 0,1], [7, 0, 1,1], [7, 0, 2,1], [7, 0, 3,1], [7, 0, 4,1], [7, 0, 5,1], [7, 0, 6,1], [7, 0, 7,1], [7, 0, 8,1], [7, 0, 9,1],
      [8, 0, 0,1], [8, 0, 1,1], [8, 0, 2,1], [8, 0, 3,1], [8, 0, 4,1], [8, 0, 5,1], [8, 0, 6,1], [8, 0, 7,1], [8, 0, 8,1], [8, 0, 9,1],
      [9, 0, 0,1], [9, 0, 1,1], [9, 0, 2,1], [9, 0, 3,1], [9, 0, 4,1], [9, 0, 5,1], [9, 0, 6,1], [9, 0, 7,1], [9, 0, 8,1], [9, 0, 9,1]],
      [[1, 0, 0],
      [0, 0, 0,1], [0, 0, 1,1], [0, 0, 2,1], [0, 0, 3,1], [0, 0, 4,1], [0, 0, 5,1], [0, 0, 6,1], [0, 0, 7,1], [0, 0, 8,1], [0, 0, 9,1],
      [1, 0, 0,1], [1, 0, 1,1], [1, 0, 2,1], [1, 0, 3,1], [1, 0, 4,1], [1, 0, 5,1], [1, 0, 6,1], [1, 0, 7,1], [1, 0, 8,1], [1, 0, 9,1],
      [2, 0, 0,1], [2, 0, 1,1], [2, 0, 2,1], [2, 0, 3,1], [2, 0, 4,1], [2, 0, 5,1], [2, 0, 6,1], [2, 0, 7,1], [2, 0, 8,1], [2, 0, 9,1],
      [3, 0, 0,1], [3, 0, 1,1], [3, 0, 2,1], [3, 0, 3,1], [3, 0, 4,1], [3, 0, 5,1], [3, 0, 6,1], [3, 0, 7,1], [3, 0, 8,1], [3, 0, 9,1],
      [4, 0, 0,1], [4, 0, 1,1], [4, 0, 2,1], [4, 0, 3,1], [4, 0, 4,1], [4, 0, 5,1], [4, 0, 6,1], [4, 0, 7,1], [4, 0, 8,1], [4, 0, 9,1],
      [5, 0, 0,1], [5, 0, 1,1], [5, 0, 2,1], [5, 0, 3,1], [5, 0, 4,1], [5, 0, 5,1], [5, 0, 6,1], [5, 0, 7,1], [5, 0, 8,1], [5, 0, 9,1],
      [6, 0, 0,1], [6, 0, 1,1], [6, 0, 2,1], [6, 0, 3,1], [6, 0, 4,1], [6, 0, 5,1], [6, 0, 6,1], [6, 0, 7,1], [6, 0, 8,1], [6, 0, 9,1],
      [7, 0, 0,1], [7, 0, 1,1], [7, 0, 2,1], [7, 0, 3,1], [7, 0, 4,1], [7, 0, 5,1], [7, 0, 6,1], [7, 0, 7,1], [7, 0, 8,1], [7, 0, 9,1],
      [8, 0, 0,1], [8, 0, 1,1], [8, 0, 2,1], [8, 0, 3,1], [8, 0, 4,1], [8, 0, 5,1], [8, 0, 6,1], [8, 0, 7,1], [8, 0, 8,1], [8, 0, 9,1],
      [9, 0, 0,1], [9, 0, 1,1], [9, 0, 2,1], [9, 0, 3,1], [9, 0, 4,1], [9, 0, 5,1], [9, 0, 6,1], [9, 0, 7,1], [9, 0, 8,1], [9, 0, 9,1],]
    ];
   
    return (
      <>
        <div className="top-0 right-0" style={{ position: "fixed", zIndex: 99 }}>
          <h1>FPS: {Math.floor(fps)}</h1>
          <h1>TICK: {Math.floor(tickRef.current)}</h1>
        </div>
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
          ]}
        >
          <Canvas shadows camera={{ fov: 45 }} style={{ position: 'fixed', zIndex: 0 }} className="top-0 bottom-0 w-full h-full">
            <Sky sunPosition={[100, 20, 100]} />
            <ambientLight intensity={10} />
            <pointLight castShadow intensity={10} position={[100, 100, 100]} />
            <Physics gravity={[0, 0, 0]}>
              <Player setChunkPosition={setChunkPosition} initialPosition={[0, 100, 0]} speed={speed} direction={direction} frontVector={frontVector} sideVector={sideVector} rotation={rotation} />
              <PlayerModel position={[0, 5, 0]}/>

              <World
              texturesArray={textureArray}
              cubeConfigurations={cubeConfigurations}
                playerPosition={chunkPosition}
                cubesArray={cubesArray}
                clusterWidth={10}
                renderDistance={1}
                worldWidth={10}
                worldHeight={3}
              />
            </Physics>
            <PointerLockControls />
          </Canvas>
        </KeyboardControls>
      </>
    );
  }