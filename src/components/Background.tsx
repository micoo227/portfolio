import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	standardVertexShader,
	deepFogFragmentShader,
	wispyFragmentShader,
} from "../config/shaders";
import gsap from "gsap";
import { useMemo, useRef } from "react";

interface FogProps {
	wispy: boolean;
}

interface BackgroundProps {
	setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

function Fog({ wispy }: FogProps) {
	const materialRef = useRef<THREE.ShaderMaterial>(null);
	const { size, pointer } = useThree();

	const uniforms = useMemo(
		() => ({
			uTime: {
				value: 0.0,
			},
			uMouse: {
				value: new THREE.Vector2(0, 0),
			},
			uResolution: {
				value: new THREE.Vector2(size.width, size.height),
			},
		}),
		[]
	);

	const cursorPos = new THREE.Vector2();

	useFrame(({ clock, size }) => {
		if (materialRef.current) {
			gsap.to(cursorPos, {
				x: pointer.x,
				y: pointer.y,
				duration: 1.5,
				ease: "power3.out",
			});
			materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
			materialRef.current.uniforms.uMouse.value.set(cursorPos.x, cursorPos.y);
			materialRef.current.uniforms.uResolution.value.set(
				size.width,
				size.height
			);
		}
	});

	return (
		<mesh>
			<planeGeometry args={[size.width, size.height]} />
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={standardVertexShader}
				fragmentShader={wispy ? wispyFragmentShader : deepFogFragmentShader}
				depthTest={false}
				transparent={true}
			/>
		</mesh>
	);
}

export default function Background({ setLoaded }: BackgroundProps) {
	return (
		<Canvas
			eventSource={document.getElementById("root")!}
			eventPrefix="client"
			dpr={window.devicePixelRatio}
			onCreated={() => setLoaded(true)}
		>
			<Fog wispy={false} />
			<Fog wispy={true} />
		</Canvas>
	);
}
