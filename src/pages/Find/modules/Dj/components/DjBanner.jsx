import React, { useEffect, useState } from 'react';
import style from "./djBanner.module.less";
import { getDjCat } from '../../../../../services/dj';
import { Link, useLocation } from 'react-router-dom';
import qs from "query-string";
import { Spin } from "@douyinfe/semi-ui";

export default function DjBanner() {
    const [cats, setCats] = useState([]);
    const location = useLocation();
    const id = qs.parse(location.search).id || "";
    const [loading, setLoading] = useState(false); // 加载中
    useEffect(() => {
        setLoading(true);
        getDjCat().then(res => {
            if (res.code === 200) {
                setCats(res.categories);
                setLoading(false);
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
            </Link>) : <div style={{
                position: "relative",
                height: 180,
                width: "100%"
            }}>
                <Spin
                    spinning={loading}
                    tip="loading..."
                    size="large"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "99999",
                    }} />
            </div>}
        </div>
    )
}
