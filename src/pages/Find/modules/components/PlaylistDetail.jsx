import React, { useEffect, useState} from 'react';
import style from "./playlistDetail.module.less";
import { useHistory, useLocation } from "react-router-dom";
import { getPlayListDetail } from "../../../../services/apis";
import qs from "query-string";
import DetailLeft from './DetailLeft.jsx';

export default function PlaylistDetail(props) {
    const location = useLocation();
    const id = qs.parse(location.search).id;
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getPlayListDetail({id: '2819914042'});
            if(res.code === 200) {
                setDetail(res.playlist)
            }
        })();
        return () => {
        }
    }, [])
    return (
        <div className={style.detail_container}>
            <div className="left">
                <DetailLeft detail={detail}/>
            </div>
            <div className="right">

            </div>
        </div>
    )
}
