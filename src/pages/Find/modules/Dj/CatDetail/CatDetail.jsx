import React from 'react';
import DjBanner from '../components/DjBanner';
import style from "./catDetail.module.less";
import { useLocation } from 'react-router-dom';
import qs from "query-string";
import GoodDj from "./GoodDj";
import DjList from './DjList';

export default function CatDetail() {
    const location = useLocation();
    const id = qs.parse(location.search).id || ''; // cateid
    return (
        <div className={style["cat-detail"]}>
            <DjBanner />
            <GoodDj id={id} />
            <DjList id={id} />
        </div>
    )
}
