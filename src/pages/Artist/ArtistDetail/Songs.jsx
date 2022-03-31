import React from 'react';
import style from "./songs.module.less";
import { Button, Space, Select, Toast } from "@douyinfe/semi-ui";
import { IconPlayCircle, IconPlus, IconCopyAdd, IconDownload, IconForward, IconFolder, IconVideo } from "@douyinfe/semi-icons";
import utils from "../../../utils";
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

const list = [
    { value: '1', label: '热门单曲', otherKey:0 },
    { value: '2', label: '作词作品', disabled: true, otherKey: 1 },
    { value: '3', label: '作曲作品', disabled: true, otherKey: 2 },
]

function Songs(props) {
    const {songs, addSong, setCurSongId} = props;
    // 播放歌曲
    const play = async (id) => {
        const res = await getMusicPlayUrl({id});
        setCurSongId(id);
        if(res.code === 200 && res.data[0].url) {
            addSong(res.data);
        } else {
            Toast.error({
                content: "无权限",
                duration: 2
            })
        }
    }
    return (
        <div className={style['songs-wrap']}>
            <div className="songs-header">
                <div className="btns">
                    <Space>
                        <Button icon={<IconPlayCircle />}>播放</Button>
                        <Button icon={<IconPlus />}></Button>
                        <Button type="tertiary" icon={<IconCopyAdd />}>收藏热门{songs.length}</Button>
                    </Space>
                </div>
                <div className="select">
                    <Select placeholder='请选择' style={{ width: 102, fontSize: '12px' }} optionList={list}>
                    </Select>
                </div>
            </div>
            <ul className="songs-list">
                {songs.map((s, i) => <li className={utils.isEven(i) ? 'item even' : 'item'} key={s.id}>
                    <div className="li-index">
                        <span className="index">{i+1}</span>
                        <IconPlayCircle onClick={() => {
                            play(s.id)
                        }}/>
                    </div>
                    <div className="name">
                        <Link to={'/find/song?id=' + s.id} className="singer-name">{s.name}</Link>
                        {s.alia && s.alia.length ?
                            <span className="mv-name">-{s.alia.map(a=> a)}</span>
                            : null }
                        {s.mv ? <Link className="mv-play" to={'/find/mv?id=' + s.mv}><IconVideo /></Link> : null}
                    </div>
                    <div className="option">
                        <span className="dt">{utils.formatTime(s.dt)}</span>
                        <div className="btns">
                            <IconPlus />
                            <IconFolder />
                            <IconForward />
                            <IconDownload />
                        </div>
                    </div>
                    <Link to={'/find/album?id=' + s.al.id} className="album">{s.al.name}</Link>
                    </li>)}
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
