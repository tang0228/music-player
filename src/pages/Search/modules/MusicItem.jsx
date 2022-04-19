import React from 'react';
import { IconDownload, IconFolder, IconPlus, IconForward } from "@douyinfe/semi-icons"
import { Toast } from '@douyinfe/semi-ui';
import "./musicItem.less";
import utils from '../../../utils';
import { getMusicPlayUrl } from "../../../services/apis";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
    };
};

function MusicItem(props) {
    const { addSong, setCurSongId } = props;
    const playMusic = async (id) => {
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
    };

    const songs = props.songs;
    const items = songs.map((song, index) => (
        <li key={song.id} className={`${utils.isEven(index + 1) ? 'search-item' : 'search-item even'}`}>
            <i className="music-play" onClick={() => {
                playMusic(song.id)
            }}></i>
            <div className='song-wrap' style={{flex: '1'}}>
                <Link to={'/find/song?id=' + song.id} className="name">{song.name}</Link>
                {song.mvid ? <Link to={`/find/mv?id=` + song.mvid} className="music-mv"></Link> : null}
            </div>
            <div className="operates">
                <IconPlus />
                <IconFolder />
                <IconForward />
                <IconDownload />
            </div>
            <div className="singers">
                {song.artists && song.artists.map((item, i) => <Link className="singer-name" to={'/find/artist?id=' + item.id} key={item.id}>{i === 0 ? item.name : `/${item.name}`}</Link>)}
            </div>
            <Link to={'/find/album?id=' + song.album.id} className="album">《{song.album.name}》</Link>
            <div className="duration">{utils.formatTime(song.duration)}</div>
        </li>
    ))
    return (
        <ul className="music-container">
            {items}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicItem);


