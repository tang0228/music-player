import React, { useEffect, useState } from "react";
import style from "./playlistDetail.module.less";
import { useLocation } from "react-router-dom";
import { getPlayListDetail } from "../../../../services/apis";
import qs from "query-string";
import DetailLeft from "./DetailLeft.jsx";
import DetailRight from "./DetailRight";
import { Spin } from "@douyinfe/semi-ui";

export default function PlaylistDetail(props) {
  const location = useLocation();
  const id = qs.parse(location.search).id;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false); // loading

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getPlayListDetail({ id });
      if (res.code === 200) {
        setLoading(false);
        setDetail(res.playlist);
      }
    })();
    return () => {};
  }, [id]);
  return (
    <>
      {detail ? (
        <div className={style.detail_container}>
          <div className="left">
            <DetailLeft detail={detail} id={id} />
          </div>
          <div className="right">
            <DetailRight detail={detail} />
          </div>
        </div>
      ) : null}
      <Spin
        spinning={loading}
        tip="loading..."
        size="large"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "9999",
        }}
      ></Spin>
    </>
  );
}
