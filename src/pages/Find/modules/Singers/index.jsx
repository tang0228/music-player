import React from 'react';
import SingerNav from './SingerNav';
import style from "./index.module.less";

export default function Singers() {
    return (
        <div className={style['singer-wrapper']}>
            <SingerNav />
        </div>
    )
}
