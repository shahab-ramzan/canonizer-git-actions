import React, { useState } from "react";
import messages from "../../../../messages";
import styles from "../UserProfileUI/UserProfile.module.scss";
import Link from "next/link";
import { Card, Tag, Select } from "antd";
import { topicNameRule } from "src/messages/validationRules";
export const UserProfileCard = ({
  userSupportedCampsList,
  setUserSupportedCampsList,
  nameSpaceList,
}) => {
  const [dropdownNameSpaceList, setDropdownNameSpaceList] = useState([]);
  return (
    <div className="user--cards-outer">
      <div className={styles.card_spacing}>
        {userSupportedCampsList?.map((supportedCampList, i) => {
          return (
            <Card
              key={i}
              type="inner"
              title={
                <div className={styles.main_card_title}>
                  {messages.labels.nickname} :{" "}
                  <span className={styles.Bluecolor}>
                    {" "}
                    {supportedCampList.nick_name}
                  </span>
                </div>
              }
            >
              <div className="Headings--wrap">
                <div className="Headings--inn">
                  <span className={styles.main_card_Heading}>
                    {messages.labels.listOfSupportedCamps}
                  </span>
                  <Select
                    size="large"
                    className={styles.dropdown}
                    defaultValue={nameSpaceList[0]}
                    onChange={(selectedNameSpaceList) =>
                      setDropdownNameSpaceList(selectedNameSpaceList)
                    }
                  >
                    {nameSpaceList?.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div>
                {supportedCampList.topic?.filter((obj) => {
                  if (dropdownNameSpaceList == obj.namespace_id) {
                    return obj;
                  }
                }).length > 0
                  ? supportedCampList.topic
                      .filter((obj) => {
                        if (dropdownNameSpaceList == obj.namespace_id) {
                          return obj;
                        }
                      })
                      .map((data, i) => {
                        return (
                          <span key={i}>
                            <div className="inner--cards">
                              <div className={styles.cardBox_tags}>
                                <Card
                                  title={
                                    <div className={styles.card_heading_title}>
                                      {data.title}
                                    </div>
                                  }
                                >
                                  {data.camps?.map((campData, id) => {
                                    return (
                                      <Tag className={styles.tag_btn} key={id}>
                                        <div>
                                          {""}
                                          <span className={styles.count}>
                                            {""}
                                          </span>
                                          <Link href={campData.camp_link}>
                                            <a className={styles.Bluecolor}>
                                              {campData.camp_name}
                                            </a>
                                          </Link>
                                        </div>
                                      </Tag>
                                    );
                                  })}
                                </Card>
                              </div>
                            </div>
                          </span>
                        );
                      })
                  : "No Data Available !"}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
