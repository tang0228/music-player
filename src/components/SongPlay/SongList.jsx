import React, { useEffect, useState } from 'react';
import style from "./songList.module.less";
import { Link } from "react-router-dom";
import utils from '../../utils';
import { getLyric } from "@/services/apis";

export default function SongList(props) {
    const [lyric, setLyric] = useState("");
    const { songs, curSongId, curSong } = props;

    // 获取当前播放歌曲的歌词
    useEffect(() => {
        getLyric({ id: curSongId }).then(res => {
            if (res.code === 200) {
                setLyric(res.lrc.lyric.replace(/\[.*?\]|\x20/g, ''));
            }
        })
        return () => {
        }
    }, [curSongId])

    return (
        <div className={style['song-list-wrap']} onClick={(e) => {
            props.onClick && props.onClick(e);
        }}>
            <div className="list-header">
                <h4 className='title'>播放列表({songs.length})</h4>
                <a href='javascript:;' onClick={e => e.preventDefault()} className='add-all'>
                    <i className="icon-add"></i>
                    <span>收藏全部</span>
                </a>
                <span className="line"></span>
                <a className='del' href='javascript:;' onClick={(e) => {
                    e.preventDefault();
                    props.deleteAllSong();
                }}>
                    <i className="icon-del"></i>
                    <span>清除</span>
                </a>
                <p className="name">{curSong ? curSong.song.name : null}</p>
                <i className="icon-close" onClick={() => {
                    props.onClose();
                }}>close</i>
            </div>
            <div className="list-content">
                <div className="list-wrap">
                    <ul className='list'>
                        {songs && songs.map(s => <li className='list-item' key={s.id} onClick={(e) => {
                            let tagName = e.target.tagName, id = e.target.id;
                            if (tagName === 'I' && id === 'del') {
                                props.deleteOneSong(s.id);
                            } else {
                                props.itemClickPlay(s.id);
                            }
                        }}>
                            <i id="playing" className={curSongId == s.id ? "icon-p icon-playing" : "icon-p"}></i>
                            <span className="name pdl10">{s.song.name}</span>
                            <i id="del" className="icon-del"></i>
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
                <div className="word-wrap">
                    <div className="lyric">
                        {lyric}
                    </div>
                </div>
            </div>
        </div>
    )
}
