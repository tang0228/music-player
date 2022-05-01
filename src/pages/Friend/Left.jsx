import React from 'react'
import style from "./left.module.less"
import { Link } from "react-router-dom"

const SHARE_MAP = {
    '18': "分享单曲",
    '19': "分享专辑",
    '17': "分享电台节目",
    '28': "分享电台节目",
    '22': "转发",
    '39': "发布视频",
    '24': "分享专栏文章",
    '35': "分享歌单",
    '13': "分享歌单",
    '41': "分享视频",
    '21': "分享视频",
}

export default function Left(props) {
    const { list } = props;
    return (
        <div className={style['left-wrap']}>
            <div className="list-header">
                <h3 className="title">动态</h3>
                <span className="btn btn-msg" title="发动态"></span>
                <span className="btn btn-video" title='发布视频'></span>
            </div>
            <ul className="list-wrap">
                {list.map(l => <li key={l.id} className="list-item">
                    <i className="icon-arrow"></i>
                    <Link to={'/user/home?uid=' + l.user.userId}>
                        <img className='avatar' src={l.user.avatarUrl} alt="" />
                    </Link>
                    <div className="main-content">
                        <div className="user-name">
                            <Link className='nickname' to={'/user/home?uid=' + l.user.userId}>{l.user.nickname}</Link>
                            <span className="text">{SHARE_MAP[l.type]}</span>
                        </div>
                        <div className="time">刚刚</div>
                        <div className="share-text">{l.json.msg}</div>
                        <div className="flag">
                            <div className="img-wrap">
                                <img src={l.json.song.img80x80} alt="" />
                                <i className="icon-play"></i>
                            </div>
                            <div className="song-info">
                                <p className='song-name'><Link to={'/find/song?id=' + l.json.song.id}>{l.json.song.name}</Link></p>
                                <p className="artist-name"><Link to={'/find/artist?id=' + l.json.song.artists[0].id}>{l.json.song.artists[0].name}</Link></p>
                            </div>
                        </div>
                    </div>
                </li>)}
                
            </ul>
        </div>
    )
}
