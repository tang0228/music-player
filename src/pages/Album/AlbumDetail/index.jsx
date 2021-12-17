import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./index.module.less";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import qs from "query-string";
import { getAlbum } from "../../../services/apis";

export default function AlbumDetail() {
  const location = useLocation();
  const id = qs.parse(location.search).id; // 专辑id
  const [songs, setSongs] = useState([]);
  const [albumDetail, setAlbumDetail] = useState(null);
  // 获取专辑相关内容
  useEffect(() => {
    (async () => {
      const res = await getAlbum({ id });
      if (res.code === 200) {
        setAlbumDetail(res.album);
        setSongs(res.songs);
      }
    })();
    return () => {};
  }, [id]);

  return (
    <>
      {albumDetail ? (
        <div className={style["album-detail"]}>
          <div className="left">
            <DetailLeft songs={songs} albumDetail={albumDetail} id={id} />
          </div>
          <div className="right">
            <DetailRight id={id} artistId={albumDetail.artist.id} />
          </div>
        </div>
      ) : null}
    </>
  );
}
