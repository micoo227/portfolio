import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { standardVertexShader, deepFogFragmentShader } from "../config/shaders";

function DeepFog() {
	const materialRef = useRef<THREE.ShaderMaterial>(null);
	const { size } = useThree();

	const uniforms = useMemo(
		() => ({
			uTime: {
				value: 0.0,
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
				fragmentShader={deepFogFragmentShader}
				depthTest={false}
				transparent={true}
			/>
		</mesh>
	);
}

export default function Background() {
	return (
		<Canvas orthographic={true} dpr={window.devicePixelRatio}>
			<color attach="background" args={["#060221"]} />
			<DeepFog />
		</Canvas>
	);
}
