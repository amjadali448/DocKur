import axios from "axios";
import {
    getBillingSuccess, getBillingFail,

} from "../constants";

axios.defaults.withCredentials = true;
const apiCall = 'http://localhost:5000/v1/';

export const getBillingDetails = (id) => async (dispatch) => {

    const requestPOST = axios.get(`${apiCall}billing/${id}`);
    await requestPOST
        .then(function (response) {
            dispatch({
                type: getBillingSuccess,
                payload: response.data,

            });

        })
        .catch(function (error) {
            dispatch({
                type: getBillingFail,
                payload: error.response.data,
            });
        });
};