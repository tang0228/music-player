import React from "react";
import "./playItem.less";
import { IconCustomerSupport, IconPlayCircle } from "@douyinfe/semi-icons";
import { useHistory } from "react-router-dom";

export default function PlayItem(props) {
    const item = props.item;
    const history = useHistory();
  return (
    <div className="play-item-wrap">
      <div className="img-wrap" title={item.name} onClick={() => {
          history.push("/find/playlist/detail?id=" + item.id)
      }}>
        <img src={item.coverImgUrl} alt="" />
        <div className="bottom">
          <IconCustomerSupport />
          <span className="play-nums">
            {item.playCount > 10000 ? parseInt(item.playCount / 10000) + '万' : item.playCount}
          </span>
          <IconPlayCircle />
        </div>
      </div>
      <div className="name" onClick={() => {
          history.push("/find/playlist/detail?id=" + item.id)
      }}>{item.name}</div>
    </div>
  );
}
