import * as THREE from "three";

export const GlassShader = {
  uniforms: {
    iChannel0: { value: null },
    iResolution: { value: new THREE.Vector3() },
    iTime: { value: 0 },
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,

  fragmentShader: `
    const float NUM_STRIPES = 25.0;
    const float STRRENGTH = 1.0;
    const float SOFTNESS = 0.0005;

    uniform sampler2D iChannel0;
    uniform vec3 iResolution;
    uniform float iTime;

    varying vec2 vUv;

    float displacement(float x, float num_stripes, float strength) {
      float modulus = 1.0 / num_stripes;
      return mod(x, modulus) * strength;
    }

    float fractal_glass(float x) {
      float d = 0.0;
      for (int i = -5; i <= 5; i++) {
         d += displacement(x + float(i) * SOFTNESS, NUM_STRIPES, STRRENGTH);
      }
      d = d / 11.0;
      return x + d;
    }

    void main() {
      vec2 uv = vUv;
      uv.x = fractal_glass(uv.x);

      vec3 col = texture2D(iChannel0, uv).rgb;
      gl_FragColor = vec4(col, 1.0);
    }
  `
};
