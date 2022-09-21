import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HtmlDiff from "htmldiff-js";

import CompareStatementUI from "./UI";

import { getCompareStatement } from "../../../network/api/history";

function CompareStatement() {
  const [isLoading, setIsLoading] = useState(false);
  const [statements, setStatements] = useState([]);
  const [liveStatement, setLiveStatement] = useState({});
  const [itemsStatus, setItemsStatus] = useState({});

  const router = useRouter();

  const getStatement = async (ids) => {
    setIsLoading(true);
    const reqBody = {
      ids,
      topic_num: +router.query.routes[0].split("-")[0],
      camp_num: +router.query.routes[1].split("-")[0],
      compare: router?.query?.from,
    };
    const res = await getCompareStatement(reqBody);

    const statements = res.data?.comparison,
      s1 = statements.length ? statements[0] : { parsed_value: "" },
      s2 = statements.length > 1 ? statements[1] : { parsed_value: "" },
      statementLive = res.data?.liveStatement;

    statementLive.revision_date = res.data?.latestRevision;

    s1.parsed_v = HtmlDiff.execute(s2?.parsed_value, s1?.parsed_value);
    s2.parsed_v = HtmlDiff.execute(s1?.parsed_value, s2?.parsed_value);

    setIsLoading(false);

    if (res && res.status_code === 200) {
      setStatements(statements);
      setLiveStatement(statementLive);
    }
  };

  useEffect(() => {
    const ids = (router?.query?.statements as String)?.split("_");
    const status = (router?.query?.status as String)?.split("-");

    if (ids?.length) getStatement(ids);
    if (status?.length) {
      const oldStatus = {};
      status.forEach((st) => {
        const ct = st?.split("_");
        oldStatus[ct[0]] = ct[1];
      });
      setItemsStatus(oldStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <CompareStatementUI
      statements={statements}
      isLoading={isLoading}
      liveStatement={liveStatement}
      itemsStatus={itemsStatus}
    />
  );
}

export default CompareStatement;
