import React, { useEffect, useState } from 'react';
import style from "./goodDj.module.less";
import { getRecommendByCat } from '../../../../../services/dj';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import loadingUrl from "@/assets/loading.svg";

export default function GoodDj(props) {
    const id = props.id;
    const [djs, setDjs] = useState([]); // dj
    useEffect(() => {
        getRecommendByCat({ type: id }).then(res => {
            if (res.code === 200) {
                setDjs(res.djRadios.splice(0, 5));
            }
        })
        return () => {
        }
    }, [id])
    return (
        <div className={style['good-dj']}>
            <div className="header">优秀新电台</div>
            <ul className="list-wrap">
                {djs && djs.length ? djs.map(d => <li key={d.id} className="list-item">
                    <LazyLoad height={150} debounce={500} placeholder={<img src={loadingUrl} />}>
                        <Link to={"/find/djradio/detail?id=" + d.id}>
                            <img src={d.picUrl} alt="" />
                        </Link>
                    </LazyLoad>
                    <Link to={"/find/djradio/detail?id=" + d.id} className="name">{d.name}</Link>
                    <div className="desc">{d.rcmdtext}</div>
                </li>) : null}
            </ul>
        </div>
    )
}
