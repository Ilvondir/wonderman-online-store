import {User} from "../../models/User";
import {CLEAR_USER, SET_USER} from "../types";

const userReducer = (state = {}, action: { type: string, payload: User }) => {

    switch (action?.type) {
        case SET_USER:
            localStorage.setItem("user", JSON.stringify(action?.payload));
            return action?.payload;
        case CLEAR_USER:
            localStorage.removeItem("user");
            return null;
        default:
            const userString = localStorage.getItem("user");
            return userString ? JSON.parse(userString) : null;
    }

}

export default userReducer;