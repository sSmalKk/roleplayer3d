import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import create from 'zustand';

const PlayerModel = ({ position }) => {
  const bodyUrl = "../assets/model.gltf";
  const useStore = create((set) => ({
    body: 0,
    head: 0,
    status: 'walk',
    frame: 0,
    setBody: (newBody) => set((state) => ({ body: newBody })),
    setHead: (newHead) => set((state) => ({ head: newHead })),
    setStatus: (newStatus) => set((state) => ({ status: newStatus })),
    setFrame: (newFrame) => set((state) => ({ frame: newFrame })),
  }));
  const { body, head, status, frame, setBody, setHead, setStatus, setFrame } = useStore();
  const group = useRef();
  
  const { nodes, animations } = useGLTF(bodyUrl);
  const { mixer, names } = useAnimations(animations);

  useEffect(() => {
    if (mixer && animations && names && status !== undefined && frame !== undefined) {
      const statusIndex = names.indexOf(status);
      if (statusIndex !== -1) {
        const action = mixer.clipAction(animations[statusIndex]);
        action.play();
        mixer.update(frame);
      }
    }
    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [status, frame, mixer, animations, names]);

  return (
    <group position={position} ref={group}>
      {nodes.Body && <primitive object={nodes.Body} />}
    </group>
  );
};

export default PlayerModel;
