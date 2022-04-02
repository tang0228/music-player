import React from 'react';
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import style from "./item.module.less";
import loadingUrl from "@/assets/loading.svg";
import { getAlbum } from "@/services/apis";
import { addSongListAction } from "@/store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
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
        addSongs: (...args) => dispatch(addSongListAction(...args))
    };
};

function Item(props) {
    const { setCurSongId, addSongs } = props;
    // 添加新碟到播放列表
    const addSongList = (id) => {
        getAlbum({ id }).then(res => {
            if (res.code === 200) {
                Toast.success({
                    content: "成功添加新碟到播放列表",
                    duration: 2,
                });
                const list = res.songs.map(s => ({
                    id: s.id,
                    url: "https://music.163.com/song/media/outer/url?id=" + s.id +'.mp3',
                    song: s
                }));
                addSongs(list);
                setCurSongId(list[0].id);
            }
        })
    }
    return (
        <div className={style["album-item"]} key={props.id}>
            <div className="album-img">
                <Link to={'/find/album?id=' + props.id}>
                    <LazyLoad height={130} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
                        <img src={props.blurPicUrl} alt="" />
                    </LazyLoad>
                    <span className='al-mask'></span>
                </Link>
                <i className="icon-album-play" onClick={addSongList.bind(null, props.id)}></i>
            </div>
            <Link to={'/find/album?id=' + props.id} className="album-name">{props.name}</Link>
            <Link to={'/find/artist?id=' + props.artist.id} className="singer-name">{props.artist.name}</Link>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
