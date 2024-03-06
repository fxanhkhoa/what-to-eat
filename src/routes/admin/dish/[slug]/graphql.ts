import { gql } from '@urql/svelte';

export const queryDishGQL = gql`
	query (
		$keyword: String
		$page: Int
		$limit: Int
		$tags: String
		$preparationTimeFrom: Int
		$preparationTimeTo: Int
		$cookingTimeFrom: Int
		$cookingTimeTo: Int
		$difficultLevels: String
		$mealCategories: String
		$ingredientCategories: String
		$ingredients: String
	) {
		dishes(
			keyword: $keyword
			page: $page
			limit: $limit
			tags: $tags
			preparationTimeFrom: $preparationTimeFrom
			preparationTimeTo: $preparationTimeTo
			cookingTimeFrom: $cookingTimeFrom
			cookingTimeTo: $cookingTimeTo
			difficultLevels: $difficultLevels
			mealCategories: $mealCategories
			ingredientCategories: $ingredientCategories
			ingredients: $ingredients
		) {
			_id
			slug
			title {
				lang
				data
			}
			preparationTime
			cookingTime
			mealCategories
			ingredientCategories
			thumbnail
			createdAt
			updatedAt
		}
	}
`;
