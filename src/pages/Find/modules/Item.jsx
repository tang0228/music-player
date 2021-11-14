import React from 'react';

import { IconSong, IconPlayCircle} from "@douyinfe/semi-icons";
import "./item.less";

export default function Item(props) {
    return (
        <li className="item-wrapper">
            <div className="item-content">
                <img src={props.coverImgUrl} alt="" />
                <div className="bottom">
                    <IconSong />
                    <span className="play-nums">{ parseInt(props.playCount / 10000)}万</span>
                    <IconPlayCircle />
                </div>
            </div>
            <p className="desc">{props.description}</p>
            <p className="user">
                <span className="text">by</span>
                <span className="name">{props.creator.nickname}</span>
                <img src="" alt="" />
            </p>
        </li>
    )
}
