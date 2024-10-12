import * as THREE from "three";
import {
	constants,
	GalaxyComponent,
	HazePoint,
	Star,
} from "../config/galaxy-data";

export const generateGalaxyComponent = function (
	type: GalaxyComponent,
	genFunction: () => Star | HazePoint
): Float32Array[] {
	let numInnerCoreObjs: number, numOuterCoreObjs: number, numSpiralObjs: number;

	if (type == GalaxyComponent.Stars) {
		numInnerCoreObjs = constants.NUM_INNER_CORE_STARS;
		numOuterCoreObjs = constants.NUM_OUTER_CORE_STARS;
		numSpiralObjs = constants.NUM_SPIRAL_STARS;
	} else {
		numInnerCoreObjs = constants.NUM_INNER_CORE_HAZE;
		numOuterCoreObjs = constants.NUM_OUTER_CORE_HAZE;
		numSpiralObjs = constants.NUM_SPIRAL_HAZE;
	}

	const numObjs =
		numInnerCoreObjs + numOuterCoreObjs + numSpiralObjs * constants.NUM_ARMS;

	const vertices = new Float32Array(numObjs * 3);
	const colors = new Float32Array(numObjs * 3);
	const sizes = new Float32Array(numObjs);
	let k = 0;

	for (let i = 0; i < numInnerCoreObjs; i++) {
		generateInnerCorePoint(vertices, colors, sizes, k, genFunction);
		k += 3;
	}

	for (let i = 0; i < numOuterCoreObjs; i++) {
		generateOuterCorePoint(vertices, colors, sizes, k, genFunction);
		k += 3;
	}

	for (let i = 0; i < constants.NUM_ARMS; i++) {
		for (let j = 0; j < numSpiralObjs; j++) {
			generateSpiralArmPoint(vertices, colors, sizes, k, i, genFunction);
			k += 3;
		}
	}

	return [vertices, colors, sizes];
};

const generateInnerCorePoint = function (
	vertices: Float32Array,
	colors: Float32Array,
	sizes: Float32Array,
	i: number,
	genFunction: () => Star | HazePoint
) {
	vertices[i] = gaussianRandom(0, constants.CORE_X_DIST);
	vertices[i + 1] = gaussianRandom(0, constants.GALAXY_THICKNESS);
	vertices[i + 2] = gaussianRandom(0, constants.CORE_Y_DIST);

	const obj = genFunction();
	const bloomIntensity = isStar(obj)
		? constants.STAR_BLOOM_INTENSITY
		: constants.HAZE_BLOOM_INTENSITY;
	assignColorAndSizeAtIndex(obj, colors, sizes, i, bloomIntensity);
};

const generateOuterCorePoint = function (
	vertices: Float32Array,
	colors: Float32Array,
	sizes: Float32Array,
	i: number,
	genFunction: () => Star | HazePoint
) {
	vertices[i] = gaussianRandom(0, constants.OUTER_CORE_X_DIST);
	vertices[i + 1] = gaussianRandom(0, constants.GALAXY_THICKNESS);
	vertices[i + 2] = gaussianRandom(0, constants.OUTER_CORE_Y_DIST);

	const obj = genFunction();
	const bloomIntensity = isStar(obj)
		? constants.STAR_BLOOM_INTENSITY
		: constants.HAZE_BLOOM_INTENSITY;
	assignColorAndSizeAtIndex(obj, colors, sizes, i, bloomIntensity);
};

const generateSpiralArmPoint = function (
	vertices: Float32Array,
	colors: Float32Array,
	sizes: Float32Array,
	i: number,
	armNum: number,
	genFunction: () => Star | HazePoint
) {
	const pos = spiral(
		gaussianRandom(constants.ARM_X_MEAN, constants.ARM_X_DIST),
		gaussianRandom(constants.ARM_Y_MEAN, constants.ARM_Y_DIST),
		gaussianRandom(0, constants.GALAXY_THICKNESS),
		(armNum * 2 * Math.PI) / constants.NUM_ARMS
	);

	vertices[i] = pos.x;
	vertices[i + 1] = pos.z;
	vertices[i + 2] = pos.y;

	const obj = genFunction();
	const bloomIntensity = isStar(obj)
		? constants.STAR_BLOOM_INTENSITY
		: constants.HAZE_BLOOM_INTENSITY;
	assignColorAndSizeAtIndex(obj, colors, sizes, i, bloomIntensity);
};

const gaussianRandom = function (mean = 0, stdev = 1): number {
	const u = 1 - Math.random();
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

	return z * stdev + mean;
};

const spiral = function (
	x: number,
	y: number,
	z: number,
	offset: number
): THREE.Vector3 {
	const r = Math.sqrt(x ** 2 + y ** 2);
	let theta = offset;
	theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
	theta += (r / constants.ARM_X_DIST) * constants.SPIRAL;
	return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
};

const assignColorAndSizeAtIndex = function (
	obj: Star | HazePoint,
	colors: Float32Array,
	sizes: Float32Array,
	i: number,
	bloomIntensity: number
) {
	colors[i] = (parseInt(obj.color.slice(2, 4), 16) / 255) * bloomIntensity;
	colors[i + 1] = (parseInt(obj.color.slice(4, 6), 16) / 255) * bloomIntensity;
	colors[i + 2] = (parseInt(obj.color.slice(6, 8), 16) / 255) * bloomIntensity;
	sizes[i / 3] = obj.size;
};

const isStar = function (obj: Star | HazePoint): obj is Star {
	return "rarity" in obj;
};
