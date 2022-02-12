import React, { useEffect, useState } from 'react';
import style from "./left.module.less";
import { getTop } from '../../../../services/apis';
import {Link} from "react-router-dom";
import LazyLoad from 'react-lazyload';

export default function TopLeftNav(props) {
    const [firstNav, setFirstNav] = useState([]);
    const [secondNav, setSecondNav] = useState([]);
    const id = props.id
    useEffect(() => {
        getTop().then(res => {
            if (res.code === 200) {
                setFirstNav(res.list.splice(0, 4));
                setSecondNav(res.list.splice(4));
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['top-left-nav']}>
            <dl className="list">
                <dt className="title">云音乐特色榜</dt>
                {firstNav.length ? firstNav.map(n => <Link to={`/find/toplist?id=${n.id}&text=${n.updateFrequency}`} key={n.id} ><dd className={n.id == id ? 'row active' : 'row'}>
                    <LazyLoad>
                        <img src={n.coverImgUrl} alt="" />
                    </LazyLoad>
                    <div className="content">
                        <div className="name">{n.name}</div>
                        <p className="desc">{n.updateFrequency}</p>
                    </div>
                </dd></Link>) : null}
            </dl>
            <dl className="list mt20">
                <dt className="title">云音乐特色榜</dt>
                {secondNav.length ? secondNav.map(n => <Link to={`/find/toplist?id=${n.id}&text=${n.updateFrequency}`} key={n.id} ><dd className={n.id == id ? 'row active' : 'row'}>
                    <img src={n.coverImgUrl} alt="" />
                    <div className="content">
                        <div className="name">{n.name}</div>
                        <p className="desc">{n.updateFrequency}</p>
                    </div>
                </dd></Link>) : null}
            </dl>
        </div>
    )
}
