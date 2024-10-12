import { useRef } from "react";
import * as THREE from "three";
import { constants, GalaxyComponent, HazePoint } from "../config/galaxy-data";
import { generateGalaxyComponent } from "../utils/background-utils";
import { useFrame, useLoader } from "@react-three/fiber";
import { clamp } from "three/src/math/MathUtils.js";
import { fragmentShader, vertexShader } from "../config/shaders";

export default function Haze({
	position,
	rotation,
	sizeMultiplier,
	color,
	opacity,
}) {
	const hazeRef = useRef<THREE.Points>(null);

	const generateHazeProps = function (): HazePoint {
		const hazeObj: HazePoint = {
			color: color,
			size: clamp(
				constants.HAZE_MAX * Math.random(),
				constants.HAZE_MIN,
				constants.HAZE_MAX
			),
		};

		return hazeObj;
	};

	const [vertices, colors, sizes] = generateGalaxyComponent(
		GalaxyComponent.Haze,
		generateHazeProps
	);

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(vertices, 3)
	);
	geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

	const sprite: THREE.Texture = useLoader(THREE.TextureLoader, "/haze.png");

	const mat = new THREE.ShaderMaterial({
		uniforms: {
			opacity: { value: opacity },
			sizeMultiplier: { value: sizeMultiplier },
			spriteTexture: { value: sprite },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false,
		transparent: true,
		vertexColors: true,
	});

	useFrame(() => {
		if (hazeRef.current) hazeRef.current.rotateY(0.00005);
	});

	return (
		<points
			ref={hazeRef}
			geometry={geometry}
			material={mat}
			position={position}
			rotation={rotation}
		/>
	);
}
