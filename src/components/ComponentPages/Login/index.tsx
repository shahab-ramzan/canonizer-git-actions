import { useDispatch } from "react-redux";
import { Form } from "antd";

import LoginUI from "./UI";

import { hideLoginModal } from "../../../store/slices/ui/uiSlice";
import { login } from "../../../network/services/auth/index";
import { AppDispatch } from "../../../store";
import { useRouter } from "next/router";

const Login = ({ isModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const router = useRouter();

  const closeModal = () => dispatch(hideLoginModal());

  const onFinish = async (values: any) => {
    try {
      let res = await dispatch(login(values.username, values.password));
      if (res.status_code === 200) {
        form.resetFields();
        closeModal();
        if (!isModal) {
          router.push("/");
        }
      }
      if (values.remember) {
        localStorage.setItem(
          "rememberme",
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginUI
      form={form}
      onFinish={onFinish}
      closeModal={closeModal}
      isModal={isModal}
    />
  );
};

export default Login;
