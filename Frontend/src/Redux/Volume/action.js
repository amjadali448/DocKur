import axios from "axios";
import {
    deleteVoluemSuccess,
    deleteVoluemFail

} from "../constants";

axios.defaults.withCredentials = true;
const apiCall = 'http://localhost:5000/';

export const DeleteVolume = (name) => async (dispatch) => {

    const requestPOST = axios.post(apiCall + `removing-volume`, name);
    await requestPOST
        .then(function (response) {
            dispatch({
                type: deleteVoluemSuccess,
                payload: response.data,

            });
debugger
        })
        .catch(function (error) {
            dispatch({
                type: deleteVoluemFail,
                payload: error.response.data,
            });
        });
};

export const RemoveUnusedVolume = (name) => async (dispatch) => {

    const requestPOST = axios.post(apiCall + `Delete-unused-volume`, name);
    await requestPOST
        .then(function (response) {
            dispatch({
                type: deleteVoluemSuccess,
                payload: response.data,

            });

        })
        .catch(function (error) {
            dispatch({
                type: deleteVoluemFail,
                payload: error.response.data,
            });
        });
};

export const ApiCall_POST = (url, data, isAsync) => {

    if (isAsync) {
        return async (dispatch) => {
            try {
                const response = await axios.post(url, data);
                dispatch({ type: "Success", payload: response?.data });
                var result = response.data;
                return result;
            } catch (error) {
                dispatch({ type: "Failed", payload: error });
                throw error;
            }
        };
    } else {
        return (dispatch) => {
            try {
                const response = axios.post(url, data);
                dispatch({ type: "Success", payload: response?.data });
                var result = response.data;
                return result;
            } catch (error) {
                dispatch({ type: "Failed", payload: error });
                throw error;
            }
        };
    }
};
