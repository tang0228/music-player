import React, { useEffect, useState } from 'react';
import { getHotDjList } from '../../../../../services/dj';
import style from "./right.module.less";
import { Link } from "react-router-dom";

export default function DjRight(props) {
    const { cateId } = props;
    const [list, setList] = useState([]);
    useEffect(() => {
        getHotDjList({ limit: 10, cateId }).then(res => {
            if(res.code === 200) {
                setList(res.djRadios.splice(0, 5));
            }
        })
        return () => {
        }
    }, [cateId])
    return (
        <div className={style['dj-right']}>
            <div className="header">
                <div className="title">你可能喜欢</div>
            </div>
            <ul className="list-wrap">
                {list && list.length ? list.map(l => <li className='list-item' key={l.id}>
                    <Link to={'/find/djradio/detail?id=' + l.id}>
                        <img src={l.picUrl} alt="" />
                    </Link>
                    <div className="info">
                        <Link to={'/find/djradio/detail?id=' + l.id} className="name">{l.name}</Link>
                        <div className="main">
                            by
                            <Link to={'/user/home?uid=' + l.dj.userId} className="dj">{l.dj.nickname}</Link>
                        </div>
                    </div>
                </li>) : null}
            </ul>
        </div>
    )
}
