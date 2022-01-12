import React from 'react';
import style from "./download.module.less";
import {Link} from "react-router-dom";

export default function Download() {
    return (
        <div className={style["download"]}>
            <Link className="download-btn" to="/download">下载客户端</Link>
            <p className="download-text">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
    )
}
