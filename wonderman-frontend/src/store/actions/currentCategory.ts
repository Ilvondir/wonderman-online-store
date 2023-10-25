import {SET_CURRENT_CATEGORY} from "../types";

export const setCurrentCategory = (cat: string) => {
    return {
        type: SET_CURRENT_CATEGORY,
        payload: cat
    };
}