import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCollectionAndDocuments } from "../../utils/firebase/firestore.utils";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from "./categories.reducer";

import { Category } from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCollectionAndDocuments<Category>, 'categories');
        yield* put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield* put(fetchCategoriesFailure(error as Error))
    }
}

export function* onFetchCategories() {
    yield* takeLatest(fetchCategoriesStart.type, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])
}