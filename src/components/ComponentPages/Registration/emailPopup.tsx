import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form } from "antd";

import EmailConfirmation from "./UI/email";
import { hideSocialEmailPopup } from "../../../store/slices/uiSlice";
import {
  resendOTPForRegistration,
  verifyEmailOnSocial,
} from "../../../network/api/userApi";
import { AppDispatch } from "../../../store";
import Spinner from "../../common/spinner/spinner";

const EmailPopup = ({ isModal = false }) => {
  const [isOTP, setIsOTP] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [failedMsg, setFailedMsg] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [form] = Form.useForm();

  const closeModal = () => {
    dispatch(hideSocialEmailPopup());

    form.resetFields();
    setIsOTP(false);
    setIsResend(false);
  };

  const onSubmit = async (values: any) => {
    setFormData(values);
    let formBody = {
      email: values?.email?.trim(),
    };

    let res = await resendOTPForRegistration(formBody);

    if (res && res.status_code === 200) {
      form.resetFields();

      setIsOTP(true);
    }
  };

  const onOTPSubmit = async (values: any) => {
    const social_keys = JSON.parse(localStorage.getItem("s_l"));
    const redirectSocial = localStorage.getItem("rd_s");

    let body = {
      email: formData.email?.trim(),
      otp: values.otp?.trim(),
      code: social_keys?.code,
      provider: social_keys?.provider,
      client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_PASSWORD_ID,
      client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_PASSWORD_SECRET,
    };

    if (values.otp?.trim()) {
      let res = await verifyEmailOnSocial(body);
      if (res) {
        setFailedMsg(res.message);
      }
      if (res && res.status_code === 200) {
        form.resetFields();
        setIsOTP(false);
        setIsResend(false);
        isModal ? closeModal() : "";

        if (redirectSocial) {
          localStorage.removeItem("rd_s");
          router.push({
            pathname: "/settings",
            query: {
              tab: "profile",
            },
          });
        } else {
          router.push("/");
        }
      }
    } else {
      form.resetFields(["otp"]);

      form.validateFields(["otp"]);
    }
  };

  // on resend click
  const onResendClick = async () => {
    let formBody = {
      email: formData.email,
    };

    await resendOTPForRegistration(formBody);
  };

  return (
    <Fragment>
      <Spinner>
        <EmailConfirmation
          form={form}
          onFinish={isOTP ? onOTPSubmit : onSubmit}
          closeModal={closeModal}
          isModal={isModal}
          isOTP={isOTP}
          onResendClick={onResendClick}
          isResend={isResend}
        />
      </Spinner>
    </Fragment>
  );
};

export default EmailPopup;
