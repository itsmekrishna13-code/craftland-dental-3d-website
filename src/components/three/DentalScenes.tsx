import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { MotionValue } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Procedural tooth geometry                                          */
/*  A lathe profile gives the root-to-crown silhouette; cusps and      */
/*  organic noise are added by displacing vertices so the result reads */
/*  as a sculpted tooth rather than a primitive.                       */
/* ------------------------------------------------------------------ */

type Profile = [number, number][];

const MOLAR_PROFILE: Profile = [
  [0.001, -2.3],
  [0.22, -2.15],
  [0.36, -1.75],
  [0.46, -1.2],
  [0.54, -0.6],
  [0.62, -0.1],
  [0.8, 0.22],
  [0.97, 0.52],
  [1.02, 0.8],
  [0.96, 1.02],
  [0.8, 1.14],
  [0.52, 1.2],
  [0.001, 1.2],
];

const INCISOR_PROFILE: Profile = [
  [0.001, -2.2],
  [0.2, -2.05],
  [0.3, -1.6],
  [0.36, -1.0],
  [0.44, -0.4],
  [0.5, 0.0],
  [0.62, 0.3],
  [0.78, 0.55],
  [0.84, 0.8],
  [0.8, 1.0],
  [0.6, 1.1],
  [0.001, 1.12],
];

const PULP_PROFILE: Profile = [
  [0.001, -1.95],
  [0.1, -1.8],
  [0.16, -1.2],
  [0.22, -0.5],
  [0.3, 0.2],
  [0.38, 0.7],
  [0.34, 0.92],
  [0.18, 0.98],
  [0.001, 0.98],
];

function buildTooth(profile: Profile, cusps: number, cuspAmp: number, segments = 128) {
  const points = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const lathe = new THREE.LatheGeometry(points, segments);
  lathe.deleteAttribute("normal");

  const pos = lathe.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const r = Math.hypot(v.x, v.z);
    const theta = Math.atan2(v.z, v.x);

    // Only the biting surface (top) receives cusps; all terms use integer
    // multiples of theta so the lathe seam stays perfectly continuous.
    const top = THREE.MathUtils.smoothstep(v.y, 0.3, 1.0);
    const cusp = cusps > 0 ? Math.pow(0.5 + 0.5 * Math.cos(cusps * theta), 3) : 1;
    const rim = THREE.MathUtils.smoothstep(r, 0.2, 0.8);
    const noise = Math.sin(v.y * 9 + theta * 3) * 0.012 + Math.cos(theta * 7 + v.y * 4) * 0.008;

    const radial = 1 + (cusp * cuspAmp * 0.16 * top + noise) * (0.35 + 0.65 * rim);
    const dip = (1 - cusp) * top * rim * 0.1 * cuspAmp;

    v.set(Math.cos(theta) * r * radial, v.y - dip, Math.sin(theta) * r * radial);
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  const merged = mergeVertices(lathe, 1e-4);
  merged.computeVertexNormals();
  merged.translate(0, 0.55, 0);
  return merged;
}

function useEnamelMaterial(opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) {
  return useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#F5EFE3",
        roughness: 0.2,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        sheen: 0.4,
        sheenRoughness: 0.4,
        sheenColor: new THREE.Color("#FFF3D6"),
        specularIntensity: 0.8,
        ior: 1.5,
        ...opts,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

/* ------------------------------------------------------------------ */
/*  Shared studio lighting                                            */
/* ------------------------------------------------------------------ */

const lightformers = (
  <>
    <Lightformer form="rect" intensity={2.2} position={[0, 5, -3]} scale={[12, 2, 1]} />
    <Lightformer
      form="rect"
      intensity={1.2}
      color="#F5E2BD"
      position={[-5, 1, 2]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[6, 4, 1]}
    />
    <Lightformer form="ring" intensity={1.5} color="#FFF4DC" position={[4, 2, 3]} scale={3} />
  </>
);

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.7} color="#FFF3E0" castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-4, 3, 3]} intensity={24} angle={0.6} penumbra={1} color="#F5E2BD" />
      <pointLight position={[2.4, -2, 3]} intensity={5} color="#9FB097" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO: floating molar with incisor accents                          */
/* ------------------------------------------------------------------ */

