import React from 'react';
import SingerNav from './SingerNav';
import SingerList from "./SingerList";
import style from "./index.module.less";

export default function Singers() {
    return (
        <div className={style['singer-wrapper']}>
            <SingerNav />
            <SingerList />
        </div>
    )
}
