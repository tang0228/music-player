import React, { useEffect, useState } from "react";
import style from "./index.module.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getArtistDetail } from "../../../services/apis";
import DetailLeft from "./DetailLeft";
// import DetailRight from "./DetailRight";

export default function SongDetail() {
    const [artistDetail, setArtistDetail] = useState(null); // 歌曲详情
    const location = useLocation();
    const id = qs.parse(location.search).id; // 歌曲id
    // 获取歌曲详情
    // useEffect(() => {
    //     (async () => {
    //         const res = await getArtistDetail({
    //             id,
    //         });
    //         if(res.code === 200) {
    //             setArtistDetail(res.data.artist);
    //         }
    //     })();
    //     return () => {
    //     }
    // }, [id])
  return (
        <div className={style['artist-detail']}>
          <div className="left">
            <DetailLeft artistDetail={artistDetail} id={id} />
          </div>
          <div className="right">
            {/* <DetailRight detail={null} id={ids} /> */}
          </div>
        </div>
  );
}
