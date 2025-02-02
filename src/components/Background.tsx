import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { standardVertexShader, deepFogFragmentShader } from "../config/shaders";
import gsap from "gsap";

function Fog() {
	const { size, pointer } = useThree();

	const bgScene = new THREE.Scene();
	const fog = new THREE.Mesh(
		new THREE.PlaneGeometry(size.width, size.height),
		new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0.0 },
				uMouse: { value: new THREE.Vector2(0, 0) },
				uResolution: { value: new THREE.Vector2(size.width, size.height) },
			},
			vertexShader: standardVertexShader,
			fragmentShader: deepFogFragmentShader,
			depthTest: false,
			transparent: true,
		})
	);
	bgScene.add(fog);

	const cursorPos = new THREE.Vector2();

	useFrame(({ camera, scene, gl, clock, size }) => {
		gsap.to(cursorPos, {
			x: pointer.x,
			y: pointer.y,
			duration: 1.5,
			ease: "power3.out",
		});

		fog.material.uniforms.uTime.value = clock.getElapsedTime();
		fog.material.uniforms.uMouse.value.set(cursorPos.x, cursorPos.y);
		fog.material.uniforms.uResolution.value.set(size.width, size.height);

		gl.autoClear = false;
		gl.clear();
		gl.render(bgScene, camera);
		gl.render(scene, camera);
	});

	return null;
}

export default function Background() {
	return (
		<Canvas dpr={window.devicePixelRatio}>
			<Fog />
		</Canvas>
	);
}
