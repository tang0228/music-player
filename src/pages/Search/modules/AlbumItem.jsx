import React from 'react';
import "./albumItem.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

export default function AlbumItem(props) {
    const albums = props.albums;
    const items = albums.map(al => (
        <li key={al.id} className="album-item">
            <div className="album-img">
                <Link to={'/album?id=' + al.id}>
                    <LazyLoad height={200}>
                        <img src={al.blurPicUrl} alt="" />
                    </LazyLoad>
                </Link>
            </div>
            <Link to={'/album?id=' + al.id} className="album-name">{al.name}</Link>
            <Link to={'/artist?id=' + al.artist.id} className="singer-name">{al.artist.name}</Link>
        </li>
    ))
    return (
        <ul className="album-container">
            {items}
        </ul>
    )
}
