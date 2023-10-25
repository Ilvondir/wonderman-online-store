import {ClEAR_TRANSACTION, SET_TRANSACTION} from "../types";

export const setTransaction = (transaction: string) => {
    return {
        type: SET_TRANSACTION,
        payload: transaction
    };
}

export const clearTransaction = () => {
    return {
        type: ClEAR_TRANSACTION,
    }
}