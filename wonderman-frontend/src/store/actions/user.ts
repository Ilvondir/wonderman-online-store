import {User} from "../../models/User";
import {CLEAR_USER, SET_USER} from "../types";

export const setUser = (user: User) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}