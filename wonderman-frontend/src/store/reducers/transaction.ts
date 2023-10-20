import {ClEAR_TRANSACTION, SET_TRANSACTION} from "../types";

export const transactionReducer = (state: {}, action: { type: string, payload: string }) => {
    switch (action?.type) {
        case SET_TRANSACTION:
            localStorage.setItem("transaction", action?.payload);
            return action?.payload;
        case ClEAR_TRANSACTION:
            localStorage.removeItem("transaction");
            return null;
        default:
            return localStorage.getItem("transaction");
    }
}