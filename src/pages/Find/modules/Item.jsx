import React, { useCallback } from "react";
import LazyLoad from "react-lazyload";
import { IconCustomerSupport, IconPlayCircle } from "@douyinfe/semi-icons";
import "./item.less";
import { useHistory } from "react-router-dom";

export default function Item(props) {
  const history = useHistory();
  const toPlayListDetail = useCallback(async (id) => {
    history.push(`/find/playlist/detail`, id);
  }, []);
  return (
    <li className="item-wrapper">
      <div
        className="item-content"
        onClick={() => {
          toPlayListDetail(props.id);
        }}
      >
        <LazyLoad height={200}>
          <img src={props.coverImgUrl} alt="" />
        </LazyLoad>
        <div className="bottom">
          <IconCustomerSupport />
          <span className="play-nums">
            {parseInt(props.playCount / 10000)}万
          </span>
          <IconPlayCircle />
        </div>
      </div>
      <p className="desc">{props.description}</p>
      <p className="user">
        <span className="text">by</span>
        <span className="name">{props.creator.nickname}</span>
      </p>
    </li>
  );
}
