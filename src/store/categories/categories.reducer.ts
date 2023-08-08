import { createSlice } from "@reduxjs/toolkit";

import { Category } from "./categories.types";
import { FetchCategoriesStart, FetchCategoriesSuccess, FetchCategoriesFailure } from "./categories.action";

export type CategoriesState = {
  readonly categoriesArray: Category[]
  readonly isLoading: boolean
  readonly error: Error | null
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categoriesArray: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart: (state, action: FetchCategoriesStart) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action: FetchCategoriesSuccess) => {
      state.categoriesArray = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFailure: (state, action: FetchCategoriesFailure) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
