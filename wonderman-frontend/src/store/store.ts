import {createStore, combineReducers} from 'redux';
import userReducer from "./reducers/user";
import {categoriesReducer} from "./reducers/categories";
import {menuStateReducer} from "./reducers/menuState";
import {transactionReducer} from "./reducers/transaction";
import {currentCategoryReducer} from "./reducers/currentCategory";

const reducers = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    menuState: menuStateReducer,
    transaction: transactionReducer,
    currentCategory: currentCategoryReducer
})

const store = createStore(reducers);

export default store;