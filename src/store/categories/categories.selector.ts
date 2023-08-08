import { createSelector } from "reselect";

import { RootState } from "../store";
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

const selectCategoriesArray = createSelector(
  [selectCategoryReducer],
  (categoryReducer) => categoryReducer.categoriesArray
);

export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray): CategoryMap =>
    categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;

      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoryReducer) => categoryReducer.isLoading
)
