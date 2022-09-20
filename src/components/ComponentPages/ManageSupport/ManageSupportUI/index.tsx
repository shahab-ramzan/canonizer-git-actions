import React, { useState, useEffect } from "react";
import { Card, Tag, Select } from "antd";
import messages from "../../../../messages";
import styles from "../ManageSupportUI/ManageSupport.module.scss";
import Link from "next/link";
import { Button, Col } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { DraggableArea } from "react-draggable-tags";
import { placeholders } from "./../../../../messages/placeholder";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useRouter } from "next/router";
import { addSupport } from "src/network/api/userApi";
const ManageSupportUI = ({
  nickNameList,
  manageSupportList,
  removeAll,
  clearAllChanges,
  handleClose,
  checked,
  setManageSupportList,
  parentSupportDataList,
  getSupportStatusData,
  cancelManageRoute,
  submitNickNameSupportCamps,
  selectedtNickname,
  setSelectedtNickname,
  submitButtonDisable,
  setUpdatePostion,
  unableToFindCamp,
}) => {
  const { currentDelegatedSupportedClick } = useSelector(
    (state: RootState) => ({
      currentDelegatedSupportedClick:
        state.supportTreeCard.currentDelegatedSupportedClick,
    })
  );
  const router = useRouter();
  const manageSupportArr = [];
  const supportOrderLen = manageSupportArr.length + 1;

  const manageListOrder = manageSupportList.length;

  const reqBodyData = {
    topic_num: +router?.query?.manageSupport[0]?.split("-")[0],
    camp_num: +router?.query?.manageSupport[1]?.split("-")[0],
  };
  const addRemoveApi = async () => {
    // const removeSupport = async (supportedId) => {
    const RemoveSupportId = {
      topic_num: reqBodyData.topic_num,
      add_camp: {},
      remove_camps: [reqBodyData.camp_num],
      type: "deligate",
      action: "remove",
      nick_name_id: nickNameList[0].id,
      order_update: [],
    };
    let res = await addSupport(RemoveSupportId);
    if (res && res.status_code == 200) {
      const addSupportId = {
        topic_num: reqBodyData.topic_num,
        add_camp: {
          camp_num: reqBodyData.camp_num,
          support_order: supportOrderLen,
        },
        remove_camps: [],
        type: "direct",
        action: "add",
        nick_name_id: nickNameList[0].id,
        order_update: [
          { camp_num: reqBodyData.camp_num, order: supportOrderLen },
        ],
      };
      let addedRes = await addSupport(addSupportId);
      if (addedRes && addedRes.status_code == 200) {
        let manageSupportPath = router.asPath.replace("/support/", "/topic/");
        if (manageSupportPath.lastIndexOf("_") > -1)
          manageSupportPath = manageSupportPath.substring(
            0,
            manageSupportPath.lastIndexOf("_")
          );
        router.push({
          pathname: manageSupportPath,
        });
      }
    }
    // };
  };

  const CheckDelegatedOrDirect =
    currentDelegatedSupportedClick.delegatedSupportClick;
  useEffect(() => {
    if (nickNameList.length > 0) {
      setSelectedtNickname(nickNameList[0]?.id);
    }
  }, [nickNameList]);
  let tagsArrayList = [];
  {
    manageSupportList && manageSupportList.length > 0
      ? ((tagsArrayList = manageSupportList),
        tagsArrayList.forEach((obj) => {
          obj.id = obj.camp_num;
        }))
      : "";
  }
  return (
    <>
      <Card
        className={styles.card_width}
        title={
          <div className={styles.main_card_title}>
            {messages.labels.SupportedCamps}
          </div>
        }
      >
        {unableToFindCamp ? (
          <>
            <span className={styles.warning}>
              <strong> Warning! </strong>
              {getSupportStatusData}
            </span>
          </>
        ) : (
          <>
            {getSupportStatusData !== "" ? (
              <>
                <span className={styles.warning}>
                  <strong> Warning! </strong>
                  {getSupportStatusData}
                </span>
                <Col md={12}>
                  {parentSupportDataList?.map((tag) => {
                    return (
                      <Tag key={tag.camp_num} className={styles.tag_btn}>
                        <div>
                          {""}
                          <span className={styles.count}>{""}</span>
                        </div>
                        <Link href="">
                          <a>
                            {tag.support_order} . {tag.camp_name}
                          </a>
                        </Link>
                      </Tag>
                    );
                  })}
                </Col>
              </>
            ) : (
              ""
            )}
            <div className={styles.hrtag}></div>
            <div className={styles.notes}>
              {" "}
              Note : To change support order of camp, drag & drop the camp box
              on your choice position.
            </div>

            {CheckDelegatedOrDirect ? (
              ""
            ) : (
              <div className="mb-4">
                <span className={styles.quickAction}>
                  Quick Action:
                  <span className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onClick={(e) =>
                        removeAll((e.target as any).checked, manageSupportList)
                      }
                    ></input>
                  </span>
                  <span className={styles.removeAll}>Remove all</span>
                  <Button
                    htmlType="button"
                    className={styles.clear_Btn}
                    onClick={(e) => clearAllChanges(manageSupportList)}
                  >
                    Clear all changes
                  </Button>
                </span>
              </div>
            )}
            <DraggableArea
              tags={tagsArrayList}
              render={({ tag, index }) => (
                <div className="">
                  <Button
                    key={tag.camp_num}
                    className={styles.tag_btn}
                    disabled={tag.dis}
                  >
                    <div className={styles.btndiv}>
                      {" "}
                      <span className={styles.count}>
                        {getSupportStatusData !== ""
                          ? index + 1
                          : tag.support_order}
                        .{" "}
                      </span>
                      <Link href="">
                        <a className={styles.Bluecolor}> {tag.camp_name}</a>
                      </Link>
                    </div>
                    {CheckDelegatedOrDirect ? (
                      ""
                    ) : (
                      <CloseCircleOutlined
                        onClick={() =>
                          handleClose(tag, tag.topic_num, tagsArrayList)
                        }
                      />
                    )}
                  </Button>
                </div>
              )}
              onChange={(tags) => {
                setUpdatePostion(true);
                setManageSupportList(tags);
              }}
            />
          </>
        )}
        <div>
          <Card className={styles.margin_top} type="inner">
            <div className={styles.card_heading}>
              <p>Nick Name To Support Above Camps</p>
            </div>
            <Select
              placeholder={placeholders.nickName}
              size="large"
              className={styles.dropdown}
              value={selectedtNickname}
              onChange={(value) => {
                setSelectedtNickname(value);
              }}
            >
              {nickNameList?.map((nick) => {
                return (
                  <Select.Option key={nick.id} value={nick.id}>
                    {nick.nick_name}
                  </Select.Option>
                );
              })}
            </Select>
            <div className={styles.Upload_Cancel_Btn}>
              <Button
                id="uploadBtn"
                htmlType="submit"
                className={styles.Upload_Btn}
                onClick={
                  CheckDelegatedOrDirect
                    ? submitNickNameSupportCamps
                    : addRemoveApi
                }
                disabled={submitButtonDisable}
              >
                Submit
              </Button>
              <Button
                id="cancelBtn"
                htmlType="button"
                className={styles.cancel_Btn}
                onClick={cancelManageRoute}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default ManageSupportUI;
