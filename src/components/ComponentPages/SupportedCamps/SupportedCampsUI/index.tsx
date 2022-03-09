import React from "react";
import { Card, Modal, Tag, Button, Form } from "antd";
import Icon, {
  CloseCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import styles from "./SupportedCamps.module.scss";
export default function SupportedCampsUI({
  RemoveCardSupportedCamps,
  handleSupportedCampsCancel,
  isSupportedCampsModalVisible,
}) {
  function CardTitle(props) {
    return (
      <div className={styles.card_heading_title}>
        For topics<span> "{props.value}"</span>
      </div>
    );
  }
  return (
    <div>
      <Card
        className={styles.cardBox_tags}
        type="inner"
        size="default"
        title={<CardTitle value="Theories of Consciousness" />}
        extra={
          <a
            className={styles.RemoveCardSupported}
            onClick={() => RemoveCardSupportedCamps()}
          >
            <CloseCircleOutlined /> Remove support{" "}
          </a>
        }
        style={{ width: 760, marginBottom: 16 }}
      >
        {/* <p>1.{" "} <b style={{"color":"#6A90C4"}}> Next.js</b></p>
                <p>2. {" "}<b style={{"color":"#6A90C4"}}> React.js</b></p> */}
        <Tag
          className={styles.tag_btn}
          closable
          closeIcon={<CloseCircleOutlined />}
        >
          <div>
            {" "}
            <span className={styles.count}>1. </span> Representational Quilia
          </div>
        </Tag>
      </Card>
      <Card
        className={styles.cardBox_tags}
        type="inner"
        size="default"
        title={<CardTitle value="Front End Language" />}
        extra={
          <a
            className={styles.RemoveCardSupported}
            onClick={() => RemoveCardSupportedCamps()}
          >
            <CloseCircleOutlined /> Remove support{" "}
          </a>
        }
        style={{ width: 760, marginBottom: 16 }}
      >
        {/* <p>1.{" "}<b style={{"color":"#6A90C4"}}> Next.js</b></p> */}
        <Tag
          className={styles.tag_btn}
          closable
          closeIcon={<CloseCircleOutlined />}
        >
          <div>
            {" "}
            <span className={styles.count}>1. </span> Next JS{" "}
          </div>
        </Tag>
        <Tag
          className={styles.tag_btn}
          closable
          closeIcon={<CloseCircleOutlined />}
        >
          <div>
            {" "}
            <span className={styles.count}>2. </span> react JS Framework
          </div>
        </Tag>
      </Card>
      <Card
        className={styles.cardBox_tags}
        type="inner"
        size="default"
        title={<CardTitle value="Front End Language" />}
        extra={
          <a
            className={styles.RemoveCardSupported}
            onClick={() => RemoveCardSupportedCamps()}
          >
            <CloseCircleOutlined /> Remove support{" "}
          </a>
        }
        style={{ width: 760, marginBottom: 16 }}
      >
        {/* <p>1.{" "}<b style={{"color":"#6A90C4"}}> reactJsFrameWork</b></p> */}

        <Tag
          className={styles.tag_btn}
          closable
          closeIcon={<CloseCircleOutlined />}
        >
          <div>
            {" "}
            <span className={styles.count}>1. </span> Next JS{" "}
          </div>
        </Tag>
        <Tag
          className={styles.tag_btn}
          closable
          closeIcon={<CloseCircleOutlined />}
        >
          <div>
            {" "}
            <span className={styles.count}>2. </span> react JS Framework
          </div>
        </Tag>
      </Card>

      <Modal
        className={styles.modal_cross}
        title="Remove Support"
        visible={isSupportedCampsModalVisible}
        onOk={handleSupportedCampsCancel}
        onCancel={handleSupportedCampsCancel}
        footer={null}
        closeIcon={<CloseCircleOutlined />}
      >
        <Form>
          <Form.Item style={{ marginBottom: "0px" }}>
            <p>
              Your Support for all the capps under the Topics{" "}
              <span className={styles.Bluecolor}>"Front End Language"</span>{" "}
              will be removed. Are you sure you want to continue?
            </p>
          </Form.Item>
          <Form.Item
            className={styles.text_right}
            style={{ marginBottom: "0px" }}
          >
            <Button
              onClick={handleSupportedCampsCancel}
              type="primary"
              style={{
                marginTop: 10,
                marginRight: 10,
              }}
              className="ant-btn ant-btn-orange"
            >
              Remove
            </Button>
            <Button
              onClick={handleSupportedCampsCancel}
              type="default"
              style={{
                marginTop: 10,
              }}
              className="ant-btn"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
