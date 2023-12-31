import NetworkCall from "../networkCall";

import FooterRequests from "../request/footerRequests";

export const getFooterSocialLinksApi = async () => {
  const links = await NetworkCall.fetch(
    FooterRequests.getFooterSocialLinks(),
    false
  );

  return links?.data;
};
