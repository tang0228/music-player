import React from 'react';
import style from "./index.module.less";

export default function Find(props) {
    return (
        <div className={style['find-container']}>
            {props.children}
        </div>
    )
}
