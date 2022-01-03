import React from 'react';
import LazyLoad from 'react-lazyload';
import "./singerItem.less";
import { Link } from "react-router-dom";

export default function SingerItem(props) {
    const singers = props.singers;
    const singLis = singers.map(s =>(
        <li key={s.id} className="singer-item">
            <div className="singer-img">
                <Link to={'/find/artist?id=' + s.id}>
                    <LazyLoad>
                        <img src={s.img1v1Url} alt="" />
                    </LazyLoad>
                </Link>
            </div>
            <p className="singer-name">
                <Link to={'/find/artist?id=' + s.id} className="name">{s.name}</Link>
                {s.identityIconUrl ? <img src={s.identityIconUrl} alt="" /> : null}
            </p>
        </li>
    ))
    return (
        <ul className="singer-content">
            {singLis}
        </ul>
    )
}
