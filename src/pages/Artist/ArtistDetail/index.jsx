import React from "react";
import style from "./index.module.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";

export default function SongDetail() {
    const location = useLocation();
    const id = qs.parse(location.search).id; // 歌曲id
  return (
        <div className={style['artist-detail']}>
          <div className="left">
            <DetailLeft id={id} />
          </div>
          <div className="right">
            <DetailRight id={id} />
          </div>
        </div>
  );
}
