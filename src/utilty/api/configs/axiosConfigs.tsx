import axios from "axios"
import { CommonHelper } from "../../CommonHelper"
import { ConstantsVar } from "../../ConstantsVar";
import { DeviceEventEmitter } from "react-native";
import Colors from "../../Colors";

export const api = axios.create({
  withCredentials: true,
  baseURL: 'http://dalpon.kurieta.info/api/v1/',
})


api.interceptors.request.use(async (config) => {
  const token:any = await CommonHelper.getData(ConstantsVar.USER_STORAGE_KEY);
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token?.token;
  }
  api.defaults.headers.common['Content-Type'] = 'application/json';
    return config;
},
error => {

});
api.interceptors.response.use(
  async (response) => {
    return response
  },
  function (error) {
    return errorHandler(error);
    
    //return Promise.reject(error)
  }
)
// defining a custom error handler for all APIs
const errorHandler = (error:any) => {
  const statusCode = error.response?.status;
  console.log(statusCode);
  // logging only errors that are not 401
  if (statusCode && statusCode === 405) {
    DeviceEventEmitter.emit(ConstantsVar.API_ERROR,{color:Colors.errorColor,msgData:{head:'Error',subject:'Something went wronf please try after some time!'}})
  }

  return Promise.reject(statusCode)
}

// registering the before request interceptor
// "api" axios instance
