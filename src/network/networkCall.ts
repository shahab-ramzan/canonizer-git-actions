import axios from "axios";
import K from "../constants";
import { trackPromise } from "react-promise-tracker";
import UserRequest from "./request/userRequest";
import { camelCaseKeys } from "../utils/generalUtility";

export default class NetworkCall {
  static async fetch(request, useLoading = true) {
    const axiosCall = () => {
      return NetworkCall.axios({
        method: request.method,
        url: request.url,
        data: request.body,
        headers: request.headers,
        validateStatus: (status) => {
          return status == 200;
        },
      });
    };
    try {
      const response: any = useLoading
        ? await trackPromise(axiosCall())
        : await axiosCall();
      return response.data;
    } catch (err) {
      let error = err.response;
      if (error === undefined) {
        return Promise.reject({
          error: error,
        });
      } else if (error.status === K.Network.StatusCode.Invalid) {
        UserRequest.logoutCall("Invalid User");
      } else if (error.status === K.Network.StatusCode.Unauthorized) {
        UserRequest.logoutCall("User unauthorized");
      }

      if ("errors" in error.data)
        error.data.errors = camelCaseKeys(error.data.errors);
      return Promise.reject({
        error: error,
      });
    }
  }
  static axios(arg0: {
    method: any;
    url: any;
    data: any;
    headers: any;
    validateStatus: (status: any) => boolean;
  }): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
NetworkCall.axios = axios.create({
  baseURL: K.Network.URL.BaseAPI,
  timeout: +K.Network.URL.Timeout,
  headers: {},
});
