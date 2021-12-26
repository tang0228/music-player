import React from 'react';
import style from "./person.module.less";
import ItemNav from './ItemNav';

export default function PersonRecommend() {
    return (
        <div className={style['person-recommend']}>
            <ItemNav navItem={{
                title: "个性化推荐",
            }}></ItemNav>
        </div>
    )
}
