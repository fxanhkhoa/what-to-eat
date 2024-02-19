import type { Dish } from "../../gql/graphql";

export type WheelOfFortuneResult = {
	result: Dish;
	position: number;
};
