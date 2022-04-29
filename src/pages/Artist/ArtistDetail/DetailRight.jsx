import React, { useEffect, useState } from 'react';
import style from "./detailRight.module.less";
import { getSimiArtist } from "../../../services/apis";
import { Link } from "react-router-dom";

export default function DetailRight(props) {
    const {id} = props;
    const [artists, setArtists] = useState([]);
    // 获取相似歌手
    useEffect(() => {
        (async () => {
            const res = await getSimiArtist({id});
            if(res.code === 200) {
                setArtists(res.artists.splice(0, 6));
            }
        })();
        return () => {
        }
    }, [id])

    return (
        <div className={style['detail-right']}>
            <div className="artist-simi">
                <h3 className="title">相似歌手</h3>
                <div className="artist-content">
                {artists ? artists.map(a => <div key={a.id} className="artist-item">
                    <Link to={'/find/artist?id=' + a.id}><img src={a.picUrl} alt="" /></Link>
                    <Link to={'/find/artist?id=' + a.id} className="name">{a.name}</Link>
                </div>) : null}
                </div>
            </div>
        </div>
    )
}
