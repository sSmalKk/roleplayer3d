"use client";
import { useCallback, useRef } from "react";
import { Cubes } from "./Cube";

export function Chunk({ textures, position, onClick, clusterPosition, cubesArray, isHover, clusterWidth }) {
  const ref = useRef();

  // Calcula a posição dos elementos adicionais deslocados 4.5 blocos para frente
  const hoverElementPosition = [
    (position[0]+4.5),
    (position[1]+4.5),
    (position[2]+4.5),
  ];

  const handleCubeClick = useCallback(
    (coords, faceIndex, button) => {
      const innercoords = [
        coords[0] + position[0] * clusterWidth,
        coords[1] + position[1] * clusterWidth,
        coords[2] + position[2] * clusterWidth,
      ];
      const globalCoords = [
        innercoords[0] + clusterPosition[0] * clusterWidth,
        innercoords[1] + clusterPosition[1] * clusterWidth,
        innercoords[2] + clusterPosition[2] * clusterWidth,
      ];
      onClick(coords, faceIndex, button, globalCoords);
    },
    [position, clusterPosition, onClick, clusterWidth]
  );

  return (
    <group>
      {/* Renderiza o elemento hover deslocado 4.5 blocos para frente */}
      {isHover && (
        <mesh position={hoverElementPosition} receiveShadow castShadow scale={clusterWidth}>
          <meshLambertMaterial attach="material" color={0xffffff10} wireframe />
          <boxGeometry />
        </mesh>
      )}
      
      {/* Renderiza o chunk principal */}
      <mesh ref={ref} receiveShadow castShadow position={position} scale={clusterWidth}>
        <group scale={0.1}>
        

        <Cubes onClick={handleCubeClick} cubes={cubesArray} texture={textures} />
        </group>
      </mesh>
    </group>
  );
}
