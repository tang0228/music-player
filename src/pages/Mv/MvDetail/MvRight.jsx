import React, { useEffect, useState } from 'react';
import style from "./mvRight.module.less";
import utils from "../../../utils";
import { getPersonalizedMv } from '../../../services/mv';
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import {IconUserCardVideo} from "@douyinfe/semi-icons";

export default function MvRight(props) {
    const { mvDetail } = props;
    const [mvs, setMvs] = useState([]); // 推荐的MV
    useEffect(() => {
        (async () => {
            const res = await getPersonalizedMv();
            if(res.code === 200) {
                setMvs(res.result);
            }
        })();
        return () => {
        }
    }, [])
    return (
        <div className={style['mv-right']}>
            <div className="mv-row">
                <h3 className="title">MV简介</h3>
                <div className="desc-content">
                    <div className="text">发布时间：{utils.formatDate(mvDetail.publishTime)}</div>
                    <div className="text">播放次数：{mvDetail.playCount > 10000 ? parseInt(mvDetail.playCount / 10000) + '万次' : mvDetail.playCount + '次'}</div>
                    <div className="desc">{mvDetail.desc}</div>
                </div>
            </div>
            <div className="mv-row">
                <h3 className="title">相关推荐</h3>
                <ul className="mv-list">
                    {mvs ? mvs.map(m => <li className="item" key={m.id}>
                        <div className="img-wrap">
                            <Link to={'mv?id=' + m.id}>
                            <LazyLoad height={200}>
                                <img src={m.picUrl} alt="" />
                            </LazyLoad>
                            <div className="img-top">
                                <IconUserCardVideo />
                                <span className="count">{m.playCount > 10000 ? parseFloat(m.playCount / 10000) + '万' : m.playCount}</span>
                            </div>
                            </Link>
                        </div>
                        <div className="mv-info">
                            <Link to={'/mv?id=' + m.id} className="name">{m.name}</Link>
                            <span className="time">{utils.formatTime(m.duration)}</span>
                            <span className="by">by <Link className="artist" to={'/user/home?uid=' + m.artistId}>{m.artistName}</Link></span>
                        </div>
                    </li>) : null}
                </ul>
            </div>
        </div>
    )
}
