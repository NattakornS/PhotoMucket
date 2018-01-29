import axios from 'axios';

export const GET_SEARCH_SIGN_URL = 'GET_SEARCH_SIGN_URL';
export const GET_REGISTER_SIGN_URL = 'GET_REGISTER_SIGN_URL';
export const POST_USER_DATA = 'POST_USER_DATA';
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO';
export const SEARCH_USER_DATA = 'SEARCH_USER_DATA';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const FACE_ANALYSIS_DATA = 'FACE_ANALYSIS_DATA';


const ROOT_URL = 'https://xoz9ueh88l.execute-api.us-east-1.amazonaws.com/dev/rekognition';
const API_KEY = '';

export function getSignUrl(action,params){
  const request = axios.get(`${ROOT_URL}/${action}/signUrl`,{
    headers: {
      "x-api-key":API_KEY
    },
    params: params
  });
  if (action === 'search') {
    return {
      type: GET_SEARCH_SIGN_URL,
      payload: request
    }
  }else{
    return {
      type: GET_REGISTER_SIGN_URL,
      payload: request
    }
  }
}
export function uploadPhoto(signedUrl, file ,progressFunc){
  var options = {
    headers: {
      'Content-Type': file.type
    },
    onUploadProgress: progressFunc
  };
  const request = axios.put(signedUrl, file, options);
  return {
    type: UPLOAD_PHOTO,
    payload: request
  }
}
export function postUserData(props){
  console.log(props);
  const request = axios.post(`${ROOT_URL}/register`,props,{
    headers: {
    "x-api-key":API_KEY
    }
  });
  return {
    type: POST_USER_DATA,
    payload: request
  }
}

export function getUserData(params){
  const request = axios.get(`${ROOT_URL}/search`,{
    headers: {
      "x-api-key":API_KEY
    },
    params: params
  });
  return {
    type: SEARCH_USER_DATA,
    payload: request
  }
}

export function getAnalysisFace(params){
  const request = axios.get(`${ROOT_URL}/faceanalysis`,{
    headers: {
      "x-api-key":API_KEY
    },
    params: params
  });
  return {
    type: FACE_ANALYSIS_DATA,
    payload: request
  }
}

export function uploadProgress(progress){
  return {
    type: UPLOAD_PROGRESS,
    payload: progress
  }
}
