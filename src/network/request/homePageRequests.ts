import K from "../../constants";
import Request from ".";
export default class HomePageRequests extends Request {
  constructor(params) {
    super(params);
  }

  static getCanonizedTopics(reqBody) {
    return new Request(
      K.Network.URL.GetCanonizedTopics,
      K.Network.Method.POST,
      reqBody,
      K.Network.Header.Type.formData,
      {}
    );
  }

  static getCanonizedNameSpaces(token) {
    return new Request(
      K.Network.URL.GetCanonizedNameSpaces,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      token
    );
  }

  static getCanonizedRecentActivities(reqBody, token) {
    return new Request(
      K.Network.URL.GetCanonizedRecentActivities,
      K.Network.Method.POST,
      reqBody,
      K.Network.Header.Type.Json,
      {},
      token
    );
  }

  static getCanonizedAlgorithms(token) {
    return new Request(
      K.Network.URL.GetCanonizedAlgorithms,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      token
    );
  }

  static getCanonizedWhatsNewContent(token) {
    return new Request(
      K.Network.URL.GetWhatsNewContent,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      token
    );
  }
}
