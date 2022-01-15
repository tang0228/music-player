import React, { useEffect, useState } from 'react';
import style from "./djBanner.module.less";
import { getDjCat } from '../../../../services/dj';
import { Link, useLocation } from 'react-router-dom';
import qs from "query-string";

export default function DjBanner() {
    const [cats, setCats] = useState([]);
    const location = useLocation();
    const id = qs.parse(location.search).id || "";
    useEffect(() => {
        getDjCat().then(res => {
            if (res.code === 200) {
                setCats(res.categories);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-banner']}>
            {cats && cats.length ? cats.map(c => <Link className={id == c.id ? "cat-item active" : "cat-item"} key={c.id} to={'/find/djradio/category?id=' + c.id}>
                <div className="icon" style={{
                    backgroundImage: `url(${c.picWebUrl})`,
                }}></div>
                <em className="name">{c.name}</em>
            </Link>) : null}
        </div>
    )
}
