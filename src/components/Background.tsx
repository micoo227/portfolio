import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
	standardVertexShader,
	deepFogFragmentShader,
	wispyFragmentShader,
} from "../config/shaders";

enum FogType {
	Deep,
	Wispy,
}

interface FogProps {
	fogType: FogType;
}

function Fog({ fogType }: FogProps) {
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

	useFrame(({ clock, size }) => {
		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
			materialRef.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
			materialRef.current.uniforms.uResolution.value.set(
				size.width,
				size.height
			);
		}
	});

	let fragShader: string;
	switch (fogType) {
		case FogType.Deep:
			fragShader = deepFogFragmentShader;
			break;
		case FogType.Wispy:
			fragShader = wispyFragmentShader;
			break;
	}

	return (
		<mesh>
			<planeGeometry args={[size.width, size.height]} />
			<shaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={standardVertexShader}
				fragmentShader={fragShader}
				depthTest={false}
				transparent={true}
			/>
		</mesh>
	);
}

export default function Background() {
	return (
		<Canvas dpr={window.devicePixelRatio}>
			<color attach="background" args={["#060221"]} />
			<Fog fogType={FogType.Deep} />
			<Fog fogType={FogType.Wispy} />
		</Canvas>
	);
}
