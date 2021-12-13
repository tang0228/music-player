import React from 'react';
import style from "./desc.module.less";

export default function Desc(props) {
    const {desc, intro, name} = props;
    return (
        <div className={style['desc-wrap']}>
            <h2><i></i>{name}简介</h2>
            <p className="desc">
                {desc}
            </p>
            {
                intro.map((item,index) => <div key={index} className="intro-item">
                    <h2>{item.ti}</h2>
                    <p className="txt desc">{item.txt}</p>
                </div>)
            }
        </div>
    )
}
