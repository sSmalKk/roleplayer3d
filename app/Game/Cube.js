import { useCallback, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import create from "zustand";

const useCubeStore = create((set) => ({
  selectedCube: null,
  selectedFace: null,
  selectedMouseButton: null,
  setSelectedCube: (coords, faceIndex, mouseButton) =>
    set({ selectedCube: coords, selectedFace: faceIndex, selectedMouseButton: mouseButton }),
}));

export const Cubes = ({ cubes, texture, blockstate }) => {
  const setSelectedCube = useCubeStore((state) => state.setSelectedCube);

  const handleCubeClick = (coords, faceIndex, mouseButton) => {
    setSelectedCube(coords, faceIndex, mouseButton);
  };

  return cubes.map((coords, index) => {
    const [x, y, z, id] = coords; // Capturando o id também
  
  
    // Verifica se há um cubo adjacente em cada direção
    const hasCubeLeft = cubes.some(([cx, cy, cz]) => cx === x - 1 && cy === y && cz === z);
    const hasCubeRight = cubes.some(([cx, cy, cz]) => cx === x + 1 && cy === y && cz === z);
    const hasCubeTop = cubes.some(([cx, cy, cz]) => cx === x && cy === y + 1 && cz === z);
    const hasCubeBottom = cubes.some(([cx, cy, cz]) => cx === x && cy === y - 1 && cz === z);
    const hasCubeFront = cubes.some(([cx, cy, cz]) => cx === x && cy === y && cz === z + 1);
    const hasCubeBack = cubes.some(([cx, cy, cz]) => cx === x && cy === y && cz === z - 1);

    return (
      <RigidBody type="fixed" colliders="cuboid" key={index}>
        <Cube
          position={coords}
          onClick={handleCubeClick}
          faceIndex={index}
          textureArray={texture}
          id={id} // Passando o id para o componente Cube
          hasCubeLeft={hasCubeLeft}
          hasCubeRight={hasCubeRight}
          hasCubeTop={hasCubeTop}
          hasCubeBottom={hasCubeBottom}
          hasCubeFront={hasCubeFront}
          hasCubeBack={hasCubeBack}
        />
      </RigidBody>
    );
  });
  
};export function Cube({id, position, faceIndex, onClick, textureArray, hasCubeLeft, hasCubeRight, hasCubeTop, hasCubeBottom, hasCubeFront, hasCubeBack }) {
  const ref = useRef();
  
 


  // Seleciona a array de textura com base na ID
  const selectedTextureArray = textureArray[id];

  const [hoveredFace, setHoveredFace] = useState(null);
  const defaultTexture = useTexture(selectedTextureArray[0]);
  const handleMouseEnter = useCallback((index) => {
    setHoveredFace(index);
  }, [setHoveredFace]);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredFace(null);
  }, [setHoveredFace]);

  const handleMouseClick = useCallback(
    (e) => {
      const clickedFaceIndex = Math.floor(e.faceIndex / 2);
      const button = e.button;
      const coords = position;

      console.debug("Face:", clickedFaceIndex, "Button:", button, "Coords:", coords);

      onClick(coords, clickedFaceIndex, button);
    },
    [onClick, position]
  );
  
  return (
    <group position={position} receiveShadow castShadow  onClick={handleMouseClick} ref={ref}>
      {!hasCubeLeft && (
        <mesh key={0} position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} onPointerOut={() => handleMouseLeave(0)} onPointerMove={() => handleMouseEnter(0)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 0 ? "hotpink" : "white"} />
        </mesh>
      )}

      {!hasCubeRight && (
        <mesh key={1} position={[0.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[-1, 1, 1]}onPointerOut={() => handleMouseLeave(1)} onPointerMove={() => handleMouseEnter(1)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 1 ? "hotpink" : "white"} />
        </mesh>
      )}
      {!hasCubeTop && (
        <mesh key={2} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}onPointerOut={() => handleMouseLeave(2)} onPointerMove={() => handleMouseEnter(2)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 2 ? "hotpink" : "white"} />
        </mesh>
      )}
      {!hasCubeBottom && (
        <mesh key={3} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}onPointerOut={() => handleMouseLeave(3)} onPointerMove={() => handleMouseEnter(3)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 3 ? "hotpink" : "white"} />
        </mesh>
      )}
      {!hasCubeFront && (
        <mesh key={4} position={[0, 0, 0.5]} rotation={[0, 0, 0]}onPointerOut={() => handleMouseLeave(4)} onPointerMove={() => handleMouseEnter(4)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 4 ? "hotpink" : "white"} />
        </mesh>
      )}
      {!hasCubeBack && (
        <mesh key={5} position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]}onPointerOut={() => handleMouseLeave(5)} onPointerMove={() => handleMouseEnter(5)}>
          <planeGeometry />
          <meshStandardMaterial attach="material" map={defaultTexture} color={hoveredFace === 5 ? "hotpink" : "white"} />
        </mesh>
      )}
    </group>
  );
}
