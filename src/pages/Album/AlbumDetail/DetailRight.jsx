import React, { useEffect, useState } from "react";
import style from "./detailRight.module.less";
import { getArtistAlbums, getAlbum } from "../../../services/apis";
import { Link } from "react-router-dom";
import utils from "../../../utils";

export default function DetailRight(props) {
  const { id, artistId } = props;
  const [hotAlbums, setHotAlbums] = useState([]);
  // 获取歌手的其他热门专辑
  useEffect(() => {
    (async () => {
      const res = await getArtistAlbums({ id: artistId });
      if (res.code === 200) {
        setHotAlbums(res.hotAlbums.splice(0, 5));
      }
    })();
    return () => {};
  }, [artistId]);
  return (
    <div className={style["detail-right"]}>
      <div className="play-hot">
        <div className="header">
          <h3 className="title">Ta的其他热门专辑</h3>
          <Link className="toPage" to={'/artist?id=' + artistId}>全部&gt;</Link>
        </div>
        <div className="hot-content">
          {hotAlbums && hotAlbums.length
            ? hotAlbums.map((l) => (
                <div key={l.id} className="hot-item">
                  <Link to={"/album?id=" + l.id}>
                    <img src={l.picUrl} alt="" />
                  </Link>
                  <div className="desc">
                    <Link
                      to={"/album?id=" + l.id}
                      className="sub-title"
                    >
                      {l.name}
                    </Link>
                    <span className="text">
                      {utils.formatDate(l.publishTime)}
                    </span>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
