import {createStore, combineReducers} from 'redux';
import userReducer from "./reducers/user";

const reducers = combineReducers({
    user: userReducer
})

const store = createStore(reducers);

export default store;