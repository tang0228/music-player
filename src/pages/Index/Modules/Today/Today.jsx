import React from 'react';
import style from "./today.module.less";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const dayMap = {
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "0": "日",
}

export default function Today() {
    return (
        <div className={style['today-wrap']}>
            <Link className="item" to="/find/recommend/taste">
                <span className="head">星期{dayMap[dayjs().day()]}</span>
                <span className="bd">{dayjs().date()}</span>
                <span className="mask"></span>
            </Link>
            <Link className="desc" to="/find/recommend/taste">每日歌曲推荐</Link>
            <p className="idv">根据你的口味生成，<br/>每天6:00更新</p>
        </div>
    )
}
