import {SET_MENU_STATE} from "../types";

export const menuStateReducer = (state: {}, action: { type: string, payload: boolean }) => {
    switch (action?.type) {
        case SET_MENU_STATE:
            localStorage.setItem("menuState", JSON.stringify(action?.payload));
            return action?.payload;
        default:
            const str = localStorage.getItem("menuState");
            return str ? JSON.parse(str) : null;
    }
}