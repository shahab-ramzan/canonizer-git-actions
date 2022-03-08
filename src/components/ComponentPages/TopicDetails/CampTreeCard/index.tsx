import { Button, Card, Checkbox, Typography  } from "antd";
import styles from '../topicDetails.module.scss';
import CampTree from "../CampTree";

const { Link } = Typography;

const CampTreeCard = () => { 
    return (
        <Card className={'ctCard canCard ' + styles.ctCard} title={<div className="cardHeader"><h3 className={"mb-0 " + styles.campTreeHeading}>Canonizer Sorted Camp Tree</h3> </div> }
        extra={
        <div className="cardActions"> 
            <Checkbox className={"chexkboxLabel " + styles.chexkboxLabel }>Subscribe</Checkbox>
            <Link href="#" className={styles.addNew}>
            <i className={"icon-fi-document " + styles.iconMr}/> Add News
            </Link>
        </div>
        }>
          <CampTree />
        </Card>
    );
}
export default CampTreeCard;