import React, { useEffect, useState } from 'react';
import style from "./singerList.module.less";
import { getHotSingers } from "../../../../services/artist";
import { Link } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import { IconUserCircle } from "@douyinfe/semi-icons";

export default function SingerList() {
    const [hotSingers, setHotSingers] = useState([]); // 热门歌手列表
    useEffect(() => {
        getHotSingers().then(res => {
            if (res.code === 200) {
                setHotSingers(res.artists);
            }
        })
        return () => {
        };
    }, []);

    return (
        <div className={style['singer-list']}>
            <div className="header">
                <div className="title">热门歌手</div>
            </div>
            <ul className='list-wrap'>
                {hotSingers.splice(0, 10).map(h => <li key={h.id} className='list-item'>
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
                {hotSingers.splice(10).map(h => <li className='item'>
                    <Link to={"/find/artist?id=" + h.id}><span className="name">{h.name}</span></Link>
                    {h.accountId ? <Link to={"/user/home?uid=" + h.accountId}><IconUserCircle style={{
                        color: '#c20c0c'
                    }} /></Link> : null}
                </li>)}
            </ul>
        </div>
    )
}
