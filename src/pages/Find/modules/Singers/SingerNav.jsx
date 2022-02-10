import React from 'react';
import navs from '../../../../common/singerNav';
import style from "./singerNav.module.less";
import { Link, useLocation } from "react-router-dom";
import qs from "query-string";

export default function SingerNav() {
    const location = useLocation();
    const { id } = qs.parse(location.search) || "";
    return (
        <div className={style['singer-nav']}>
            {navs.map((n, i) => <dl className='nav-wrap' key={i}>
                <dt className='nav-title'>{n.title}</dt>
                {n.childrens.map((c, j) => <Link className={c.id == id ? 'nav-item active' : 'nav-item'} key={j}
                    to={`/find/singers/cat?area=${n.area}&type=${c.type}&name=${c.name}&id=${c.id}`}
                ><dd>{c.name}</dd></Link>)}
            </dl>)}
        </div>
    )
}
