import React from 'react';
import style from "./dj.module.less";
import DjBanner from './DjBanner';
import DjRecommend from './DjRecommend';
import DjRank from './DjRank';

export default function Dj() {
    return (
        <div className={style['dj-container']}>
            <DjBanner />
            <div className="list-content">
                <DjRecommend />
                <DjRank />
            </div>
        </div>
    )
}
