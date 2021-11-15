import React from 'react';
import {IconPlayCircle, IconDownload, IconFolder, IconPlus, IconFeishuLogo } from "@douyinfe/semi-icons"

import "./searchItem.less";

import utils from '../../../utils';

export default function SearchItem(props) {
    let isEven = utils.isEven(props.index);
    return (
        <div className={`${isEven ? 'search-item' : 'search-item even'}`}>
            <IconPlayCircle />
            <span className="name">{props.name}</span>
            <div className="operates">
                <IconPlus />
                <IconFolder />
                <IconFeishuLogo />
                <IconDownload />
            </div>
            <div className="singers">
                {props.artists.map((item, i) => <span key={item.id}>{i === 0 ? item.name : `/${item.name}`}</span>)}
            </div>
            <div className="album">《{props.album.name}》</div>
            <div className="duration">{utils.formatTime(props.duration)}</div>
        </div>
    )
}


