import { useRef } from "react";
import * as THREE from "three";
import { GalaxyComponent, Star } from "../config/galaxy-data";
import {
	generateGalaxyComponent,
	generateStarProps,
} from "../utils/background-utils";
import { useFrame, useLoader } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "../config/shaders";
import Sun from "./Sun";
import Haze from "./Haze";

interface GalaxyProps {
	position: THREE.Vector3 | [x: number, y: number, z: number];
	rotation: THREE.Euler | [x: number, y: number, z: number];
}

export default function Galaxy({ position, rotation }: GalaxyProps) {
	const galaxyRef = useRef<THREE.Points>(null);

	const stars: Star[] = [
		{ rarity: 76.45, color: "0xffcc6f", size: 0.7 },
		{ rarity: 12.1, color: "0xffd2a1", size: 0.96 },
		{ rarity: 7.6, color: "0xfff4ea", size: 1.15 },
		{ rarity: 3.0, color: "0xf8f7ff", size: 1.48 },
		{ rarity: 0.6, color: "0xcad7ff", size: 2.0 },
		{ rarity: 0.13, color: "0xaabfff", size: 2.5 },
	];

	const [vertices, colors, sizes] = generateGalaxyComponent(
		GalaxyComponent.Stars,
		generateStarProps.bind(null, stars)
	);

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(vertices, 3)
	);
	geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

	const sprite: THREE.Texture = useLoader(THREE.TextureLoader, "/disc.png");

	const mat = new THREE.ShaderMaterial({
		uniforms: {
			opacity: { value: 1.0 },
			sizeMultiplier: { value: 7.5 },
			spriteTexture: { value: sprite },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true,
	});

	useFrame(() => {
		if (galaxyRef.current) galaxyRef.current.rotateY(0.00005);
	});

	return (
		<>
			<points
				ref={galaxyRef}
				geometry={geometry}
				material={mat}
				position={position}
				rotation={rotation}
			/>
			<Sun position={position} />
			<Haze
				position={position}
				rotation={rotation}
				sizeMultiplier={7.5}
				color={"0x3f78d4"}
				opacity={0.009}
			/>
		</>
	);
}
