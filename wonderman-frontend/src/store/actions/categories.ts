import {SET_CATEGORIES} from "../types";

export const setCategories = (categories: []) => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}