import React, { useEffect, useState } from 'react';
import style from "./djRecommend.module.less";
import { getProgramRecommend } from '../../../../../services/dj';
import Header from '../components/Header';
import LazyLoad from "react-lazyload";
import { IconPlayCircle } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import utils from "../../../../../utils";

export default function DjRecommend() {
    const [djRadios, setDjRadios] = useState([]);
    useEffect(() => {
        getProgramRecommend().then(res => {
            if(res.code === 200) {
                setDjRadios(res.programs);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-recommend']}>
            <Header title="推荐节目" url="/find/djradio/recommend" />
            <ul className="dj-list">
                {djRadios && djRadios.length ? djRadios.map((d, i) => <li key={d.id} className={utils.isEven(i + 1) ? 'dj-item even' : 'dj-item'}>
                    <div className="img-wrap">
                        <LazyLoad>
                            <img title="播放" src={d.coverUrl} alt="" />
                        </LazyLoad>
                        <IconPlayCircle />
                    </div>
                    <div className="detail">
                        <Link to={"/find/djradio/program?id=" + d.id} className="desc" title={d.name} >{d.name}</Link>
                        <Link to={"/find/djradio/detail?id=" + d.radio.id} className="name" title={d.radio.name}>{d.radio.name}</Link>
                    </div>
                    <Link to={"/find/djradio/category?id=" + d.categoryId} className="cat">{d.radio.category}</Link>
                </li>) : null}
            </ul>
        </div>
    )
}
