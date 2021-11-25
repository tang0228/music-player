import React from "react";
import "./playItem.less";
import { IconCustomerSupport, IconPlayCircle } from "@douyinfe/semi-icons";

export default function PlayItem(props) {
    const item = props.item;
  return (
    <div className="play-item-wrap">
      <div className="img-wrap" title={item.name}>
        <img src={item.coverImgUrl} alt="" />
        <div className="bottom">
          <IconCustomerSupport />
          <span className="play-nums">
            {item.playCount > 10000 ? parseInt(item.playCount / 10000) + '万' : item.playCount}
          </span>
          <IconPlayCircle />
        </div>
      </div>
      <div className="name">{item.name}</div>
    </div>
  );
}
