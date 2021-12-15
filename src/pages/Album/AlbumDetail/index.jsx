import React from "react";
import { useLocation } from "react-router-dom";
import style from "./index.module.less";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import qs from "query-string";

export default function AlbumDetail() {
  const location = useLocation();
  const id = qs.parse(location.search).id; // 歌曲id
  return (
    <div className={style["artist-detail"]}>
      <div className="left">
        <DetailLeft id={id} />
      </div>
      <div className="right">
        <DetailRight id={id} />
      </div>
    </div>
  );
}
