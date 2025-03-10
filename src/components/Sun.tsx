import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface SunProps {
	position: THREE.Vector3 | [x: number, y: number, z: number];
}

export default function Sun({ position }: SunProps) {
	const sprite: THREE.Texture = useLoader(THREE.TextureLoader, "/disc.png");
	const color = new THREE.Color(1, 1, 0.667);
	color.multiplyScalar(5);

	return (
		<sprite position={position} scale={[60, 60, 1]}>
			<spriteMaterial
				map={sprite}
				alphaTest={0.5}
				transparent={true}
				color={color}
			/>
		</sprite>
	);
}
