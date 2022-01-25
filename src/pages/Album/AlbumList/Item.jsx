import React from 'react';
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { IconPlayCircle } from "@douyinfe/semi-icons";
import style from "./item.module.less";

export default function Item(props) {
    return (
        <div className={style["album-item"]} key={props.id}>
            <div className="album-img">
                <Link to={'/find/album?id=' + props.id}>
                    <LazyLoad>
                        <img src={props.blurPicUrl} alt="" />
                    </LazyLoad>
                </Link>
                <IconPlayCircle size="large" style={{
                    color: "#eee"
                }} />
            </div>
            <Link to={'/find/album?id=' + props.id} className="album-name">{props.name}</Link>
            <Link to={'/find/artist?id=' + props.artist.id} className="singer-name">{props.artist.name}</Link>
        </div>
    )
}
