import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Drawer } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";

import { RootState } from "src/store";
import TimelineFilter from "../../../common/timelineFilter";
import CampRecentActivities from "../CampRecentActivities";
import NewsFeedsCard from "../../TopicDetails/NewsFeedsCard";
import GoogleAd from "../../../googleAds";
import useAuthentication from "src/hooks/isUserAuthenticated";

export default function SideBarTimeline({ onCreateCamp = () => {} }: any) {
  const { isUserAuthenticated } = useAuthentication();

  const [isAuth, setIsAuth] = useState(isUserAuthenticated);

  const router = useRouter();

  const { newsFeed } = useSelector((state: RootState) => ({
    newsFeed: state?.topicDetails?.newsFeed,
  }));

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => setIsAuth(isUserAuthenticated), [isUserAuthenticated]);

  return (
    <Fragment>
      {" "}
      {typeof window !== "undefined" && window.innerWidth > 767 ? (
        <TimelineFilter onCreateCamp={onCreateCamp} />
      ) : (
        <Fragment>
          <Button type="primary" onClick={showDrawer} className="btnFilter">
            <AppstoreAddOutlined />
          </Button>
          <Drawer
            title="Filters"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <TimelineFilter onCreateCamp={onCreateCamp} />
          </Drawer>
        </Fragment>
      )}
    </Fragment>
  );
}
