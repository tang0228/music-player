import React from "react";
import LazyLoad from "react-lazyload";
import { IconCustomerSupport, IconPlayCircle } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";

export default function Item(props) {
  return (
    <li className="item-wrapper">
      <div className="item-content">
        <Link to={`/find/playlist/detail?id=${props.id}`}>
          <LazyLoad height={200}>
            <img src={props.picUrl} alt="" />
          </LazyLoad>
          <div className="bottom">
            <IconCustomerSupport />
            <span className="play-nums">
              {parseInt(props.playCount ? props.playCount / 10000 : props.playcount / 10000)}万
            </span>
            <IconPlayCircle />
          </div>
        </Link>
      </div>
      <p className="desc">
        <Link to={`/find/playlist/detail?id=${props.id}`}>{props.name}</Link>
      </p>
      {props.type === 1 ? <p className="copy-text">{props.copywriter}</p> : null}
    </li>
  );
}
