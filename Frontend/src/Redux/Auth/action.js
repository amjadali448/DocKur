import axios from "axios";
import {
  getNetworkDataSuccess,
  getNetworkDataFail,
  getImportImgSuccess,
  getImportImgFail,
  getCreateNetworSuccess,
  getCreateNetworFail,
  getContainerListSuccess,
  getContainerListFail,
  getListofImagesSuccess,
  getListofImagesFail,
  getStartSuccess,
  getStartFail,
  getStopSuccess,
  getStopFail,
  getDeleteSuccess,
  getDeleteFail,
  getVolumelistSuccess,
  getVolumelistFail

} from "../constants";

axios.defaults.withCredentials = true;
const apiCall = 'http://54.210.126.34:2375/';



// COMMON API
export const ApiCall_GET = (url, isAsync) => {

  
  if (isAsync) {
    return async (dispatch) => {
      try {

        const response = await axios.get(url);
        const result = response.data;

        dispatch({ type: 'Success', payload: result });
        return result;
      } catch (error) {
        dispatch({ type: 'Failed', payload: error });
        throw error;
      }
    };
  } else {
    return async (dispatch) => {
      try {
        const response = await axios.get(url);
        const result = response.data;
        dispatch({ type: 'Success', payload: result });
        return result;
      } catch (error) {
        dispatch({ type: 'Failed', payload: error });
        throw error;
      }
    };
  }
};

// Api calll function
export const ContainerList = () => async (dispatch) => {
  //Url 
  const requestPOST = axios.post(`http://localhost:5000/container-list`);
  
  try {
    const response = await requestPOST;
    console.log('ContainerList', response.data)
    dispatch({

      type: getContainerListSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getContainerListFail,
      payload: error,
    });
  }
};
export const geNetworkData = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/network-list`);
  // const requestPOST = axios.get(`http://54.210.126.34:2375/networks`);

  try {
    const response = await requestPOST;
    console.log('geNetworkData', response.data)
    dispatch({

      type: getNetworkDataSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getNetworkDataFail,
      payload: error,
    });
  }
};
export const CreateNetwork = (data) => async (dispatch) => {
debugger
  const requestPOST = axios.post(`http://localhost:5000/Create-network`, data);
  try {
    const response = await requestPOST;
    console.log('CreateNetwork', response.data)
    dispatch({

      type: getCreateNetworSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getCreateNetworFail,
      payload: error,
    });
  }
};
export const ImportImage = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/network-list`);

  try {
    const response = await requestPOST;
    console.log('ImportImage', response.data)
    dispatch({

      type: getImportImgSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getImportImgFail,
      payload: error,
    });
  }
};

export const CreateImage = () => async (dispatch) => {
debugger
  const requestPOST = axios.post(`http://localhost:5000/Create-container`);
  try {
    const response = await requestPOST;
    console.log('CreateImage', response.data)
    dispatch({

      type: getCreateNetworSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getCreateNetworFail,
      payload: error,
    });
  }
};

export const ListofImages = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/container-list`);

  try {
    const response = await requestPOST;
    console.log('ListofImages', response.data)
    dispatch({

      type: getListofImagesSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getListofImagesFail,
      payload: error,
    });
  }
};


export const starts = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/start-container`);

  try {
    const response = await requestPOST;
    console.log('starts', response.data)
    dispatch({

      type: getStartSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getStartFail,
      payload: error,
    });
  }
};
export const Stop = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/stop-container`);

  try {
    const response = await requestPOST;
    console.log('Stop', response.data)
    dispatch({

      type: getStopSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getStopFail,
      payload: error,
    });
  }
};
export const Delete = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/delete-container`);

  try {
    const response = await requestPOST;
    console.log('Delete', response.data)
    dispatch({

      type: getDeleteSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getDeleteFail,
      payload: error,
    });
  }
};

export const AddVolume = (data) => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/Create-volume`, data);

  try {
    const response = await requestPOST;
    dispatch({

      type: getDeleteSuccess,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: getDeleteFail,
      payload: error,
    });
  }
};

export const getVolumelist = () => async (dispatch) => {
  const requestPOST = axios.post(`http://localhost:5000/volume-list`);
  // const requestPOST = axios.get(`http://54.210.126.34:2375/networks`);
  try {
    const response = await requestPOST;
    console.log('getVolumelist', response.data.Volumes)
    dispatch({
      type: getVolumelistSuccess,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: getVolumelistFail,
      payload: error,
    });
  }
};
// export const saveDockerData = (Obj) => async (dispatch) => {
//
//   const requestPOST = axios.post(`${apiCall}container-list`,Obj);
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





