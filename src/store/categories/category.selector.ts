import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";




const selectCategoryReducer = (state): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer], // array of input selectors
    (categoriesSlice) => categoriesSlice.categories // output selector
    // the returned value of the input selector will be the argument for the 
    // output value. createSelector will only run when the categories object is the //same in memory
);

// AS LONG AS THE VALUE IS THE SAME, DO NOT RE-RUN THE createSelector
// Memoization
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => 
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);


