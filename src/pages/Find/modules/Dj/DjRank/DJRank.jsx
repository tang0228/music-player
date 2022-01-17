import React, { useEffect, useState } from 'react';
import { getDjProgramToplist } from '../../../../../services/dj';
import style from "./djRank.module.less";
import { Popover } from "@douyinfe/semi-ui";
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { IconPlayCircle, IconArrowUp, IconArrowDown, IconInfoCircle } from "@douyinfe/semi-icons";
import { Progress } from "@douyinfe/semi-ui";
import utils from "../../../../../utils";

export default function DJRank() {
    const [list, setList] = useState([]); // 节目排行榜列表
    const [topScore, setTopScore] = useState(0); // 最高分
    const [updateTime, setUpdateTime] = useState(Date.now()); // 最高分

    useEffect(() => {
        getDjProgramToplist().then(res => {
            if (res.code === 200) {
                setTopScore(res.toplist[0].score);
                setList(res.toplist);
                setUpdateTime(res.updateTime);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-rank']}>
            <div className="header">
                <div className="title">节目排行榜</div>
                <div className="tips">最近更新：{utils.formatDate(updateTime)}</div>
                <Popover content={
                    <div style={{
                        padding: 12,
                    }}>选取云音乐中7天内发布的热度最高的节目，每天更新。<br />热度由节目播放、赞、分享数量总和计算。</div>
                }>
                    <IconInfoCircle />
                </Popover>
            </div>
            <ul className="dj-list">
                {list && list.length ? list.map((d, i) => <li key={d.program.id} className={utils.isEven(i + 1) ? 'dj-item even' : 'dj-item'}>
                    <div className="index">
                        <span className={i > 2 ? 'num' : 'num top'}>{i + 1 < 10 ? '0' + (i + 1) : i + 1}</span>
                        <span className="level">{d.rank === d.lastRank ? '-0' : (d.rank > d.lastRank ?
                            <><IconArrowDown style={{ color: "#4abbeb" }} size="extra-small" /> <span style={{ color: "#4abbeb" }}>{d.rank - d.lastRank}</span></>
                            : <><IconArrowUp style={{ color: "#ba2226" }} size="extra-small" /> <span style={{ color: "#ba2226" }}>{d.lastRank - d.rank}</span> </>)}</span>
                    </div>
                    <div className="img-wrap">
                        <LazyLoad>
                            <img title="播放" src={d.program.coverUrl} alt="" />
                        </LazyLoad>
                        <IconPlayCircle />
                    </div>
                    <Link to={"/find/djradio/program?id=" + d.program.id} className="desc" title={d.program.name} >{d.program.name}</Link>
                    <Link to={"/find/djradio/detail?id=" + d.program.radio.id} className="name" title={d.program.dj.brand}>{d.program.dj.brand}</Link>
                    <div className="cat-wrap">
                        <Link to={"/find/djradio/category?id=" + d.program.categoryId} className="cat" title={d.program.radio.category}>{d.program.radio.category}</Link>
                    </div>
                    <div className="progress">
                        <Progress percent={d.score / topScore * 100} style={{ height: 8 }} stroke="#888" showInfo={false} aria-label="disk usage" />
                    </div>
                </li>) : null}
            </ul>
        </div>
    )
}
