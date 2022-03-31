import React from 'react';
import style from "./songList.module.less";
import { Link } from "react-router-dom";
import utils from '../../utils';

export default function SongList(props) {
    const { songs, curSongId, curSong } = props;
    return (
        <div className={style['song-list-wrap']}>
            <div className="list-header">
                <h4 className='title'>播放列表({songs.length})</h4>
                <Link to="/" className='add-all'>
                    <i className="icon-add"></i>
                    <span>收藏全部</span>
                </Link>
                <span className="line"></span>
                <Link to="/" className='del'>
                    <i className="icon-del"></i>
                    <span>清除</span>
                </Link>
                <p className="name">{curSong ? curSong.song.name : null}</p>
                <i className="icon-close" onClick={() => {
                    props.onClose();
                }}>close</i>
            </div>
            <div className="list-content">
                <div className="list-wrap">
                    <ul className='list'>
                        {songs && songs.map(s => <li className='list-item' key={s.id}>
                            <i className={curSongId == s.id ? "icon-p icon-playing" : "icon-p"}></i>
                            <span className="name pdl10">{s.song.name}</span>
                            <span className="artist pdl10">
                                {s.song.ar.map((a, i) => <Link key={a.id} to={"/find/artist?id=" + a.id}>
                                    {i === 0 ? null : '/'}{a.name}
                                </Link>)}
                            </span>
                            <span className="dt pdl10">{utils.formatTime(s.song.dt)}</span>
                        </li>)}
                    </ul>

                </div>
                <div className="middle"></div>
                <div className="word"></div>

            </div>
        </div>
    )
}
