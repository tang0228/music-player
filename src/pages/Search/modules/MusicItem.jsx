import React from 'react';
import {IconPlayCircle, IconDownload, IconFolder, IconPlus, IconFeishuLogo } from "@douyinfe/semi-icons"

import "./musicItem.less";

import utils from '../../../utils';

export default function MusicItem(props) {
    const songs = props.songs;
    const items = songs.map((song, index) =>(
        <li key={song.id} className={`${utils.isEven(index + 1) ? 'search-item' : 'search-item even'}`}>
            <IconPlayCircle />
            <span className="name">{song.name}</span>
            <div className="operates">
                <IconPlus />
                <IconFolder />
                <IconFeishuLogo />
                <IconDownload />
            </div>
            <div className="singers">
                {song.artists && song.artists.map((item, i) => <span key={item.id}>{i === 0 ? item.name : `/${item.name}`}</span>)}
            </div>
            <div className="album">《{song.album.name}》</div>
            <div className="duration">{utils.formatTime(song.duration)}</div>
        </li>
    ))
    return (
        <ul className="music-container">
            {items}
        </ul>
    )
}


