import { Spin, Tooltip, Typography } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { subscribeToCampApi } from "../../../../network/api/campDetailApi";
import { RootState } from "src/store";
import styles from "../topicDetails.module.scss";
import { Dropdown, Menu, Button } from "antd";
import K from "../../../../constants";

import { setManageSupportStatusCheck } from "../../../../store/slices/campDetailSlice";

import useAuthentication from "../../../../../src/hooks/isUserAuthenticated";
import { getCampBreadCrumbApi } from "../../../../network/api/campDetailApi";
import {
  MoreOutlined,
  FileTextOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { replaceSpecialCharacters } from "../../../../utils/generalUtility";

const CampInfoBar = ({
  payload = null,
  isTopicPage = false,
  isTopicHistoryPage = false,
  getCheckSupportStatus = null,
}) => {
  const isLogin = useAuthentication();

  const dispatch = useDispatch();
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [payloadData, setPayloadData] = useState(payload);
  const [breadCrumbRes, setBreadCrumbRes] = useState([]);
  const didMount = useRef(false);
  const didMount1 = useRef(false);
  const router = useRouter();
  const {
    topicRecord,
    campRecord,
    campStatement,
    is_admin,
    asofdate,
    asof,
    algorithm,
  } = useSelector((state: RootState) => ({
    topicRecord: state?.topicDetails?.currentTopicRecord,
    campRecord: state?.topicDetails?.currentCampRecord,
    campStatement: state?.topicDetails?.campStatement,

    is_admin: state?.auth?.loggedInUser?.is_admin,
    asofdate: state.filters?.filterObject?.asofdate,
    algorithm: state.filters?.filterObject?.algorithm,
    asof: state?.filters?.filterObject?.asof,
  }));
  const [campSubscriptionID, setCampSubscriptionID] = useState(
    campRecord?.subscriptionId
  );
  const [topicSubscriptionID, setTopicSubscriptionID] = useState(
    topicRecord?.topicSubscriptionId
  );
  useEffect(() => {
    setPayloadData(payload);
    async function getBreadCrumbApiCall() {
      setLoadingIndicator(true);
      let reqBody = {
        topic_num: payload?.topic_num,
        camp_num: payload?.camp_num,
      };
      let res = await getCampBreadCrumbApi(reqBody);
      setBreadCrumbRes(res?.data?.bread_crumb);

      setLoadingIndicator(false);
    }
    if (
      !isTopicPage &&
      payload &&
      Object.keys(payload).length > 0 &&
      !isTopicHistoryPage
    ) {
      getBreadCrumbApiCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  useEffect(() => {
    if (isTopicPage) {
      if (didMount.current) {
        setCampSubscriptionID(campRecord?.subscriptionId);
        setTopicSubscriptionID(topicRecord?.topicSubscriptionId);
      } else didMount.current = true;
    }
  }, [campRecord?.subscriptionId, topicRecord?.topicSubscriptionId]);

  useEffect(() => {
    if (isTopicPage) {
      dispatch(setManageSupportStatusCheck(false));
    }
  }, []);

  const handleClickSupportCheck = () => {
    dispatch(setManageSupportStatusCheck(true));
  };

  const onCampForumClick = () => {
    const topicName = topicRecord?.topic_name?.replaceAll(" ", "-");
    const campName = campRecord?.camp_name?.replaceAll(" ", "-");
    router.push({
      pathname: `/forum/${topicRecord?.topic_num}-${replaceSpecialCharacters(
        topicName,
        "-"
      )}/${campRecord?.camp_num}-${replaceSpecialCharacters(
        campName,
        "-"
      )}/threads`,
    });
  };

  const campOrTopicScribe = (isTopic: Boolean) => {
    const reqBody = {
      topic_num: campRecord.topic_num,
      camp_num: isTopic ? 0 : campRecord.camp_num,
      checked: isTopic ? !topicSubscriptionID : !campSubscriptionID,
      subscription_id: isTopic ? topicSubscriptionID : campSubscriptionID,
    };
    subscribeToCampApi(reqBody, isTopic);
  };

  const campForumDropdownMenu = (
    <Menu className={styles.campForumDropdownMenu}>
      {isLogin && is_admin && (
        <Menu.Item key="0" icon={<i className="icon-newspaper"></i>}>
          <Link href={router.asPath.replace("topic", "addnews")}>
            <a rel="noopener noreferrer" href="/add-news">
              Add News
            </a>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item
        icon={
          <i
            className={`icon-subscribe ${
              !!topicSubscriptionID && "text-primary"
            }`}
          ></i>
        }
        onClick={() => {
          if (isLogin) {
            campOrTopicScribe(true);
          } else {
            setLoadingIndicator(true);

            router.push("/login");
          }
        }}
      >
        {!!topicSubscriptionID
          ? " Unsubscribe to Entire Topic"
          : " Subscribe to Entire Topic"}
      </Menu.Item>
      <Menu.Item
        icon={
          <i
            className={`icon-subscribe ${
              !!campSubscriptionID && "text-primary"
            }`}
          ></i>
        }
        disabled={!!campSubscriptionID && campRecord?.flag == 2 ? true : false}
        onClick={() => {
          if (isLogin) {
            campOrTopicScribe(false);
          } else {
            setLoadingIndicator(true);
            router.push("/login");
          }
        }}
      >
        {!!campSubscriptionID && campRecord?.flag !== 2 ? (
          "Unsubscribe to the Camp"
        ) : !!campSubscriptionID && campRecord?.flag == 2 ? (
          <Tooltip
            title={`You are subscribed to ${campRecord?.subscriptionCampName}`}
          >
            Subscribe to the Camp
          </Tooltip>
        ) : (
          "Subscribe to the Camp"
        )}
      </Menu.Item>
      <Menu.Item icon={<HeartOutlined />}>
        {isTopicPage && (
          <Link href={router.asPath.replace("/topic/", "/support/")}>
            <a>
              <div
                className="topicDetailsCollapseFooter"
                onClick={handleClickSupportCheck}
              >
                {/* {K?.exceptionalMessages?.directJoinSupport} */}
                {getCheckSupportStatus?.support_flag == 1
                  ? K?.exceptionalMessages?.manageSupport
                  : K?.exceptionalMessages?.directJoinSupport}
              </div>
            </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item icon={<i className="icon-camp"></i>}>
        {isTopicPage && (
          <Link
            href={`/camp/history/${replaceSpecialCharacters(
              router?.query?.camp
                ? router?.query?.camp[0]
                : router?.query?.manageSupport?.at(0),
              "-"
            )}/${replaceSpecialCharacters(
              router?.query?.camp
                ? router?.query?.camp[1]
                : router?.query?.manageSupport?.at(1),
              "-"
            )}`}
          >
            <a>{K?.exceptionalMessages?.manageCampButton}</a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item icon={<i className="icon-topic"></i>}>
        {isTopicPage && (
          <Link
            href={`/topic/history/${replaceSpecialCharacters(
              router?.query?.camp
                ? router?.query?.camp[0]
                : router?.query?.manageSupport?.at(0),
              "-"
            )}`}
          >
            <a>{K?.exceptionalMessages?.manageTopicButton} </a>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item icon={<FileTextOutlined />}>
        {isTopicPage && (
          <Link
            href={
              campStatement?.length > 0
                ? `/statement/history/${replaceSpecialCharacters(
                    router?.query?.camp
                      ? router?.query?.camp[0]
                      : router?.query?.manageSupport[0],
                    "-"
                  )}/${replaceSpecialCharacters(
                    router?.query?.camp
                      ? router?.query?.camp[1]
                      : router?.query?.manageSupport[1],
                    "-"
                  )}`
                : `/create/statement/${replaceSpecialCharacters(
                    router?.query?.camp
                      ? router?.query?.camp[0]
                      : router?.query?.manageSupport?.at(0),
                    "-"
                  )}/${replaceSpecialCharacters(
                    router?.query?.camp
                      ? router?.query?.camp[1]
                      : router?.query?.manageSupport?.at(1),
                    "-"
                  )}`
            }
          >
            <a>
              {campStatement?.length > 0
                ? K?.exceptionalMessages?.manageCampStatementButton
                : K?.exceptionalMessages?.addCampStatementButton}
            </a>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles.topicDetailContentHead}>
        <Spin spinning={loadingIndicator} size="small">
          <div className={styles.topicDetailContentHead_Left}>
            <Typography.Paragraph className={"mb-0 " + styles.topicTitleStyle}>
              {" "}
              <span className="bold"> Topic: </span>
              {isTopicPage ? (
                topicRecord && topicRecord?.topic_name
              ) : isTopicHistoryPage ? (
                <Link
                  href={`/topic/${
                    payload?.topic_num
                  }-${replaceSpecialCharacters(
                    payload?.topic_name,
                    "-"
                  )}/1-Agreement`}
                >
                  <a>{payloadData?.topic_name}</a>
                </Link>
              ) : (
                payloadData?.topic_name
              )}
              {"  "}
              {!!topicSubscriptionID && (
                <small>
                  <i className="icon-subscribe text-primary"></i>
                </small>
              )}
            </Typography.Paragraph>
            <div className={styles.breadcrumbLinks}>
              {" "}
              <span className="bold mr-1">
                {!isTopicHistoryPage ? "Camp :" : ""}{" "}
              </span>
              {isTopicPage
                ? campRecord
                  ? campRecord?.parentCamps?.map((camp, index) => {
                      return (
                        <Link
                          href={{
                            pathname:
                              router.asPath.split("/")[1] == "support"
                                ? router.asPath.replace("/support/", "/topic/")
                                : `${(router.query?.camp
                                    ? router.query?.camp
                                    : router.query?.manageSupport
                                  )?.at(0)}/${
                                    camp?.camp_num
                                  }-${replaceSpecialCharacters(
                                    camp?.camp_name,
                                    "-"
                                  )}`,
                          }}
                          key={camp?.camp_num}
                        >
                          <a>
                            {index !== 0 && "/ "}
                            {`${camp?.camp_name}`}
                          </a>
                        </Link>
                      );
                    })
                  : null
                : breadCrumbRes
                ? breadCrumbRes?.map((camp, index) => {
                    return (
                      <Link
                        href={{
                          pathname: `/topic/${
                            payloadData?.topic_num
                          }-${replaceSpecialCharacters(
                            payloadData?.topic_name,
                            "-"
                          )}/${camp?.camp_num}-${replaceSpecialCharacters(
                            camp?.camp_name,
                            "-"
                          )}`,
                        }}
                        key={index}
                      >
                        <a>
                          {index !== 0 && "/ "}
                          {`${camp?.camp_name}`}
                        </a>
                      </Link>
                    );
                  })
                : null}
              {!!campSubscriptionID && !isTopicHistoryPage && (
                <small style={{ alignSelf: "center", marginLeft: "10px" }}>
                  <i className="icon-subscribe text-primary"></i>
                </small>
              )}
            </div>
          </div>

          <div className={styles.topicDetailContentHead_Right}>
            {isTopicPage && (
              <>
                <Button
                  type="primary"
                  className={styles.btnCampForum}
                  onClick={onCampForumClick}
                >
                  Camp Forum
                </Button>
                <Dropdown
                  className={styles.campForumDropdown}
                  placement="bottomRight"
                  overlay={campForumDropdownMenu}
                  trigger={["click"]}
                >
                  <a
                    className={styles.iconMore}
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreOutlined />
                  </a>
                </Dropdown>
              </>
            )}
          </div>
        </Spin>
      </div>
    </>
  );
};

export default CampInfoBar;
