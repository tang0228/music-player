import {createStore, combineReducers} from "redux";

import user from "./reducers/user";
import song from "./reducers/song";

const rootReducer = combineReducers({
    user,
    song,
});

const store = createStore(rootReducer);

export default store;
