import {
    deleteVoluemSuccess,
    deleteVoluemFail

} from "../constants";

export const initialState = {
  
};

export default function (state = initialState, action) {
    switch (action.type) {
        case deleteVoluemSuccess:
            return {
                ...state,
                getbilling: action.payload,
            };
        case deleteVoluemFail:
            return {
                ...state,
                delete: action.payload.message,
            };
        default:
            return state;
    }

}