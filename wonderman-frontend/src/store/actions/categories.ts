import {CLEAR_CATEGORIES, SET_CATEGORIES} from "../types";

export const setCategories = (categories: []) => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}

export const clearCategories = () => {
    return {
        type: CLEAR_CATEGORIES
    }
}