import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAddNewsRequestApi } from "../../../../network/api/addEditNewsApi";
import { Row, Col, Card } from "antd";
import styles from "../addEditNews.module.scss";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;
const antIcon = <LoadingOutlined spin />;

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [urlErrorMsg, setUrlErrorMsg] = useState("");
  const [urlError, setUrlError] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm();
  const goBack = () => {
    setLoading(true);
    router.back();
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    const { topic_num, camp_num } = router.query;
    const res = await getAddNewsRequestApi({
      topic_num: topic_num,
      camp_num: camp_num,
      available_for_child: values.available_for_child,
      link: values.link,
      display_text: values.display_text,
    });
    if (res.status_code == 200) {
      router.back();
      return;
    }
    if (res.status_code != 200) {
      setUrlError(true);
      setUrlErrorMsg(res.error.link[0]);
      setLoading(false);
    }
  };

  return (
    <Card title="Add News" className={styles.card}>
      <Form
        form={form}
        layout={"vertical"}
        initialValues={{
          available_for_child: 0,
        }}
        onFinish={onFinish}
      >
        <Row gutter={28}>
          <Col xl={14} md={24} xs={24}>
            <Form.Item
              className={styles.formItem}
              name="display_text"
              label={
                <>
                  Display Text <small>(Limit 256 chars)</small>
                </>
              }
              rules={[
                {
                  required: true,
                  message: "Please input text",
                },
              ]}
            >
              <Input.TextArea
                size="large"
                placeholder='New Video:"Consciousness:Not a Hard Problem Just a Color Problem"'
                maxLength={256}
                rows={6}
              />
            </Form.Item>
          </Col>

          <Col xl={10} md={24} xs={24}>
            <Form.Item
              className={`${styles.formItem} mb-3`}
              label={
                <>
                  Link <small>(Limit 2000 chars)</small>
                </>
              }
              name="link"
              validateTrigger="onFinish"
              rules={[
                {
                  required: true,
                  message: "Please input url",
                },
              ]}
            >
              <Input size="large" maxLength={2000} />
            </Form.Item>
            {urlError && <Text type="danger">{urlErrorMsg}</Text>}

            <Form.Item
              className={styles.formItemCheckbox}
              name="available_for_child"
              valuePropName="checked"
            >
              <Checkbox>Available for children</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            size="large"
            className={`btn-orange mr-3 ${styles.btnSubmit}`}
            htmlType="submit"
            disabled={loading}
          >
            Create News
            {loading && <Spin indicator={antIcon} />}
          </Button>
          <Button
            htmlType="button"
            className="cancel-btn"
            type="ghost"
            size="large"
            onClick={goBack}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
