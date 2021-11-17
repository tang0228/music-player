import React, { useState, useCallback } from 'react';
import "./wordsItem.less";
import { IconPlayCircle, IconPlus, IconFolder, IconFeishuLogo, IconDownload, IconChevronUp, IconChevronDown } from "@douyinfe/semi-icons"
import utils from '../../../utils';


export default function WordsItem(props) {
    const [open, setOpen] = useState(false); // 是否展开
    const handleClick = useCallback(
        () => {
            setOpen(!open)
        },
        [open],
    )
    const words = props.words;
    const items = words.map((w, i) => (
        <div className="words-item" key={w.id}>
            <div className={`${utils.isEven(i + 1) ? 'words-header' : 'words-header even'}`}>
                <div className="name">
                    <IconPlayCircle />
                    <span className="ml8">{w.name}</span>
                </div>
                <div className="operates">
                    <IconPlus />
                    <IconFolder />
                    <IconFeishuLogo />
                    <IconDownload />
                </div>
                <div className="singers">
                    {w.artists.map((a, i) => <span key={a.id}>{i === 0 ? a.name : '/' + a.name}</span>)}
                </div>
                <span className="alnum">{w.album.name}</span>
                <span className="duration">{utils.formatTime(w.duration)}</span>
            </div>
            <div className="words-lyric">
                {!open ? w.lyrics.txt.split("\n").slice(0, 4).join("\n") : w.lyrics.txt}
                <div className="arrow" onClick={handleClick}>
                    <span className="text">{open ? '收起' : '展开'}</span>
                    {open ? <IconChevronUp /> : <IconChevronDown />}
                </div>
            </div>
        </div>
    ))
    return (
        <div className="words-container">
            {items}
        </div>
    )
}
