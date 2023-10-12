import {
    getBillingSuccess,
    getBillingFail,

} from "../constants";

export const initialState = {
    user: null,
    tokens: {},
    userCreated: false,
    passwordUpdate: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case getBillingSuccess:
            return {
                ...state,
                getbilling: action.payload,
            };
        case getBillingFail:
            return {
                ...state,
                getbilling: action.payload.message,
            };
        default:
            return state;
    }

}