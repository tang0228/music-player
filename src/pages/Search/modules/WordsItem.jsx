import React, { useState } from 'react';
import "./wordsItem.less";
import { Toast } from '@douyinfe/semi-ui';
import { IconPlus, IconFolder, IconForward, IconDownload, IconChevronUp, IconChevronDown } from "@douyinfe/semi-icons"
import utils from '../../../utils';
import { Link } from "react-router-dom";
import { getMusicPlayUrl } from '../../../services/apis';
import { connect } from 'react-redux';
import { addSongAction } from '../../../store/actions/song';
import { setCurSongIdAction } from "@/store/actions/curSongId";

const mapStateToProps = (state) => {
    return {
        song: state.song
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addSong: (...args) => dispatch(addSongAction(...args)),
        setCurSongId: (...args) => dispatch(setCurSongIdAction(...args))
    }
}

function WordsItem(props) {
    const { addSong, setCurSongId } = props;
    const [open, setOpen] = useState(false); // 是否展开
    const handleClick = () => {
        setOpen(!open)
    };

    const play = async (id) => {
        const res = await getMusicPlayUrl({ id });
        setCurSongId(id);
        if (res.code === 200 && res.data[0].url) {
            addSong(res.data);
        } else {
            Toast.error({
                content: "无权限",
                duration: 2
            })
        }
    }
    return (
        <div className="words-item" key={props.id}>
            <div className={`${utils.isEven(props.index + 1) ? 'words-header' : 'words-header even'}`}>
                <div className="name">
                    <i className="word-play" onClick={() => {
                        play(props.id)
                    }}></i>
                    <Link to={'/find/song?id=' + props.id} className="ml8">{props.name}</Link>
                </div>
                <div className="operates">
                    <IconPlus />
                    <IconFolder />
                    <IconForward />
                    <IconDownload />
                </div>
                <div className="singers">
                    {props.artists.map((a, i) => <Link to={'/find/artist?id=' + a.id} key={a.id}>{i === 0 ? a.name : '/' + a.name}</Link>)}
                </div>
                <Link to={'/find/album?id=' + props.album.id} className="alnum">{props.album.name}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(WordsItem)
