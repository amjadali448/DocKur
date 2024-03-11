import axios from "axios";
import { getdockerDataSuccess, getdockerDataFail } from "../constants";

axios.defaults.withCredentials = true;
const apiCall = 'http://localhost:5000/';

export const getDockerData = () => async (dispatch) => {
  debugger
  const requestPOST = axios.get(`${apiCall}container-list}`);
  try {
    const response = await requestPOST;
    dispatch({
      type: getdockerDataSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getdockerDataFail,
      payload: error,
    });
  }
};
// export const getDockerData = (id) => async (dispatch) => {
//   debugger
//   const requestPOST = axios.get(`${apiCall}container-list/${id}`);
//   try {
//     const response = await requestPOST;
//     dispatch({
//       type: getdockerDataSuccess,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: getdockerDataFail,
//       payload: error.response.data,
//     });
//   }
// };





