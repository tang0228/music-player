import React, {useEffect, useState} from 'react';
import { getArtistList } from '../../../../services/artist'; 
import style from "./entryArtist.module.less";
import { Link } from 'react-router-dom';
import { Button } from "@douyinfe/semi-ui";

export default function EntryArtist() {
    const [artist, setArtist] = useState([]);
    useEffect(() => {
        getArtistList({limit: 5}).then(res => {
            if(res.code === 200) {
                setArtist(res.artists);
            }
        });
        return () => {
        }
    }, [])
    return (
        <div className={style['entry-artist']}>
            <div className="header">
                <h3 className="title">入驻歌手</h3>
                <Link className="toPage" to={'/find/artist'}>查看全部&gt;</Link>
            </div>
            <div className="wrap">
                {artist && artist.length ? artist.map(a => <Link to={'/artist?id=' + a.id} key={a.id} className="item">
                    <img src={a.picUrl} alt="" />
                    <div className="name">{a.name}</div>
                </Link>) : '无'}
            </div>
            <a href="https://music.163.com/st/musician" target="_blank">
            <Button style={{
                width: 212,
                background: "#ddd",
                color: "#333"
            }}>申请成为网易音乐人</Button>
            </a>
        </div>
    )
}
