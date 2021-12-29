import React, {useEffect, useState} from 'react';
import style from "./recommendPlaylist.module.less";
import ItemNav from './ItemNav';
import { getDayPlsyList } from '../../../services/apis';
import HotItem from "./HotItem"

export default function PersonRecommend() {
    const [recommendList, setRecommendList] = useState([]);
    useEffect(() => {
        getDayPlsyList().then(res => {
            if(res.code === 200) {
                setRecommendList(res.recommend.splice(0, 3));
            }
        });
        return () => {
        }
    }, [])
    return (
        <div className={style['recommend-playlist']} style={{
            marginBottom: 35,
        }}>
            <ItemNav navItem={{
                title: "个性化推荐",
            }}></ItemNav>
            <ul className="list-content">
                {recommendList ? recommendList.map(l => <HotItem key={l.id} {...l}></HotItem>) :null}
            </ul>
        </div>
    )
}
