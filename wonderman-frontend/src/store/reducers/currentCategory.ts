import {SET_CURRENT_CATEGORY} from "../types";

export const currentCategoryReducer = (state: {}, action: { type: string, payload: string }) => {
    switch (action?.type) {
        case SET_CURRENT_CATEGORY:
            localStorage.setItem("currentCategory", action?.payload);
            return action?.payload;
        default:
            return localStorage.getItem("currentCategory");
    }
}