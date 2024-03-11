import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import billingReducer from "./billing/reducer";
import voluemReducer from "./Volume/reducer";


export default combineReducers({
    authReducer,
    billingReducer,
    voluemReducer
});
