import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setFilterCanonizedTopics } from "../../../store/slices/filtersSlice";
//  "../../../store/slices/filtersSlice";
import {
  getCanonizedCampStatementApi,
  getNewsFeedApi,
  getTreesApi,
  getCanonizedCampSupportingTreeApi,
  getCurrentTopicRecordApi,
  getCurrentCampRecordApi,
} from "src/network/api/campDetailApi";
import { fallBackSrc } from "src/assets/data-images";
import { RootState } from "src/store";
import SideBar from "../Home/SideBar";
import CampStatementCard from "./CampStatementCard";
import CampInfoBar from "./CampInfoBar";
import K from "../../../constants";
import styles from "./topicDetails.module.scss";
import CampTreeCard from "./CampTreeCard";
import CurrentCampCard from "./CurrentCampCard";
import CurrentTopicCard from "./CurrentTopicCard";
import NewsFeedsCard from "./NewsFeedsCard";
import SupportTreeCard from "./SupportTreeCard";
import { BackTop, Image, Typography, message } from "antd";
import { Spin } from "antd";
import { setCurrentTopic } from "../../../store/slices/topicSlice";
import { getCanonizedAlgorithmsApi } from "src/network/api/homePageApi";
import moment from "moment";
import { GetCheckSupportExists } from "src/network/api/topicAPI";
import queryParams from "src/utils/queryParams";
import isAuth from "../../../hooks/isUserAuthenticated";
import {
  setCheckSupportExistsData,
  setCurrentCheckSupportStatus,
  setManageSupportStatusCheck,
} from "src/store/slices/campDetailSlice";

import { getHistoryApi } from "../../../network/api/history";

import CampRecentActivities from "../Home/CampRecentActivities";
const { Link } = Typography;
import { addSupport, getNickNameList } from "src/network/api/userApi";
import { replaceSpecialCharacters } from "src/utils/generalUtility";
import { SupportTreeTotalScore } from "src/network/api/campDetailApi";

