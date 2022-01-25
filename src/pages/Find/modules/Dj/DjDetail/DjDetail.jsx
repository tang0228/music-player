import React, { useEffect, useState } from 'react';
import style from "./index.module.less";
import DjLeft from "./DjLeft";
import DjRight from "./DjRight";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getDjradioDetail } from "../../../../../services/dj";

export default function DjRadio() {
    const location = useLocation();
    const rid = qs.parse(location.search).id || "";
    const [detail, setDetail] = useState(null);

    // 获取电台详情
    useEffect(() => {
        getDjradioDetail({ rid }).then(res => {
            if (res.code === 200) { setDetail(res.data) }
        })
        return () => {
        }
    }, [rid]);

    return (
        <div className={style['dj-detail']}>
            <DjLeft rid={rid} detail={detail} />
            <DjRight cateId={detail && detail.categoryId}/>
        </div>
    )
}
