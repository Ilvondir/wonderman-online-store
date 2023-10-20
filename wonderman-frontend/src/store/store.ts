import {createStore, combineReducers} from 'redux';
import userReducer from "./reducers/user";
import {categoriesReducer} from "./reducers/categories";
import {menuStateReducer} from "./reducers/menuState";
import {transactionReducer} from "./reducers/transaction";

const reducers = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    menuState: menuStateReducer,
    transaction: transactionReducer
})

const store = createStore(reducers);

export default store;