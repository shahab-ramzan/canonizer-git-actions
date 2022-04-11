import NetworkCall from "../networkCall";
import { message } from "antd";
import addEditNewsRequest from "../request/addEditNewsRequests";

export const getAddNewsRequestApi = async (body) => {
  try {
    const editnewsdata = await NetworkCall.fetch(
      addEditNewsRequest.getAddNewsrequest(body)
    );

    return editnewsdata;
  } catch (error) {
    message.error(error.message);
    return error.error.data;
  }
};

export const getEditNewsFeedApi = async (body) => {
  try {
    const editnewsdat = await NetworkCall.fetch(
      addEditNewsRequest.geteditNewsFeedData(body)
    );

    return editnewsdat;
  } catch (error) {
    message.error(error.message);
  }
};

export const getUpdateNewsFeedApi = async (body) => {
  try {
    const editnewsdat = await NetworkCall.fetch(
      addEditNewsRequest.getUpdateNewsFeedData(body)
    );
    return editnewsdat;
  } catch (error) {
    message.error(error.message);
    return error.error.data;
  }
};
