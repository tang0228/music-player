import React, { useEffect } from 'react';
import style from  "./index.module.less";
import { getBanner } from '../../services/apis';
import Banner from './Modules/Banner';
import RecommendPlaylist from './Modules/RecommendPlaylist';

export default function Index() {
    useEffect(() => {
        (async () => {
            const res = await getBanner();
            console.log(res);
        })();
        return () => {
        }
    }, [])
    return (
        <div className={style.main_container}>
            
            <Banner />
            <RecommendPlaylist />
        </div>
    )
}