const TopicDetails = () => {
  let myRefToCampStatement = useRef(null);
  const { isUserAuthenticated } = isAuth();
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [getTreeLoadingIndicator, setGetTreeLoadingIndicator] = useState(false);
  const [getCheckSupportStatus, setGetCheckSupportStatus] = useState({});
  const [totalSupportScore, setTotalSupportScore] = useState<number>(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    asof,
    asofdate,
    algorithm,
    newsFeed,
    topicRecord,
    campRecord,
    campStatement,
    tree,
    campExist,
  } = useSelector((state: RootState) => ({
    asofdate: state.filters?.filterObject?.asofdate,
    algorithm: state.filters?.filterObject?.algorithm,
    newsFeed: state?.topicDetails?.newsFeed,
    asof: state?.filters?.filterObject?.asof,
    topicRecord: state?.topicDetails?.currentTopicRecord,
    campRecord: state?.topicDetails?.currentCampRecord,
    campStatement: state?.topicDetails?.campStatement,
    tree: state?.topicDetails?.tree?.at(0),
    campExist: state?.topicDetails?.tree?.at(1),
  }));

  const reqBody = {
    topic_num: +router?.query?.camp[0]?.split("-")[0],
    camp_num: +(router?.query?.camp[1]?.split("-")[0] ?? 1),
    as_of: asof,
    as_of_date:
      asof == "default" || asof == "review"
        ? Date.now() / 1000
        : moment.utc(asofdate * 1000).format("DD-MM-YYYY H:mm:ss"),
  };

  useEffect(() => {
    async function getTreeApiCall() {
      setGetTreeLoadingIndicator(true);
      setLoadingIndicator(true);
      const reqBodyForService = {
        topic_num: +router?.query?.camp[0]?.split("-")[0],
        camp_num: +(router?.query?.camp[1]?.split("-")[0] ?? 1),
        asOf: asof,
        asofdate:
          asof == "default" || asof == "review" ? Date.now() / 1000 : asofdate,
        algorithm: algorithm,
        update_all: 1,
      };

      const reqBody = {
        topic_num: +router?.query?.camp?.at(0)?.split("-")?.at(0),
        camp_num: +(router?.query?.camp?.at(1)?.split("-")?.at(0) ?? 1),
        as_of: asof,
        as_of_date:
          asof == "default" || asof == "review"
            ? Date.now() / 1000
            : moment.utc(asofdate * 1000).format("DD-MM-YYYY H:mm:ss"),
      };
      const reqBodyForCampData = {
        topic_num: +router?.query?.camp[0]?.split("-")[0],
        camp_num: +(router?.query?.camp[1]?.split("-")[0] ?? 1),
        type: "all",
        per_page: 4,
        page: 1,
      };
      await Promise.all([
        getTreesApi(reqBodyForService),
        getNewsFeedApi(reqBody),
        getCurrentTopicRecordApi(reqBody),
        getCurrentCampRecordApi(reqBody),
        getCanonizedCampStatementApi(reqBody),
        getCanonizedCampSupportingTreeApi(reqBody, algorithm),
        getHistoryApi(reqBodyForCampData, "1", "statement"),
        getCanonizedAlgorithmsApi(),
      ]);
      setGetTreeLoadingIndicator(false);
      setLoadingIndicator(false);
    }
    getTreeApiCall();
  }, [asofdate, algorithm, +(router?.query?.camp[1]?.split("-")[0] ?? 1)]);

  const reqBodyData = {
    topic_num: +router?.query?.camp[0]?.split("-")[0],
    camp_num: +(router?.query?.camp[1]?.split("-")[0] ?? 1),
  };

  const removeSupport = async (supportedId) => {
    const RemoveSupportId = {
      topic_num: reqBodyData.topic_num,
      add_camp: {},
      remove_camps: [reqBodyData.camp_num],
      type: "direct",
      action: "remove",
      nick_name_id: supportedId,
      order_update: [],
    };
    let res = await addSupport(RemoveSupportId);
    if (res && res.status_code == 200) {
      message.success(res.message);
      GetCheckStatusData();
      getCanonizedCampSupportingTreeApi(reqBody, algorithm);
    }
  };

  const totalScoreData = {
    topic_num: +router?.query?.camp[0]?.split("-")[0],
    camp_num: +(router?.query?.camp[1]?.split("-")[0] ?? 1),
    asOf: asof,
    asofdate:
      asof == "default" || asof == "review" ? Date.now() / 1000 : asofdate,
    algorithm: algorithm,
  };
  const fetchTotalScore = async () => {
    const CampTotalScore = {
      topic_num: totalScoreData.topic_num,
      camp_num: totalScoreData.camp_num,
      asOf: totalScoreData.asOf,
      asofdate: totalScoreData.asofdate,
      algorithm: totalScoreData.algorithm,
    };
    let response = await SupportTreeTotalScore(CampTotalScore);
    if (response && response.status_code == 200) {
      setTotalSupportScore(response.data.score);
    }
  };

  const GetCheckStatusData = async () => {
    let response = await GetCheckSupportExists(queryParams(reqBodyData));
    if (response && response.status_code === 200) {
      setGetCheckSupportStatus(response.data);
      //dispatch remove
      dispatch(setCurrentCheckSupportStatus(""));
      dispatch(setCheckSupportExistsData(""));
      //dispatch add Values data
      dispatch(
        setCurrentCheckSupportStatus(
          response.data.warning ? response.data.warning : ""
        )
      );
      dispatch(setCheckSupportExistsData(response.data));
      // dispatch(setManageSupportStatusCheck(true));
    }
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      GetCheckStatusData();
      fetchTotalScore();
    }
  }, [isUserAuthenticated, router]);

  const scrollToCampStatement = () => {
    myRefToCampStatement.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadMoreSupporters = async () => {
    const reqBody = { topic_num: 45, camp_num: 1 };
    await getCanonizedCampSupportingTreeApi(reqBody, algorithm, true);
  };

  const setCurrentTopics = (data) => dispatch(setCurrentTopic(data));

  const onCreateCamp = () => {
    const queryParams = router.query;

    const data = {
      message: null,
      topic_num: topicRecord?.topic_num,
      topic_name: topicRecord?.topic_name,
      camp_name: topicRecord?.camp_name,
      parent_camp_num: topicRecord?.camp_num,
    };

    const topicName = topicRecord?.topic_name?.replaceAll(" ", "-");
    const campName = campRecord?.camp_name?.replaceAll(" ", "-");

    router.push({
      pathname: `/camp/create/${
        topicRecord?.topic_num
      }-${replaceSpecialCharacters(topicName, "-")}/${
        campRecord?.camp_num
      }-${replaceSpecialCharacters(campName, "-")}`,
    });

    setCurrentTopics(data);
  };

  const onCampForumClick = async () => {
    const topicName = await topicRecord?.topic_name?.replaceAll(" ", "-"),
      topicNum = topicRecord?.topic_num,
      campName = await campRecord?.camp_name?.replaceAll(" ", "-"),
      campNum = campRecord?.camp_num;

    if (topicName && topicNum && campName && campNum) {
      router.push({
        pathname: `/forum/${topicNum}-${replaceSpecialCharacters(
          topicName,
          "-"
        )}/${campNum}-${replaceSpecialCharacters(campName, "-")}/threads`,
      });
    }
  };

  const onCreateTreeDate = () => {
    dispatch(
      setFilterCanonizedTopics({
        asofdate: tree["1"]?.created_date,
        asof: "bydate",
      })
    );
  };
  const onCreateCampDate = () => {
    dispatch(
      setFilterCanonizedTopics({
        asofdate: campExist?.created_at,
        asof: "bydate",
      })
    );
  };
  return (
    <>
      <div className={styles.topicDetailContentWrap}>
        {tree && tree["1"]?.is_valid_as_of_time ? (
          <CampInfoBar
            isTopicPage={true}
            payload={{
              topic_num: +router?.query?.camp[0]?.split("-")[0],
              camp_num: +router?.query?.camp[1]?.split("-")[0],
            }}
            getCheckSupportStatus={getCheckSupportStatus}
          />
        ) : (
          <CampInfoBar
            payload={{
              topic_num: +router?.query?.camp[0]?.split("-")[0],
              camp_num: +router?.query?.camp[1]?.split("-")[0],
            }}
            isTopicHistoryPage={true}
            getCheckSupportStatus={getCheckSupportStatus}
          />
        )}

        <aside className={styles.miniSide + " leftSideBar miniSideBar"}>
          <SideBar onCreateCamp={onCreateCamp} />
        </aside>
        {tree && tree["1"]?.is_valid_as_of_time && (
          <>
            <div className={styles.pageContent + " pageContentWrap"}>
              <Spin spinning={getTreeLoadingIndicator} size="large">
                <CampTreeCard scrollToCampStatement={scrollToCampStatement} />
              </Spin>
              {campExist && !campExist?.camp_exist && (
                <Spin spinning={loadingIndicator} size="large">
                  <div>
                    <p>
                      The camp was created on
                      <Link
                        onClick={() => {
                          onCreateCampDate();
                        }}
                      >
                        {" "}
                        {new Date(
                          (campExist && campExist?.created_at) * 1000
                        ).toLocaleString()}
                      </Link>
                    </p>
                  </div>
                </Spin>
              )}
              {campExist
                ? campExist?.camp_exist
                : true && (
                    <>
                      <Spin spinning={loadingIndicator} size="large">
                        <CampStatementCard
                          myRefToCampStatement={myRefToCampStatement}
                          onCampForumClick={onCampForumClick}
                        />
                      </Spin>
                      {typeof window !== "undefined" &&
                        window.innerWidth < 767 && (
                          <>
                            {router.asPath.includes("topic") && (
                              <CampRecentActivities />
                            )}
                            <Spin spinning={loadingIndicator} size="large">
                              {!!newsFeed?.length && (
                                <NewsFeedsCard newsFeed={newsFeed} />
                              )}
                            </Spin>
                          </>
                        )}
                      <Spin spinning={loadingIndicator} size="large">
                        <CurrentTopicCard />
                      </Spin>
                      <Spin spinning={loadingIndicator} size="large">
                        <CurrentCampCard />
                      </Spin>

                      <Spin spinning={loadingIndicator} size="large">
                        <SupportTreeCard
                          handleLoadMoreSupporters={handleLoadMoreSupporters}
                          getCheckSupportStatus={getCheckSupportStatus}
                          removeSupport={removeSupport}
                          fetchTotalScore={fetchTotalScore}
                          totalSupportScore={totalSupportScore}
                        />
                      </Spin>
                    </>
                  )}
            </div>
          </>
        )}
        {tree && !tree["1"]?.is_valid_as_of_time && (
          // {tree && !tree["1"]?.is_valid_as_of_time &&
          <div className={styles.imageWrapper}>
            <div>
              <Image
                preview={false}
                alt="No topic created"
                src={"/images/empty-img-default.png"}
                fallback={fallBackSrc}
                width={200}
                id="forgot-modal-img"
              />
              <p>
                The topic was created on
                <Link
                  onClick={() => {
                    onCreateTreeDate();
                  }}
                >
                  {" "}
                  {new Date(
                    (tree && tree["1"]?.created_date) * 1000
                  ).toLocaleString()}
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <BackTop />
    </>
  );
};

export default TopicDetails;
