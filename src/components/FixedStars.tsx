import { constants, Star } from "../config/galaxy-data";
import * as THREE from "three";
import {
	assignColorAndSizeAtIndex,
	generateStarProps,
} from "../utils/background-utils";
import { useLoader } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "../config/shaders";

interface FixedStarsProps {
	numStars?: number;
	spread?: number;
}

export default function FixedStars({
	numStars = 30000,
	spread = 2,
}: FixedStarsProps) {
	const stars: Star[] = [
		{ rarity: 76.45, color: "0xffcc6f", size: 0.7 },
		{ rarity: 12.1, color: "0xffd2a1", size: 0.96 },
		{ rarity: 7.6, color: "0xfff4ea", size: 1.15 },
		{ rarity: 3.0, color: "0xf8f7ff", size: 1.48 },
		{ rarity: 0.6, color: "0xcad7ff", size: 4.0 },
		{ rarity: 0.13, color: "0xaabfff", size: 5.0 },
	];

	const vertices = new Float32Array(numStars * 3);
	const colors = new Float32Array(numStars * 3);
	const sizes = new Float32Array(numStars);

	const vertex = new THREE.Vector3();

	for (let i = 0; i < numStars; i++) {
		vertex.x = (Math.random() * 2 - 1) * spread * 2;
		vertex.y = (Math.random() * 2 - 1) * spread;
		vertex.z = 1;
		vertex.toArray(vertices, i * 3);

		const star = generateStarProps(stars);
		assignColorAndSizeAtIndex(
			star,
			colors,
			sizes,
			i * 3,
			constants.FIXED_STARS_BLOOM_INTENSITY
		);
	}

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
			sizeMultiplier: { value: 1.0 },
			spriteTexture: { value: sprite },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		blending: THREE.AdditiveBlending,
		depthTest: false,
		transparent: true,
		vertexColors: true,
	});

	return <points geometry={geometry} material={mat} position={[0, 0, -5]} />;
}
