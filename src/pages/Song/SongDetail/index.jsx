import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getSongDetail } from "../../../services/apis";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";

export default function SongDetail() {
    const [songDetail, setSongDetail] = useState(null); // 歌曲详情
    const location = useLocation();
    const ids = qs.parse(location.search).id; // 歌曲id
    // 获取歌曲详情
    useEffect(() => {
        (async () => {
            const res = await getSongDetail({
                ids,
            });
            console.log(res)
            if(res.code === 200) {
                setSongDetail(res.songs);
            }
        })();
        return () => {
        }
    }, [ids])
  return (
    <>
      {songDetail ? (
        <div className={style['song-detail']}>
          <div className="left">
            <DetailLeft detail={songDetail[0]} id={ids} />
          </div>
          <div className="right">
            <DetailRight detail={null} id={ids} />
          </div>
        </div>
      ) : null}
    </>
  );
}
