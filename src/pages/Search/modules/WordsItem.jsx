import React, { useState, useCallback } from 'react';
import "./wordsItem.less";
import { IconPlayCircle, IconPlus, IconFolder, IconForward, IconDownload, IconChevronUp, IconChevronDown } from "@douyinfe/semi-icons"
import utils from '../../../utils';

export default function WordsItem(props) {
    const [open, setOpen] = useState(false); // 是否展开
    const handleClick = useCallback(
        () => {
            setOpen(!open)
        },
        [open],
    )
    return (
        <div className="words-item" key={props.id}>
            <div className={`${utils.isEven(props.index + 1) ? 'words-header' : 'words-header even'}`}>
                <div className="name">
                    <IconPlayCircle />
                    <span className="ml8">{props.name}</span>
                </div>
                <div className="operates">
                    <IconPlus />
                    <IconFolder />
                    <IconForward />
                    <IconDownload />
                </div>
                <div className="singers">
                    {props.artists.map((a, i) => <span key={a.id}>{i === 0 ? a.name : '/' + a.name}</span>)}
                </div>
                <span className="alnum">{props.album.name}</span>
                <span className="duration">{utils.formatTime(props.duration)}</span>
            </div>
            <div className="words-lyric">
                {!open ? props.lyrics.txt.split("\n").slice(0, 4).join("\n") : props.lyrics.txt}
                <div className="arrow" onClick={handleClick}>
                    <span className="text">{open ? '收起' : '展开'}</span>
                    {open ? <IconChevronUp /> : <IconChevronDown />}
                </div>
            </div>
        </div>
    )
}
