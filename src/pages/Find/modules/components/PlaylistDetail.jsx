import React, { useEffect, useState } from "react";
import style from "./playlistDetail.module.less";
import { useHistory, useLocation } from "react-router-dom";
import { getPlayListDetail } from "../../../../services/apis";
import qs from "query-string";
import DetailLeft from "./DetailLeft.jsx";
import DetailRight from "./DetailRight";

export default function PlaylistDetail(props) {
  const location = useLocation();
  const id = qs.parse(location.search).id;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getPlayListDetail({id});
      if (res.code === 200) {
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
    </>
  );
}
