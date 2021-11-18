import React from 'react';
import "./videoItem.less";
import utils from "../../../utils";
import { IconUserCardVideo } from "@douyinfe/semi-icons";
import LazyLoad from 'react-lazyload';

export default function VideoItem(props) {
    const videos = props.videos;
    const items = videos.map(v => (
        <li key={v.vid} className="video-item">
            <div className="video-img">
                <LazyLoad height={200}>
                    <img src={v.coverUrl} alt="" />
                </LazyLoad>
                <div className="play-nums">
                    <IconUserCardVideo />
                    <span className="nums">{Number(v.playTime / 10000).toFixed(1)}万</span>
                </div>
                <span className="video-duration">{utils.formatTime(v.durationms)}</span>
            </div>
            <div className="video-name">{v.title}</div>
            <div className="singer-name">{v.creator[0].userName}</div>
        </li>
    ))
    return (
        <ul className="video-container">
            { items }
        </ul>
    )
}
