import React, { useEffect, useState } from 'react';
import style from "./hotDj.module.less";
import { getDjPopularList } from '../../../../services/dj';
import { Link } from "react-router-dom";

export default function HotDj() {
    const [djs, setDjs] = useState([]);
    useEffect(() => {
        getDjPopularList({limit: 5}).then(res => {
            if(res.code === 200) {
                setDjs(res.data.list);
            }
            console.log(res);
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
                    <Link to={'/user/home?uid=' + d.id}><img src={d.avatarUrl} alt="" /></Link>
                    <Link className="name" to={'/user/home?uid=' + d.id}>{d.nickName}</Link>
                </div>) : null}
            </div>
        </div>
    )
}
