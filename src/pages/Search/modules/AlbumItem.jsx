import React from 'react';
import "./albumItem.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import {IconPlayCircle} from "@douyinfe/semi-icons";
import loadingUrl from "@/assets/loading.svg";

export default function AlbumItem(props) {
    const albums = props.albums;
    const items = albums.map(al => (
        <li key={al.id} className="album-item">
            <div className="album-img">
                <Link to={'/find/album?id=' + al.id}>
                    <LazyLoad height={130} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
                        <img src={al.blurPicUrl} alt="" />
                        <span className="mask"></span>
                    </LazyLoad>
                </Link>
                <IconPlayCircle size="large" style={{
                    color: "#eee"
                }} />
            </div>
            <Link to={'/find/album?id=' + al.id} className="album-name">{al.name}</Link>
            <Link to={'/find/artist?id=' + al.artist.id} className="singer-name">{al.artist.name}</Link>
        </li>
    ))
    return (
        <ul className="album-container">
            {items}
        </ul>
    )
}
