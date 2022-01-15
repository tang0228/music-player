import React, { useEffect, useState } from 'react';
import { getDjProgramToplist } from '../../../../services/dj';

export default function DjRank() {
    const [list, setList] = useState([]); // 节目排行榜列表
    useEffect(() => {
        getDjProgramToplist().then(res => {
            if(res.code === 200) {
                setList(res.toplist);
            }
        })
        return () => {
        }
    }, [])
    return (
        <div>
            Rank
        </div>
    )
}
