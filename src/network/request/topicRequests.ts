import K from "../../constants";
import Request from ".";
import { store } from "../../store";

export default class TopicRequest extends Request {
  constructor(params) {
    super(params);
  }

  static createTopic(body) {
    let state = store.getState();
    const { auth } = state;

    return new Request(
      K.Network.URL.CreateTopic,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      auth.loggedInUser.token
    );
  }

  //getTopicsSuypported camps
  static GetActiveSupportTopic(body) {
    let state = store.getState();
    const { auth } = state;

    return new Request(
      K.Network.URL.GetActiveSupportTopic,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      auth.loggedInUser.token
    );
  }
  //GetCheckSupportExists
  static GetCheckSupportExists(reqbody, authToken) {
    return new Request(
      K.Network.URL.GetCheckSupportExists + reqbody,
      K.Network.Method.GET,
      {},
      K.Network.Header.Type.Json,
      {},
      authToken
    );
  }
}
