import React, { useEffect, useState } from 'react';
import { getDjProgramToplist } from '../../../../../services/dj';
import style from "./djRank.module.less";
import Header from "../components/Header";
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { IconArrowUp, IconArrowDown } from "@douyinfe/semi-icons";
import { Progress } from "@douyinfe/semi-ui";
import utils from "../../../../../utils";
import loadingUrl from "@/assets/loading.svg";

export default function DjRank() {
    const [list, setList] = useState([]); // 节目排行榜列表
    const [topScore, setTopScore] = useState(0); // 最高分
    useEffect(() => {
        getDjProgramToplist().then(res => {
            if (res.code === 200) {
                setTopScore(res.toplist[0].score);
                setList(res.toplist.splice(0, 10));
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-rank']}>
            <Header title="节目排行榜" url="/find/djradio/rank" />
            <ul className="dj-list">
                {list && list.length ? list.map((d, i) => <li key={d.program.id} className={utils.isEven(i + 1) ? 'dj-item even' : 'dj-item'}>
                    <div className="index">
                        <span className={i > 2 ? 'num' : 'num top'}>{i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
                        <span className="level">{d.rank === d.lastRank ? '-0' : (d.rank > d.lastRank ?
                            <><IconArrowDown style={{ color: "#4abbeb" }} size="extra-small" /> <span style={{ color: "#4abbeb" }}>{d.rank - d.lastRank}</span></>
                            : <><IconArrowUp style={{ color: "#ba2226" }} size="extra-small" /> <span style={{ color: "#ba2226" }}>{d.lastRank - d.rank}</span> </>)}</span>
                    </div>
                    <div className="img-wrap">
                        <LazyLoad height={40} debounce={500} placeholder={<img src={loadingUrl} />}>
                            <img title="播放" src={d.program.coverUrl} alt="" />
                        </LazyLoad>
                        <i className="icon-dj-play"></i>
                    </div>

                    <div className="detail">
                        <Link to={"/find/djradio/program?id=" + d.program.id} className="desc" title={d.program.name} >{d.program.name}</Link>
                        <Link to={"/find/djradio/detail?id=" + d.program.radio.id} className="name" title={d.program.dj.brand}>{d.program.dj.brand}</Link>
                    </div>
                    <div className="progress">
                        <Progress percent={d.score / topScore * 100} style={{ height: 8 }} stroke="#888" showInfo={false} aria-label="disk usage" />
                    </div>

                </li>) : null}
            </ul>
        </div>
    )
}
