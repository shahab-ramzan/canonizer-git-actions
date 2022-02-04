const BaseCanonizerServiceUrl = process.env.NEXT_PUBLIC_BASE_SERVICE_URL;
const BaseCanonizerApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const NetworkConstants = {
  URL: {
    BaseAPI: BaseCanonizerApiUrl,
    Base: process.env.NEXT_PUBLIC_BASE_URL,
    Timeout: process.env.NEXT_PUBLIC_TIMEOUT,
    Client: {
      BaseHost: process.env.NEXT_PUBLIC_CLIENT_BASE_HOST,
      BasePort: process.env.NEXT_PUBLIC_CLIENT_BASE_PORT,
    },
    // User
    CreateToken: `${BaseCanonizerApiUrl}/client_token`,
    LoginUser: "/user/login",
    LogoutUser: "/user/logout",
    RegisterUser: "/register",
    VerifyRegisterUser: "/verifyOtp",
    UpdateUser: "/users/",
    ChangePassword: "/changepassword",
    GetUserProfileInfo: "/user/profile",
    UpdateUserProfileInfo: "/updateprofile",
    GetMobileCarrier: "/mobilecarrier",
    SendOTP: "/sendotp",
    VerifyOTP: "/verifyotp",
    // Tree

    GetTree: "/api/unknown",

    // HomePage
    GetCanonizedTopics: `${BaseCanonizerServiceUrl}/api/v1/topic/getAll`,

    GetCanonizedNameSpaces: `${BaseCanonizerApiUrl}/api/v3/get_all_namespaces`,
    GetWhatsNewContent: `${BaseCanonizerApiUrl}/api/v3/get_whats_new_content`,
    GetCanonizedAlgorithms: `${BaseCanonizerApiUrl}/api/v3/get_algorithms`,

    //footer

    GetFooterSocialLinks: `${BaseCanonizerApiUrl}/api/v3/get_social_media_links`,
  },
  Method: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
  },
  Header: {
    ContentType: "Content-Type",
    ApplicationJson: "application/json",
    Default: (token = "") => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    }),
    Authorization: (token = "") => ({
      // Authorization: "Bearer " + token,
      // "Content-Type": "multipart/form-data",
      // Accept: "application/json",
      "Content-Type": "application/json",
    }),
    Type: {
      Json: "json",
      File: "file",
      formData: "multipart/form-data",
    },
  },
  Default: {
    Error: "Opps, an error occurred!",
  },
  StatusCode: {
    Unauthorized: 401,
    Invalid: 401,
    NotFound: 404,
  },
};
export default NetworkConstants;