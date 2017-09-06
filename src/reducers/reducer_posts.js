import {GET_SEARCH_SIGN_URL,GET_REGISTER_SIGN_URL,POST_USER_DATA,SEARCH_USER_DATA,UPLOAD_PROGRESS,FACE_ANALYSIS_DATA} from '../actions/index';

const INITIAL_STATE = { all: [], post: null, searchUpload: null ,searchData: null,registerUpload: null,uploadProgress: 0,faceAnalysisData: null};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_SEARCH_SIGN_URL:
      return {...state, searchUpload: JSON.parse(action.payload.data.body).input}
    case GET_REGISTER_SIGN_URL:
      return { ...state, registerUpload: JSON.parse(action.payload.data.body).input };
      // return [ action.payload.data , ...state ];
    case POST_USER_DATA:
      return { ...state, all: action.payload.data };
    case SEARCH_USER_DATA:
      var parseData =JSON.parse(action.payload.data.body);
      return { ...state, searchData: parseData.data,searchProfilesData: parseData.profile};
    case UPLOAD_PROGRESS:
      return {...state, uploadProgress: action.payload}
    case FACE_ANALYSIS_DATA:
    console.log(action.payload.data.body);
    return { ...state, faceAnalysisData: JSON.parse(action.payload.data.body).detailface };
    default:
      return state;
  }
}
