import React from 'react';
import LazyLoad from 'react-lazyload';
import "./singerItem.less";

export default function SingerItem(props) {
    const singers = props.singers;
    const singLis = singers.map(s =>(
        <li key={s.id} className="singer-item">
            <div className="singer-img">
                <LazyLoad height={200}>
                    <img src={s.img1v1Url} alt="" />
                </LazyLoad>
            </div>
            <p className="singer-name">
                <span className="name">{s.name}</span>
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
