import {createStore, combineReducers} from "redux";

import user from "./reducers/user";

const rootReducer = combineReducers({
    user,
});

const store = createStore(rootReducer);

export default store;
