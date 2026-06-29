import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// Particle field — drifting red dots with additive blending
function Particles() {
  const COUNT = 300;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#e61919"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera parallax — gently follows mouse position
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.7 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

type GeoType = "ico" | "oct" | "tet";

interface OrbitProps {
  curve: THREE.CatmullRomCurve3;
  offset: number;
  color: string;
  size: number;
  speed: number;
  geo: GeoType;
  posRef: React.MutableRefObject<THREE.Vector3>;
}

function buildGeo(type: GeoType, size: number) {
  if (type === "ico") return new THREE.IcosahedronGeometry(size, 0);
  if (type === "oct") return new THREE.OctahedronGeometry(size, 0);
  return new THREE.TetrahedronGeometry(size, 0);
}

// Orbiting mesh — main wireframe + faint glow halo behind it
function OrbitMesh({ curve, offset, color, size, speed, geo, posRef }: OrbitProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [mainGeo, glowGeo] = useMemo(
    () => [buildGeo(geo, size), buildGeo(geo, size * 2.0)],
    [geo, size]
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const pos = curve.getPoint(t);
    groupRef.current.position.copy(pos);
    posRef.current.copy(pos);
    groupRef.current.rotation.x += 0.007;
    groupRef.current.rotation.z += 0.005;
    // Subtle breathing
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 1.8 + offset * Math.PI * 2) * 0.09;
    groupRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      {/* Glow halo — large, back-facing, additive */}
      <mesh geometry={glowGeo}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Core wireframe */}
      <mesh geometry={mainGeo}>
        <meshBasicMaterial
          color={color}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Dynamic triangle lines connecting the 3 orbiting meshes — updated each frame
function ConnectionLines({
  posRefs,
}: {
  posRefs: React.MutableRefObject<THREE.Vector3>[];
}) {
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const posArr = useMemo(() => new Float32Array(4 * 3), []); // tri + close = 4 pts

  useFrame(() => {
    if (!geoRef.current) return;
    const pts = [...posRefs.map((r) => r.current), posRefs[0].current];
    pts.forEach((p, i) => {
      posArr[i * 3] = p.x;
      posArr[i * 3 + 1] = p.y;
      posArr[i * 3 + 2] = p.z;
    });
    const attr = geoRef.current.attributes
      .position as THREE.BufferAttribute;
    attr.set(posArr);
    attr.needsUpdate = true;
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore – R3F maps THREE.Line to lowercase <line> primitive
    <line>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[posArr, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#e61919"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
    </line>
  );
}

function Scene() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-4, 1.5, -1),
          new THREE.Vector3(-2, 3.2, -3),
          new THREE.Vector3(1.5, 2, -4),
          new THREE.Vector3(4, 0.2, -2),
          new THREE.Vector3(3.5, -2, 0.5),
          new THREE.Vector3(0.5, -3, 1.5),
          new THREE.Vector3(-3, -1, 2),
        ],
        true,
        "catmullrom",
        0.5
      ),
    []
  );

  const pathPoints = useMemo(() => curve.getPoints(200), [curve]);

  const pos1 = useRef(new THREE.Vector3());
  const pos2 = useRef(new THREE.Vector3());
  const pos3 = useRef(new THREE.Vector3());

  return (
    <>
      <CameraRig />
      <Particles />

      <OrbitMesh
        curve={curve}
        offset={0}
        color="#e61919"
        size={0.28}
        speed={0.065}
        geo="ico"
        posRef={pos1}
      />
      <OrbitMesh
        curve={curve}
        offset={0.33}
        color="#eaeaea"
        size={0.20}
        speed={0.065}
        geo="oct"
        posRef={pos2}
      />
      <OrbitMesh
        curve={curve}
        offset={0.67}
        color="#888888"
        size={0.14}
        speed={0.065}
        geo="tet"
        posRef={pos3}
      />

      <ConnectionLines posRefs={[pos1, pos2, pos3]} />

      {/* Motion path — faint red trace */}
      <Line
        points={pathPoints}
        color="#e61919"
        lineWidth={0.4}
        transparent
        opacity={0.06}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
