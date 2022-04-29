import React from 'react';
import style from "./suggest.module.less";
import { Link } from "react-router-dom";

export default function SearchSuggest(props) {
    const { data } = props;
    return (
        <div className={style["suggest"]}>
            <div className="content">
                {data.songs ? <div className="item">
                    <h3 className="hd">
                        <i className="icon icon-songs"></i>
                        <em>单曲</em>
                    </h3>
                    <ul className='cb'>
                        {data.songs.map(s => <li key={s.id}><Link to={"/find/song?id=" + s.id}>{s.name}-{s.artists[0].name}</Link></li>)}
                    </ul>
                </div> : null}
                {data.artists ? <div className="item">
                    <h3 className="hd">
                        <i className="icon icon-artist"></i>
                        <em>歌手</em>
                    </h3>
                    <ul className='cb bg'>
                        {data.artists.map(a => <li key={a.id}><Link to={"/find/artist?id=" + a.id}>{a.name}</Link></li>)}
                    </ul>
                </div> : null}
                {data.albums ? <div className="item">
                    <h3 className="hd">
                        <i className="icon icon-album"></i>
                        <em>专辑</em>
                    </h3>
                    <ul className='cb'>
                        {data.albums.map(a => <li key={a.id}><Link to={"/find/album?id=" + a.id}>{a.name}</Link></li>)}
                    </ul>
                </div> : null}
                {data.playlists ? <div className="item">
                    <h3 className="hd">
                        <i className="icon icon-list"></i>
                        <em>歌单</em>
                    </h3>
                    <ul className='cb bg'>
                        {data.playlists.map(p => <li key={p.id}><Link to={"/find/playlist/detail?id=" + p.id}>{p.name}</Link></li>)}
                    </ul>
                </div> : null}

            </div>
        </div>
    )
}
