import React from 'react';
import navs from '../../../../common/singerNav';
import style from "./singerNav.module.less";
import { Link } from "react-router-dom";

export default function SingerNav() {
    return (
        <div className={style['singer-nav']}>
            {navs.map((n, i) => <dl className='nav-wrap' key={i}>
                <dt className='nav-title'>{n.title}</dt>
                {n.childrens.map((c, j) => <Link className='nav-item' key={j} to="/"><dd>{c.name}</dd></Link>)}
            </dl>)}
        </div>
    )
}
