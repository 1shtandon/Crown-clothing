import { PayloadAction, AnyAction } from "@reduxjs/toolkit";

import { Category } from "./categories.types";

export type FetchCategoriesStart = AnyAction
export type FetchCategoriesSuccess = PayloadAction<Category[]>
export type FetchCategoriesFailure = PayloadAction<Error>
