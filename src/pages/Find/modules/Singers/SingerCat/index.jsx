import React from 'react';
import SingerNav from "../SingerNav";
import List from "./List";
import style from "./index.module.less";

export default function SingerCat() {
    return (
        <div className={style['singer-cat']}>
            <SingerNav />
            <List />
        </div>
    )
}
