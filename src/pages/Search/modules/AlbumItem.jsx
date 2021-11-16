import React from 'react';
import "./albumItem.less";
import LazyLoad from "react-lazyload"

export default function AlbumItem(props) {
    const albums = props.albums;
    const items = albums.map(al => (
        <li key={al.id} className="album-item">
            <div className="album-img">
                <LazyLoad height={200}>
                    <img src={al.blurPicUrl} alt="" />
                </LazyLoad>
            </div>
            <div className="album-name">{al.name}</div>
            <div className="singer-name">{al.artist.name}</div>
        </li>
    ))
    return (
        <ul className="album-container">
            {items}
        </ul>
    )
}
