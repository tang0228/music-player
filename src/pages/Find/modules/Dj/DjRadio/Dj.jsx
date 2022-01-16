import React from 'react';
import style from "./dj.module.less";
import DjBanner from '../components/DjBanner';
import DjRecommend from './DjRecommend';
import DjRank from './DjRank';
import PersonDj from './PersonDj';

export default function Dj() {
    return (
        <div className={style['dj-container']}>
            <DjBanner />
            <div className="list-content">
                <DjRecommend />
                <DjRank />
            </div>
            <PersonDj />
        </div>
    )
}
