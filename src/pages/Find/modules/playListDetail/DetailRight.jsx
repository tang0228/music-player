import React, { useEffect, useState } from "react";
import style from "./detailRight.module.less";
import { Avatar } from "@douyinfe/semi-ui";
import { getPlaylist } from "../../../../services/apis";
import { Link } from "react-router-dom";

export default function DetailRight(props) {
  const detail = props.detail;
  const tagName = detail.tags[0];
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getPlaylist({
        cat: tagName,
      });
      if(res.code === 200) {
          setList(res.playlists.splice(0, 5));
      }
    })();
    return () => {};
  }, []);
  return (
    <div className={style["detail-right"]}>
        {detail.subscribers.length ? <div className="play-like">
        <h3 className="title">喜欢这个歌单的人</h3>
        <div className="like-wrap">
          {detail.subscribers.map((s) => (
              <Link key={s.userId} to={'/user/home?uid=' + s.userId }><Avatar src={s.avatarUrl} shape="square" /></Link>
          ))}
        </div>
      </div> : null}
      <div className="play-hot">
          <h3 className="title">热门歌单</h3>
          <div className="hot-content">
              {list ? list.map(l => <div key={l.id} className="hot-item">
                  <img src={l.coverImgUrl} alt="" />
                  <div className="desc">
                      <Link to={'/find/playlist/detail?id=' + l.id} className="sub-title">{l.name}</Link>
                      <span className="text">by <Link to={'/user/home?uid=' + l.creator.userId} className="name">{l.creator.nickname}</Link></span>
                  </div>
              </div>) : null}
              
          </div>
      </div>
    </div>
  );
}
