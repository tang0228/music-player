import React from "react";
import utils from "../../../../../utils";
import { IconVideo } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import { getMusicPlayUrl } from "../../../../../services/apis";
import { connect } from "react-redux";
import { addSongAction } from "../../../../../store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
import "./item.less";

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
function Item(props) {
    const { item, index, showAlbum, addSong, setCurSongId } = props;
    // 播放歌曲
    const play = async (id) => {
        const res = await getMusicPlayUrl({ id });
        setCurSongId(id);
        if (res.code === 200 && res.data[0].url) {
            addSong(res.data);
        }
    };
    return (
        <li className="table-item">
            <div className="play-num bd">
                <span className="num">{index}</span>
                <i className="icon-play" onClick={() => {
                    play(item.id)
                }} ></i>
            </div>
            <div className="title bd ellipsis-1">
                <Link to={'/find/song?id=' + item.id}>{item.name}</Link>
                {item.mvid ? <Link className="mv-play" to={'/find/mv?id=' + item.mvid}><IconVideo /></Link> : null}
            </div>
            <div className="duration bd">
                <span className="time">{utils.formatTime(item.duration)}</span>
                <div className="btns">
                    <i className="icon icon-add"></i>
                    <i className="icon icon-fav"></i>
                    <i className="icon icon-share"></i>
                    <i className="icon icon-down"></i>
                </div>
            </div>
            <div className="name bd ellipsis-1">
                {item.artists.map((e, i) => (
                    <Link to={'/find/artist?id=' + e.id} key={e.id + i}>{i === 0 ? e.name : `/${e.name}`}</Link>
                ))}
            </div>
            {showAlbum ? <div className="album bd ellipsis-1"><Link to={'/find/album?id=' + item.album.id}>{item.album.name}</Link></div> : null}
        </li>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
