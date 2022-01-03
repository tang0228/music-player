import React from "react";
import "./videoItem.less";
import utils from "../../../utils";
import { IconUserCardVideo } from "@douyinfe/semi-icons";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

export default function VideoItem(props) {
  const videos = props.videos;
  const items = videos.map((v) => (
    <li key={v.vid} className="video-item">
      <Link to={'/find/mv?id=' + v.vid}>
        <div className="video-img">
          <LazyLoad >
            <img src={v.coverUrl} alt="" />
          </LazyLoad>
          <div className="play-nums">
            <IconUserCardVideo />
            <span className="nums">
              {Number(v.playTime / 10000).toFixed(1)}万
            </span>
          </div>
          <span className="video-duration">
            {utils.formatTime(v.durationms)}
          </span>
        </div>
      </Link>
      <div className="video-name">{v.title}</div>
      <div className="singer-name">by {v.creator[0].userName}</div>
    </li>
  ));
  return <ul className="video-container">{items}</ul>;
}
