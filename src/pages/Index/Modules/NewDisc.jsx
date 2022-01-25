import React, { useEffect, useState } from 'react';
import ItemNav from './ItemNav';
import { getAlbumNewest } from '../../../services/apis';
import style from "./newDisc.module.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { IconPlayCircle, IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";

export default function NewDisc() {
    const [albums, setAlbums] = useState([]);
    const [status, setStatus] = useState("prev");
    useEffect(() => {
        getAlbumNewest().then(res => {
            if (res.code === 200) {
                setAlbums(res.albums);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['new-disc']}>
            <ItemNav navItem={{
                title: "新碟上架",
            }} moreLink="/find/allAlbum"></ItemNav>
            <div className="album-wrapper">
                <div className={status === "prev" ? 'album-content' : 'album-content prev'}>
                    {albums ? albums.map(al => <div className="album-item" key={al.id}>
                        <div className="album-img">
                            <Link to={'/find/album?id=' + al.id}>
                                <LazyLoad>
                                    <img src={al.blurPicUrl} alt="" />
                                </LazyLoad>
                            </Link>
                            <IconPlayCircle size="large" style={{
                                color: "#eee"
                            }} />
                        </div>
                        <Link to={'/find/album?id=' + al.id} className="album-name">{al.name}</Link>
                        <Link to={'/find/artist?id=' + al.artist.id} className="singer-name">{al.artist.name}</Link>
                    </div>) : null}
                </div>

                <IconChevronLeft onClick={() => {
                    setStatus("prev")
                }} />
                <IconChevronRight onClick={() => {
                    setStatus("next")
                }} />
            </div>
        </div>
    )
}
