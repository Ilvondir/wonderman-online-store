import {SET_MENU_STATE} from "../types";

export const setMenuState = (menuState: boolean) => {
    return {
        type: SET_MENU_STATE,
        payload: menuState
    };
}