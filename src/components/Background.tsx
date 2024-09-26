import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'

interface SpriteParams {
    color: number[];
    size: number;
    rotationVelocity: number;
}

function Points() {
    const { camera, scene, gl } = useThree();

    const params: SpriteParams[] = [
        { color: [1.0, 0.2, 0.7], size: 55, rotationVelocity: 1 },
        { color: [0.95, 0.1, 0.7], size: 25, rotationVelocity: 2 },
        { color: [0.90, 0.05, 0.7], size: 20, rotationVelocity: 3 },
        { color: [0.85, 0, 0.7], size: 18, rotationVelocity: -2 },
        { color: [0.80, 0, 0.7], size: 15, rotationVelocity: -3 },
    ]

    const sprite: THREE.Texture = useLoader(THREE.TextureLoader, '/disc.png');
    sprite.colorSpace = THREE.SRGBColorSpace;

    const materials: THREE.PointsMaterial[] = [];
    //const material = new THREE.PointsMaterial({ size: 55, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true });
	//material.color.setHSL(1.0, 0.3, 0.7, THREE.SRGBColorSpace);

    const vertices = new Float32Array(30000);
    for (let i = 0; i < 30000; i += 3) {
        vertices[i] = 3000 * Math.random() - 1500;
        vertices[i + 1] = 2000 * Math.random() - 1000;
        vertices[i + 2] = 2000 * Math.random() - 1000;
    }

    const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    for (const param of params) {
        const mat = new THREE.PointsMaterial({ size: param.size, map: sprite, alphaTest: .5, transparent: true });
        mat.color.setHSL(param.color[0], param.color[1], param.color[2]);
        materials.push(mat);

        // const points = new THREE.Points(geometry, mat);
        // points.rotation.x = Math.random() * 6;
        // points.rotation.y = Math.random() * 6;
        // points.rotation.z = Math.random() * 6;
        // particles.push(points);
    }

    let mouseX = 0, mouseY = 0;
    let windowHalfX: number, windowHalfY: number;
    useEffect(() => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        const onPointerMove = (evt: PointerEvent) => {
            if (evt.isPrimary === false) return;

            mouseX = evt.clientX - windowHalfX;
            mouseY = evt.clientY - windowHalfY;
        }

        const onWindowResize = () => {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            (camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            gl.setSize(window.innerWidth, window.innerHeight);
        }

        document.body.addEventListener('pointermove', onPointerMove);
        window.addEventListener('resize', onWindowResize);

        return () => {
            document.body.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('resize', onWindowResize);
        }
    }, []);

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime() * 0.05;

        camera.position.x += ((mouseX * -.1) - camera.position.x) * 0.05;
        camera.position.y += (-(mouseY * -.1) - camera.position.y) * 0.05;

        // camera.rotation.x += 0.05 * ((mouseY * -.001) - camera.rotation.x);
        // camera.rotation.y += 0.05 * ((mouseX * -.001) - camera.rotation.y);

        // camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.x, ((mouseY * -.01) * Math.PI) / 20, 0.05);
        // camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, ((mouseX * -.01) * Math.PI) / 20, 0.05);

        camera.lookAt(scene.position);

        for (const child of scene.children) {
            if (child instanceof THREE.Points) {
                child.rotation.y = time * params[child.userData.paramsId].rotationVelocity;
            }
        }

        for (let i = 0; i < materials.length; i++) {
            const color = params[i].color;

            const h = (360 * (color[0] + time) % 360) / 360;
            materials[i].color.setHSL(h, color[1], color[2], THREE.SRGBColorSpace);
        }
    })

    return (
        <>
            {materials.map((mat, i) => 
                <points key={i} userData={{ paramsId: i }} geometry={geometry} material={mat}
                        rotation={[Math.random() * 6, Math.random() * 6, Math.random() * 6]} />
            )}
        </>
    );
}

function Background() {
    const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 2, 10000 );
	camera.position.z = 1000;

    return(
        <Canvas camera={camera} dpr={window.devicePixelRatio}>
            <fog attach="fog" color="black" far={3000}/>
            <EffectComposer>
                <DepthOfField
                    focusDistance={1}
                    bokehScale={100}
                />
                <Vignette />
            </EffectComposer>
            <Points />
        </Canvas>
    );
}

export default Background