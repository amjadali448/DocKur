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
    getListofImagesFail, getStartSuccess,
    getStartFail,
    getStopSuccess,
    getStopFail,
    getDeleteSuccess,
    getDeleteFail,
    getVolumelistSuccess,
    getVolumelistFail

} from "../constants";

const initialState = {
    data: null,


};

export default function (state = initialState, action) {
    switch (action.type) {
        // Each action function have Sucess andd Fail i-e these 2 are Networklist 
        // these are define in containers and then import in action and reducer
        case getNetworkDataSuccess:// (1) Sucess or get error msg to get payload 
            return {
                ...state,
                Networklist: action.payload, // Update 'data' property State and them inport in Home Line (972) and in props
            };
        case getNetworkDataFail:// (2) fail or get error msg
            return {
                ...state,
                Networklist: action.payload.message, // Update 'data' property
            };
        //-----
        case getCreateNetworSuccess:
            return {
                ...state,
                createNetwork: action.payload, // Update 'data' property
            };
        case getCreateNetworFail:
            return {
                ...state,
                createNetwork: action.payload.message, // Update 'data' property
            };

        case getImportImgSuccess:
            return {
                ...state,
                importImg: action.payload, // Update 'data' property
            };
        case getImportImgFail:
            return {
                ...state,
                importImg: action.payload.message, // Update 'data' property
            };

        case getContainerListSuccess:
            return {
                ...state,
                containerLists: action.payload, // Update 'data' property
            };
        case getContainerListFail:
            return {
                ...state,
                containerLists: action.payload.message, // Update 'data' property
            };

        case getListofImagesSuccess:
            return {
                ...state,
                listContainer: action.payload, // Update 'data' property
            };
        case getListofImagesFail:
            return {
                ...state,
                listContainer: action.payload.message, // Update 'data' property
            };


        case getVolumelistSuccess:
            return {
                ...state,
                volumelist: action.payload, // Update 'data' property
            };
        case getVolumelistFail:
            return {
                ...state,
                volumelist: action.payload.message, // Update 'data' property
            };
        case getStartSuccess:
            return {
                ...state,
                Start: action.payload, // Update 'data' property
            };
        case
            getStartFail:
            return {
                ...state,
                Start: action.payload.message, // Update 'data' property
            };


        case
            getStopSuccess:
            return {
                ...state,
                Stop: action.payload, // Update 'data' property
            };
        case
            getStopFail:
            return {
                ...state,
                Stop: action.payload.message, // Update 'data' property
            };


        case
            getDeleteSuccess:
            return {
                ...state,
                Delete: action.payload, // Update 'data' property
            };
        case
            getDeleteFail:
            return {
                ...state,
                Delete: action.payload.message, // Update 'data' property
            };




        default:
            return state;
    }
}

