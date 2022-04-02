import React, { useEffect, useState } from 'react';
import { getDjRecommend } from "../../../../../services/dj";
import style from "./djRecommend.module.less";
import utils from "../../../../../utils";
import { IconPlayCircle } from "@douyinfe/semi-icons";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { Toast } from "@douyinfe/semi-ui";

export default function DJRecommend() {
    const [list, setList] = useState([]);
    useEffect(() => {
        getDjRecommend().then(res => {
            if (res.code === 200) {
                setList(res.data.list);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-recommend']}>
            <div className="header">
                <div className="title">推荐节目</div>
                <div className="tips">（每日更新）</div>
            </div>
            <ul className="dj-list">
                {list && list.length ? list.map((d, i) => <li key={d.program.id} className={utils.isEven(i + 1) ? 'dj-item even' : 'dj-item'}>
                    <div className="img-wrap">
                        <LazyLoad>
                            <img title="播放" src={d.program.coverUrl} alt="" />
                        </LazyLoad>
                        <IconPlayCircle onClick={() => {
                            Toast.warning({
                                content: "暂不支持播放电台",
                            })
                        }} />
                    </div>
                    {/* listenerCount  likedCount*/}
                    <Link to={"/find/djradio/program?id=" + d.program.id} className="desc" title={d.program.name} >{d.program.name}</Link>
                    <Link to={"/find/djradio/detail?id=" + d.program.radio.id} className="name" title={d.program.dj.brand}>{d.program.dj.brand}</Link>
                    <span className='listen-count count'>播放{d.program.listenerCount}</span>
                    <span className='like-count count'>赞{d.program.likedCount}</span>
                    <div className="cat-wrap">
                        <Link to={"/find/djradio/category?id=" + d.program.categoryId} className="cat" title={d.program.radio.category}>{d.program.radio.category}</Link>
                    </div>
                </li>) : null}
            </ul>
        </div>
    )
}
