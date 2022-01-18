import React from 'react';
import style from "./index.module.less";
import DjLeft from "./DjLeft";
import DjRight from "./DjRight";
import { useLocation } from "react-router-dom";
import qs from "query-string";


export default function DjRadio() {
    const location = useLocation();
    const rid = qs.parse(location.search).id || "";
    return (
        <div className={style['dj-detail']}>
            <DjLeft rid={rid} />
            <DjRight />
        </div>
    )
}
