import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import billingReducer from "./billing/reducer";


export default combineReducers({
    authReducer,
    billingReducer,
});
