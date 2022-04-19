import React from 'react';
import "./albumItem.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";
import { getAlbum } from '@/services/apis';
import { Toast } from "@douyinfe/semi-ui";
import { addSongListAction } from "@/store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
import { connect } from "react-redux";

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

function AlbumItem(props) {
    const {albums, setCurSongId, addSongs} = props;

    const addSongList = id => {
        getAlbum({ id }).then(res => {
            if (res.code === 200) {
                Toast.success({
                    content: "成功添加新碟到播放列表",
                    duration: 2,
                });
                const list = res.songs.map(s => ({
                    id: s.id,
                    url: "https://music.163.com/song/media/outer/url?id=" + s.id + '.mp3',
                    song: s
                }));
                addSongs(list);
                setCurSongId(list[0].id);
            }
        })
    }

    const items = albums.map(al => (
        <li key={al.id} className="album-item">
            <div className="album-img">
                <Link to={'/find/album?id=' + al.id}>
                    <LazyLoad height={130} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
                        <img src={al.blurPicUrl} alt="" />
                        <span className="mask"></span>
                    </LazyLoad>
                </Link>
                <i className="album-play" onClick={addSongList.bind(null, al.id)}></i>
            </div>
            <Link to={'/find/album?id=' + al.id} className="album-name">{al.name}</Link>
            <Link to={'/find/artist?id=' + al.artist.id} className="singer-name">{al.artist.name}</Link>
        </li>
    ))
    return (
        <ul className="album-container">
            {items}
        </ul>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumItem);
