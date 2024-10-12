export const constants = {
	NUM_INNER_CORE_STARS: 0,
	NUM_OUTER_CORE_STARS: 0,
	NUM_SPIRAL_STARS: 1500,
	NUM_ARMS: 2,
	GALAXY_THICKNESS: 5,
	CORE_X_DIST: 33,
	CORE_Y_DIST: 33,
	OUTER_CORE_X_DIST: 100,
	OUTER_CORE_Y_DIST: 100,
	ARM_X_DIST: 100,
	ARM_Y_DIST: 50,
	ARM_X_MEAN: 200,
	ARM_Y_MEAN: 100,
	SPIRAL: 3,
	STAR_BLOOM_INTENSITY: 2,

	NUM_INNER_CORE_HAZE: 10,
	NUM_OUTER_CORE_HAZE: 10,
	NUM_SPIRAL_HAZE: 200,
	HAZE_MAX: 100.0,
	HAZE_MIN: 30.0,
	HAZE_BLOOM_INTENSITY: 1,
};

export interface Star {
	rarity: number;
	color: string;
	size: number;
}

export interface HazePoint {
	color: string;
	size: number;
}

export enum GalaxyComponent {
	Stars,
	Haze,
}
