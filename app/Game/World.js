import React from 'react';
import { Chunk } from './Chunk';
import create from 'zustand';

const useChunkStore = create((set) => ({
  loadedChunks: [],
  addLoadedChunk: (chunkData) =>
    set((state) => ({ loadedChunks: [...state.loadedChunks, chunkData] })),
}));

export function World({cubeConfigurations, texturesArray, cubesArray, clusterWidth, renderDistance, playerPosition }) {
  const { addLoadedChunk } = useChunkStore();

  const handleChunkLoad = (key, chunkCubesArray, position) => {
    // Remove o primeiro valor de cada array da chunk para não atrapalhar e adiciona à lista de chunks carregadas
    const filteredChunkCubesArray = chunkCubesArray.map((chunk) => chunk.slice(1));
    addLoadedChunk({ key, cubesArray: filteredChunkCubesArray });
  };

  return (
    <group>
      {cubesArray.map((chunkData) => {
        const position = chunkData[0]; // A posição da chunk é o primeiro valor da array
        const key = position.join('_'); // A chave única para a chunk é sua posição
        const chunkCubesArray = chunkData.slice(1); // Remove a posição da chunk
        return (
          <Chunk
          cubeConfigurations={cubeConfigurations}
            key={key}
            position={[10*position[0],10*position[1],10*position[2]]}
            clusterPosition={position} // Passa a posição da chunk como clusterPosition
            clusterWidth={clusterWidth}
            onClick={(coords, faceIndex, button, globalCoords) => {
              // Lógica de clique
            }}
            cubesArray={chunkCubesArray}
            textures={texturesArray}
            isHover={true}
            onLoad={() => handleChunkLoad(key, chunkCubesArray, position)}
          />
        );
      })}
    </group>
  );
}
