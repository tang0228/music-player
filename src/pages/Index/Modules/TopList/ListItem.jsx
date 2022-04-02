import React from 'react';
import PropTypes from "prop-types";
import style from "./listItem.module.less";
import { Link } from "react-router-dom";
import { getPlayListDetail, getMusicPlayUrl } from "@/services/apis";
import { addSongListAction, addSongAction } from '../../../../store/actions/song';
import { setCurSongIdAction } from "../../../../store/actions/curSongId";
import { connect } from "react-redux";
import { Toast } from "@douyinfe/semi-ui";

const mapStateToProps = (state) => {
    return {
        curSongId: state.curSongId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurSongId: (...args) => dispatch(setCurSongIdAction(...args)),
        addSongs: (...args) => dispatch(addSongListAction(...args)),
        addSong: (...args) => dispatch(addSongAction(...args))
    };
};
function ListItem(props) {
    const { addSongs, setCurSongId, addSong } = props;

    // 添加歌单到播放列表
    const addSongList = id => {
        getPlayListDetail({ id }).then(res => {
            if (res.code === 200) {
                Toast.success({
                    content: "添加歌单到播放列表",
                    duration: 2,
                });
                const list = res.playlist.tracks.map(t => ({
                    id: t.id,
                    url: 'https://music.163.com/song/media/outer/url?id=' + t.id + '.mp3',
                    song: t
                }));
                addSongs(list);
                setCurSongId(list[0].id);
            }
        })
    };

    // 添加一首歌曲到播放列表
    const addOneSong = id => {
        getMusicPlayUrl({ id }).then(res => {
            if (res.code === 200) {
                setCurSongId(id);
                addSong(res.data);
            }
        })
    }

    return (
        <div className={style['list-item']}>
            <div className="item-top">
                <Link to={'/find/toplist?id=' + props.id}>
                    <img src={props.imgUrl} alt="" />
                </Link>
                <div className="name">
                    <div className="title"><Link to={'/find/toplist?id=' + props.id}>{props.title}</Link></div>
                    <i className="icon-play icon-common" onClick={addSongList.bind(null, props.id)} ></i>
                    <i className="icon-add icon-common"></i>
                </div>
            </div>
            <div className="item-bottom">
                {
                    props.list && props.list.length ? props.list.map((l, i) => <li key={l.id} className="row">
                        <span className={i > 2 ? 'index' : 'index top'}>{i + 1}</span>
                        <Link to={'/find/song?id=' + l.id} className="name">{l.name}</Link>
                        <div className="operate">
                            <i className="icon-play-one icon" onClick={addOneSong.bind(null, l.id)}></i>
                            <i className="icon-add-play icon"></i>
                            <i className="icon-add-all icon"></i>
                        </div>
                    </li>) : null
                }
                <li className="row">
                    <Link to={'/find/toplist?id=' + props.id} className="all">查看全部&gt;</Link>
                </li>
            </div>
        </div >
    )
}

ListItem.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
