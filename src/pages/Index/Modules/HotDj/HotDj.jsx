import React, { useEffect, useState } from 'react';
import style from "./hotDj.module.less";
import { getDjPopularList } from '../../../../services/dj';
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import loadingUrl from "@/assets/loading.svg";

export default function HotDj() {
    const [djs, setDjs] = useState([]);
    useEffect(() => {
        getDjPopularList({ limit: 5 }).then(res => {
            if (res.code === 200) {
                setDjs(res.data.list);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['hot-dj']}>
            <div className="header">
                <h3 className="title">热门主播</h3>
            </div>
            <div className="wrap">
                {djs && djs.length ? djs.map(d => <div key={d.id} className="item">
                    <Link to={'/user/home?uid=' + d.id}>
                        <LazyLoad height={62} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
                            <img src={d.avatarUrl} alt="" />
                        </LazyLoad>
                    </Link>
                    <Link className="name" to={'/user/home?uid=' + d.id}>{d.nickName}</Link>
                </div>) : null}
            </div>
        </div>
    )
}
