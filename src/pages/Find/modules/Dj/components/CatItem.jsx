import React from 'react';
import Header from './Header';
import style from "./catItem.module.less";
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import utils from '../../../../../utils';
import loadingUrl from "@/assets/loading.svg";

export default function CatItem(props) {
    const detail = props.detail;
    return (
        <div className={style['cat-item']}>
            <Header title={detail.categoryName + '·电台'} url={"/find/djradio/category?id=" + detail.categoryId} />
            <div className="wrap">
                {detail.radios.map((d, i) => <div className={utils.isEven(i + 1) ? 'box' : 'box mr28'} key={d.id}>
                    <LazyLoad height={120} debounce={500} placeholder={<img src={loadingUrl} />}>
                        <Link to={"/find/djradio/detail?id=" + d.id}><img src={d.picUrl} alt="" /></Link>
                    </LazyLoad>
                    <div className="content">
                        <Link to={"/find/djradio/detail?id=" + d.id} className="name">{d.name}</Link>
                        <div className="desc">{d.rcmdText}</div>
                    </div>

                </div>)}
            </div>

        </div>
    )
}
