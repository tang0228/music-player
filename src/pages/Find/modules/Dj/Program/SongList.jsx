import React, { useState } from 'react';
import style from "./songList.module.less";
import {
    IconChevronUp,
    IconChevronDown,
} from "@douyinfe/semi-icons";
import Item from "./Item";

export default function SongList(props) {
    const [open, setOpen] = useState(true);
    const { list } = props;
    return (
        <div className={style['song-list']}>
            <div className="header">
                <div className="title">节目包含歌曲列表</div>
                <div className="total">（{list.length}首歌）</div>
                <div className="arrow" onClick={() => {
                    setOpen(!open);
                }}>
                    <span className="text">{open ? '收起' : '展开'}</span>
                    {open ? <IconChevronUp /> : <IconChevronDown />}
                </div>
            </div>
            {open ? <ul className='list-wrap'>
                {list.filter(l => l.name).map((t, i) => (
                    <Item showAlbum={true} key={t.id} index={i + 1} item={t} />
                ))}
            </ul> : null}

        </div>
    )
}
