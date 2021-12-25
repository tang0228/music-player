import React, {useEffect, useState} from 'react';
import { getPersonalized, getHotPlayList } from '../../../services/apis';
import style from "./recommendPlaylist.module.less";

export default function RecommendPlaylist() {
    const [hotTags, setHotTags] = useState([]); // 热门歌单分类
    const [list, setList] = useState([]); // 推荐歌单
    useEffect(() => {
        (async () => {
            const res = await getPersonalized({limit: 8});
            if(res.code === 200) {
                setList(res.result);
            }
            getHotPlayList().then(res => {
                if(res.code === 200) {
                    setHotTags(res.tags);
                }
            })
        })();
        return () => {
        }
    }, [])
    return (
        <div className={style["recommend-playlist"]}>
            
        </div>
    )
}
