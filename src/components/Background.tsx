import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
	standardVertexShader,
	deepFogFragmentShader,
	wispyFragmentShader,
} from "../config/shaders";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";

interface FogProps {
	wispy: boolean;
}

interface BackgroundProps {
	setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

function Fog({ wispy }: FogProps) {
	const materialRef = useRef<THREE.ShaderMaterial>(null);
	const { size, pointer, gl } = useThree();

	const uniforms = useMemo(
		() => ({
			uTime: {
				value: 0.0,
			},
			uMouse: {
				value: new THREE.Vector2(0, 0),
			},
			uResolution: {
				value: new THREE.Vector2(
					size.width * gl.getPixelRatio(),
					size.height * gl.getPixelRatio()
				),
			},
		}),
		[]
	);

	const cursorPos = useMemo(() => new THREE.Vector2(), []);

	useFrame(({ clock, size, gl }) => {
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
				size.width * gl.getPixelRatio(),
				size.height * gl.getPixelRatio()
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
	const [dpr, setDpr] = useState(0.1);

	useEffect(() => {
		// Canvas height can be incorrect for mobile landscape mode; this fixes that
		const setVhProperty = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		};

		setVhProperty();

		window.addEventListener("resize", setVhProperty);
		return () => window.removeEventListener("resize", setVhProperty);
	}, []);

	return (
		<div
			className="fixed inset-0"
			style={{ height: "calc(var(--vh, 1vh) * 100)" }}
		>
			<Canvas
				eventSource={document.getElementById("root")!}
				eventPrefix="client"
				dpr={dpr}
				onCreated={() => setLoaded(true)}
			>
				<PerformanceMonitor
					factor={0}
					ms={100}
					onChange={({ factor }) =>
						setDpr(0.1 + (window.devicePixelRatio - 0.1) * factor)
					}
				/>
				<Fog wispy={false} />
				<Fog wispy={true} />
			</Canvas>
		</div>
	);
}
