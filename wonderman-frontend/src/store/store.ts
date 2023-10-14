import {createStore, combineReducers} from 'redux';
import userReducer from "./reducers/user";
import {categoriesReducer} from "./reducers/categories";
import {menuStateReducer} from "./reducers/menuState";

const reducers = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    menuState: menuStateReducer
})

const store = createStore(reducers);

export default store;