import React, { useEffect, useState } from 'react';
import style from "../singerList.module.less";
import { getArtistList } from "../../../../../services/artist";
import { Link, useLocation } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { IconUserCircle } from "@douyinfe/semi-icons";
import qs from "query-string";
import LetterNav from "./LetterNav";
import { Spin } from "@douyinfe/semi-ui";

export default function SingerList() {
    const location = useLocation();
    const { area, type, name = "热门歌手", initial = '-1' } = qs.parse(location.search);
    const [singers, setSingers] = useState([]); // 热门歌手列表
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getArtistList({
            limit: 100, offset: 0, type, area, initial,
        }).then(res => {
            if (res.code === 200) {
                setSingers(res.artists);
                setLoading(false);
            }
        })
        return () => {
        };
    }, [area, type, initial]);

    return (
        <div className={style['singer-list']}>
            <div className="header">
                <div className="title">{name}</div>
            </div>
            <LetterNav initial={initial} />
            <ul className='list-wrap'>
                {singers.splice(0, 10).map(h => <li key={h.id} className='list-item'>
                    <Link to={"/find/artist?id=" + h.id}>
                        <LazyLoad><img className='avatar-img' src={h.picUrl} alt="" /></LazyLoad>
                    </Link>
                    <div className="info">
                        <Link to={"/find/artist?id=" + h.id}><span className="name">{h.name}</span></Link>
                        {h.accountId ? <Link to={"/user/home?uid=" + h.accountId}><IconUserCircle style={{
                            color: '#c20c0c'
                        }} /></Link> : null}
                    </div>
                </li>)}
            </ul>
            <ul className='singer-wrap'>
                {singers.slice(10).map(h => <li key={h.id} className='item'>
                    <Link to={"/find/artist?id=" + h.id}><span className="name">{h.name}</span></Link>
                    {h.accountId ? <Link to={"/user/home?uid=" + h.accountId}><IconUserCircle style={{
                        color: '#c20c0c'
                    }} /></Link> : null}
                </li>)}
            </ul>
            <Spin
                spinning={loading}
                tip="loading..."
                size="large"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                }}
            ></Spin>
        </div>
    )
}
