import React, {useEffect, useState} from 'react';
import { getPersonalized } from '../../../services/apis';
export default function RecommendPlaylist() {
    const [list, setList] = useState([]); // 推荐歌单
    useEffect(() => {
        (async () => {
            const res = await getPersonalized({limit: 8});
            if(res.code === 200) {
                setList(res.result);
            }
        })();
        return () => {
        }
    }, [])
    return (
        <div>
            
        </div>
    )
}
