"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GlassShader } from "./GlassShader";
import { ShaderMaterial, TextureLoader } from "three";
import React, { useRef } from "react";

function GlassPlane() {
  const ref = useRef();

  const texture = useLoader(TextureLoader, "/002.png");

  const material = new ShaderMaterial({
    uniforms: {
      iChannel0: { value: texture },
      iResolution: { value: [window.innerWidth, window.innerHeight, 1] },
      iTime: { value: 0 }
    },
    fragmentShader: GlassShader.fragmentShader,
    vertexShader: GlassShader.vertexShader,
  });

  useFrame((state) => {
    ref.current.material.uniforms.iTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={ref} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <GlassPlane />
    </Canvas>
  );
}
