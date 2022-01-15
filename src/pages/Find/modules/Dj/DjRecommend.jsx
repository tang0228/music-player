import React, { useEffect } from 'react';
import style from "./djRecommend.module.less";
import { getDjRecommend } from '../../../../services/dj';

export default function DjRecommend() {
    useEffect(() => {
        getDjRecommend().then(res => {
            console.log(res);
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['dj-recommend']}>
            djRecommend
        </div>
    )
}