function HeroToothCluster() {
  const molar = useMemo(() => buildTooth(MOLAR_PROFILE, 4, 1), []);
  const incisor = useMemo(() => buildTooth(INCISOR_PROFILE, 0, 0.6), []);
  const enamel = useEnamelMaterial();
  const gold = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#C9A96E", metalness: 1, roughness: 0.22 }),
    []
  );

  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer, camera } = state;

    if (spin.current) spin.current.rotation.y = t * 0.32;

    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, -pointer.y * 0.22 + 0.12, 3, delta);
      tilt.current.rotation.z = THREE.MathUtils.damp(tilt.current.rotation.z, pointer.x * 0.16 - 0.08, 3, delta);
    }

    // Smooth parallax camera drift that follows the pointer.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.5, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.3, 2.2, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh geometry={molar} material={enamel} castShadow receiveShadow />
      </group>

      <mesh rotation={[Math.PI / 2.3, 0.2, 0]} material={gold}>
        <torusGeometry args={[2.05, 0.012, 16, 240]} />
      </mesh>
      <mesh rotation={[Math.PI / 2.9, -0.4, 0.5]} material={gold}>
        <torusGeometry args={[2.35, 0.006, 16, 240]} />
      </mesh>

      <mesh
        geometry={incisor}
        material={enamel}
        position={[-2.25, 0.9, -0.6]}
        rotation={[0.3, 0.6, -0.4]}
        scale={0.42}
        castShadow
      />
      <mesh
        geometry={incisor}
        material={enamel}
        position={[2.2, -1.05, -0.5]}
        rotation={[-0.2, -0.9, 0.5]}
        scale={0.34}
        castShadow
      />
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      shadows="percentage"
      camera={{ position: [0, 0, 8.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <StudioLights />
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          {lightformers}
        </Environment>
        <Float speed={1.5} rotationIntensity={0.25} floatIntensity={1.2} floatingRange={[-0.15, 0.15]}>
          <HeroToothCluster />
        </Float>
        <Sparkles count={50} scale={[9, 6, 4]} size={3} speed={0.25} color="#D9C395" opacity={0.85} />
        <ContactShadows position={[0, -2.6, 0]} opacity={0.35} scale={9} blur={2.8} far={4} color="#1E3A2F" />
      </Suspense>
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/*  ANATOMY: layered enamel / dentin / pulp model                     */
/* ------------------------------------------------------------------ */

export type LayerVisibility = { enamel: boolean; dentin: boolean; pulp: boolean };

function AnatomyModel({ layers, progress }: { layers: LayerVisibility; progress: MotionValue<number> }) {
  const molar = useMemo(() => buildTooth(MOLAR_PROFILE, 4, 1), []);
  const pulp = useMemo(() => buildTooth(PULP_PROFILE, 0, 0), []);
  const hovered = useRef(false);
  const group = useRef<THREE.Group>(null);

  const innerTransparent = layers.dentin || layers.pulp;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.getElapsedTime();
    const target = progress.get() * Math.PI * 1.5 + t * 0.12;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target, 4, delta);
    g.position.y = Math.sin(t * 0.8) * 0.08;
    const s = THREE.MathUtils.damp(g.scale.x, hovered.current ? 1.05 : 1, 5, delta);
    g.scale.setScalar(s);
  });

  return (
    <group
      ref={group}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    >
      <mesh geometry={molar} visible={layers.enamel} castShadow receiveShadow renderOrder={2}>
        <meshPhysicalMaterial
          color="#F7F2E7"
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.1}
          sheen={0.3}
          transparent={innerTransparent}
          opacity={innerTransparent ? 0.2 : 1}
          depthWrite={!innerTransparent}
        />
      </mesh>

      <mesh
        geometry={molar}
        visible={layers.dentin}
        scale={[0.86, 0.9, 0.86]}
        position={[0, -0.02, 0]}
        castShadow
        renderOrder={1}
      >
        <meshStandardMaterial color="#E8D6B0" roughness={0.42} />
      </mesh>

      <mesh geometry={pulp} visible={layers.pulp} castShadow>
        <meshStandardMaterial color="#C4574E" roughness={0.35} emissive="#3d0f0c" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export function AnatomyScene({ layers, progress }: { layers: LayerVisibility; progress: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.3, 6.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      shadows="percentage"
    >
      <StudioLights />
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          {lightformers}
        </Environment>
        <AnatomyModel layers={layers} progress={progress} />
        <Sparkles count={28} scale={[6, 4, 3]} size={2.4} speed={0.2} color="#D9C395" opacity={0.7} />
        <ContactShadows position={[0, -2.1, 0]} opacity={0.3} scale={8} blur={2.6} far={4} color="#1E3A2F" />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.65}
        />
      </Suspense>
    </Canvas>
  );
}
