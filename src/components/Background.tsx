import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
	Bloom,
	EffectComposer,
	HueSaturation,
	ToneMapping,
} from "@react-three/postprocessing";
import Galaxy from "./Galaxy";
import { ToneMappingMode } from "postprocessing";
import FixedStars from "./FixedStars";

export default function Background() {
	const camera = new THREE.PerspectiveCamera(
		35,
		window.innerWidth / window.innerHeight,
		2,
		10000
	);

	return (
		<Canvas camera={camera} dpr={window.devicePixelRatio}>
			<color attach="background" args={["#201919"]} />
			<EffectComposer>
				<Bloom mipmapBlur luminanceThreshold={1} intensity={2} />
				<HueSaturation hue={0} saturation={0.25} />
				<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
			</EffectComposer>
			<Galaxy position={[-500, 75, -1400]} rotation={[0.4, 0, -0.5]} />
			<FixedStars />
		</Canvas>
	);
}
