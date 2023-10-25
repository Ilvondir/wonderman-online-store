import {CLEAR_CATEGORIES, SET_CATEGORIES} from "../types";

export const categoriesReducer = (state: {}, action: { type: string, payload: [] }) => {
    switch (action?.type) {
        case SET_CATEGORIES:
            localStorage.setItem("categories", JSON.stringify(action?.payload));
            return action?.payload ? action?.payload : null;
        case CLEAR_CATEGORIES:
            localStorage.removeItem("categories");
            return null;
        default:
            const get = localStorage.getItem("categories");
            return get ? JSON.parse(get) : null;
    }
}