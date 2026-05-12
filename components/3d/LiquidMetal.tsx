'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform float uDistortion;
uniform vec2 uMouse;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDistortion;

vec3 mod289v3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289v4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289v4(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vNormal = normal;
  vPosition = position;

  float noise = snoise(vec3(
    position.x * 0.8 + uTime * 0.3,
    position.y * 0.8 + uTime * 0.2,
    position.z * 0.8 + uTime * 0.25
  ));

  float mouseInfluence = snoise(vec3(
    position.x + uMouse.x * 2.0,
    position.y + uMouse.y * 2.0,
    uTime * 0.5
  )) * 0.3;

  float displacement = noise * uDistortion + mouseInfluence;
  vDistortion = displacement;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uAccent;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDistortion;

void main() {
  vec3 light = normalize(vec3(1.0, 1.0, 2.0));
  float diff = max(dot(vNormal, light), 0.0);

  vec3 viewDir = normalize(cameraPosition - vPosition);
  vec3 reflectDir = reflect(-light, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

  float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);

  vec3 color = mix(uColor1, uColor2, vDistortion * 0.5 + 0.5);
  color = mix(color, uAccent, fresnel * 0.6);
  color += vec3(spec) * 0.8;
  color += fresnel * vec3(1.0, 0.8, 0.6) * 0.4;

  gl_FragColor = vec4(color, 0.92);
}
`

function Particles() {
  const count = 500
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 1.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        size={0.02}
        color="#f0ead6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  )
}

function Blob({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime:        { value: 0 },
      uDistortion:  { value: 0.35 },
      uMouse:       { value: new THREE.Vector2(0, 0) },
      uColor1:      { value: new THREE.Color(0.05, 0.05, 0.05) },
      uColor2:      { value: new THREE.Color(0.3, 0.3, 0.35) },
      uAccent:      { value: new THREE.Color(1.0, 0.24, 0.0) },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05

    uniforms.uTime.value = t
    uniforms.uDistortion.value = 0.3 + Math.sin(t * 0.5) * 0.08
    uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y)

    targetRotation.current.x = smoothMouse.current.y * 0.5
    targetRotation.current.y = smoothMouse.current.x * 0.5

    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05 + 0.001
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05 + 0.002
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      <pointLight position={[2, 2, 2]} intensity={2} color="#ff3c00" />
      <pointLight position={[-2, -1, 1]} intensity={1} color="#8888ff" />
      <pointLight position={[0, -2, -2]} intensity={0.5} color="#ffffff" />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LiquidMetal({ small = false }: { small?: boolean }) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Canvas
      camera={{ fov: 75, position: [0, 0, 2.5] }}
      gl={{ alpha: true, antialias: true }}
      dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      style={{ background: 'transparent' }}
    >
      <Lights />
      <Blob mouse={mouse} />
      <Particles />
    </Canvas>
  )
}
