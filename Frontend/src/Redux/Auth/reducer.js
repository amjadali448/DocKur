import {
    getdockerDataSuccess,
    getdockerDataFail
} from "../constants";

export const initialState = {
    user: null,
    tokens: {},
    userCreated: false,
    passwordUpdate: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
      

       
        case getdockerDataSuccess:
            return {
                ...state,
                getdoker: action.payload,
            };
        case getdockerDataFail:
            return {
                ...state,
                getdoker: action.payload.message,
            };

        default:
            return state;
    }
}

