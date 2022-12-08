import useAuthentication from "../../hooks/isUserAuthenticated";
import LoggedInHeader from "../../components/common/headers/loggedInHeader";
import LoggedOutHeader from "../../components/common/headers/loggedOutHeader";
import Spinner from "../../components/common/spinner/spinner";
import styles from "./layout.module.scss";
import Footer from "../../components/common/footer";
import GoogleAd from "../../components/googleAds";

function Layout(props) {
  const { isUserAuthenticated } = useAuthentication();

  return (
    <>
      <div className={styles.pageWrap}>
        {isUserAuthenticated ? <LoggedInHeader /> : <LoggedOutHeader />}
        <Spinner>{""}</Spinner>
        <div className={styles.contentWrap}>
          <div className={styles.contentArea}>{props.children} </div>
          <aside className={styles.rightSidebar}>
            <GoogleAd
              ad_client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT}
              ad_slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_RIGHT_SLOT}
            />
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
