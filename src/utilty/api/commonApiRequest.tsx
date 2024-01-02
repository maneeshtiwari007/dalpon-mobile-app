import { api } from "./configs/axiosConfigs"
import { defineCancelApiObject } from "./configs/axiosUtils"
export const CommonApiRequest = {
  //Just For M
  loginUser: async function (params: any, cancel = false) {
    const response: any = await api.request({
      url: `/login`,
      method: "POST",
      data: params,
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getUserWorkOrder:async function(params:any){
    const response: any = await api.request({
      url: `/workorder/list`+params,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getDashboardData:async function(params:any){
    const response: any = await api.request({
      url: `/dashboard`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getWorkOrderDetail:async function(params:any){
    const response: any = await api.request({
      url: `/workorder/`+params,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  endWorkoutTimer:async function(params:any){
    const response: any = await api.request({
      url: `/workorder/end`,
      method: "POST",
      data: params,
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  startWorkoutTimer:async function(params:any){
    const response: any = await api.request({
      url: `/workorder/start`,
      method: "POST",
      data: params,
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getAnyUserDetail:async function(params:any){
    const response: any = await api.request({
      url: `/users/`+params,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  upDateUserProfile:async function(params:any,id:any){
    const response: any = await api.request({
      url: `/users/`+id,
      method: "POST",
      data: params,
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getTeams:async function(params:any){
    const response: any = await api.request({
      url: `/teams`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
  getTeamsList:async function(params:any){
    const response: any = await api.request({
      url: `/teams/list`,
      method: "GET",
      // retrieving the signal value by using the property name
      signal: undefined,
    });
    // returning the product returned by the API
    return response?.data;
  },
}
const cancelApiObject = defineCancelApiObject(CommonApiRequest)