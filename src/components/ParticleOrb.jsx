import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import particleData from '../data/logoParticles.json'

/* ────────────────────────────────────────────────────────────
   Vertex Shader
   - Maps 2D logo coords → 3D sphere surface
   - Computes depth-based size & brightness
   - Computes screen-space distance to mouse for proximity glow
   ──────────────────────────────────────────────────────────── */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;        // normalized mouse (-1..1)
  uniform vec2 uResolution;   // viewport size in px
  uniform float uPixelRatio;
  uniform float uHover;       // 0..1 smoothed hover state

  attribute vec3 aColor;
  attribute float aEdge;

  varying vec3 vColor;
  varying float vDepth;       // 0 = back, 1 = front
  varying float vProximity;   // 0..1 closeness to mouse
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Subtle float animation — breathing motion
    float breathe = sin(uTime * 0.8 + position.x * 3.0 + position.y * 2.0) * 0.012;
    vec3 pos = position + normal * breathe;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Depth: camera is at z=5, sphere radius=2, so mvPos.z ranges from ~-3 to ~-7
    // Remap to 0..1 where 1 = closest to camera (z ≈ -3), 0 = farthest (z ≈ -7)
    vDepth = clamp((-mvPos.z - 3.0) / 4.0, 0.0, 1.0);
    vDepth = 1.0 - vDepth; // Flip: 1 = closest

    // Base point size: reduced for subtler ambient look
    float baseSize = aEdge > 0.5 ? 3.5 : 2.5;
    float depthSize = mix(0.4, 1.0, vDepth);

    // Screen-space position for proximity glow
    vec2 screenPos = (gl_Position.xy / gl_Position.w) * 0.5 + 0.5;
    screenPos *= uResolution;

    vec2 mouseScreen = (uMouse * 0.5 + 0.5) * uResolution;
    float dist = length(screenPos - mouseScreen);

    // Smooth proximity falloff: wider 250px radius, much stronger effect
    vProximity = smoothstep(250.0 * uPixelRatio, 0.0, dist) * uHover;

    // Proximity makes particles grow significantly (up to 3x near cursor)
    float proxSize = 1.0 + vProximity * 2.0;
    gl_PointSize = baseSize * depthSize * proxSize * uPixelRatio;

    // Alpha: base particles are more subtle/transparent
    vAlpha = mix(0.12, 0.7, vDepth);
  }
`

/* ────────────────────────────────────────────────────────────
   Fragment Shader
   - Renders soft circular dots with glow halo
   - Applies depth-based dimming
   - Applies cursor proximity glow boost
   ──────────────────────────────────────────────────────────── */
const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vDepth;
  varying float vProximity;
  varying float vAlpha;

  void main() {
    // Soft circle with glow falloff
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float circle = 1.0 - smoothstep(0.2, 0.5, dist);
    if (circle < 0.01) discard;

    // Base brightness — reduced for subtler ambient glow
    float brightness = mix(0.2, 0.7, vDepth);

    // Proximity glow boost — dramatically stronger near cursor
    float glow = vProximity * 1.5;

    vec3 color = vColor * (brightness + glow);

    // Intense bloom on particles near cursor
    color += vColor * vProximity * 0.8;

    // Alpha boost near cursor so particles fully materialize
    float finalAlpha = circle * mix(vAlpha, 1.0, vProximity);

    gl_FragColor = vec4(color, finalAlpha);
  }
`

/* ────────────────────────────────────────────────────────────
   Particle System Component
   ──────────────────────────────────────────────────────────── */
function ParticleSystem() {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const hoverRef = useRef(0)
  const { viewport, size, gl } = useThree()

  // Convert 2D particle data → 3D sphere positions
  const { positions, colors, edges, normals } = useMemo(() => {
    const count = particleData.length
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const edg = new Float32Array(count)
    const nrm = new Float32Array(count * 3)

    const SPHERE_RADIUS = 2.0

    for (let i = 0; i < count; i++) {
      const p = particleData[i]

      // Map 2D coords to spherical coordinates on the front hemisphere
      // x, y are in -1..1 range
      const theta = p.x * (Math.PI * 0.45) // longitude: ±81°
      const phi = p.y * (Math.PI * 0.45)   // latitude: ±81°

      // Spherical to cartesian
      const nx = Math.sin(theta) * Math.cos(phi)
      const ny = Math.sin(phi)
      const nz = Math.cos(theta) * Math.cos(phi)

      pos[i * 3] = nx * SPHERE_RADIUS
      pos[i * 3 + 1] = ny * SPHERE_RADIUS
      pos[i * 3 + 2] = nz * SPHERE_RADIUS

      // Store normal for breathing animation
      nrm[i * 3] = nx
      nrm[i * 3 + 1] = ny
      nrm[i * 3 + 2] = nz

      // Color: normalize from 0-255 to 0-1
      col[i * 3] = p.r / 255
      col[i * 3 + 1] = p.g / 255
      col[i * 3 + 2] = p.b / 255

      edg[i] = p.e
    }

    return { positions: pos, colors: col, edges: edg, normals: nrm }
  }, [])

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
    uHover: { value: 0 },
  }), [])

  // Update resolution on resize
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height)
    uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2)
  }, [size, gl, uniforms])

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e) => {
      // Convert to NDC: -1..1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      hoverRef.current = 1
    }
    const handleLeave = () => {
      hoverRef.current = 0
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return

    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    // Smooth mouse lerp for uniforms (proximity glow)
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
      0.1
    )

    // Smooth hover transition
    uniforms.uHover.value = THREE.MathUtils.lerp(
      uniforms.uHover.value,
      hoverRef.current,
      0.05
    )

    // ── Rotation: continuous 360° spin + cursor tracking ──
    const group = meshRef.current

    // Slow continuous Y rotation (full 360°)
    const baseY = t * 0.12 // ~52 seconds per full revolution

    // Cursor-driven tilt (subtle)
    const targetRotX = mouseRef.current.y * 0.1
    const targetRotY = baseY + mouseRef.current.x * 0.12

    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.03)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.03)
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-normal"
          count={normals.length / 3}
          array={normals}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aEdge"
          count={edges.length}
          array={edges}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ────────────────────────────────────────────────────────────
   ParticleOrb — Main exported component
   Wraps the R3F Canvas. Parent handles positioning.
   ──────────────────────────────────────────────────────────── */
export default function ParticleOrb() {
  return (
    <div
      id="particle-orb-container"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          pointerEvents: 'auto',
          width: '100%',
          height: '100%',
        }}
      >
        <ParticleSystem />
      </Canvas>
    </div>
  )
}

