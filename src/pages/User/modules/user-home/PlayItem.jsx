import React from "react";
import style from "./playItem.module.less";
import { useHistory, Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import loadingUrl from "@/assets/loading.svg";
import { getPlayListDetail } from "@/services/apis";
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

function PlayItem(props) {
	const history = useHistory();
	const { setCurSongId, addSongs, item } = props;
	// 添加歌单到播放列表
	const addSongList = () => {
		getPlayListDetail({ id: item.id }).then(res => {
			if (res.code === 200) {
				Toast.success({
					content: "成功添加歌单到播放列表",
					duration: 2
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
	}
	return (
		<div className={style["play-item-wrap"]}>
			<div className="img-wrap" title={item.name}>
				<Link to={"/find/playlist/detail?id=" + item.id}>
					<LazyLoad height={140} debounce={500} placeholder={<img src={loadingUrl} />}>
						<img src={item.coverImgUrl} alt="" />
						<span className="mask"></span>
					</LazyLoad>
				</Link>
				<div className="bottom">
					<i className="icon-heard"></i>
					<i className="icon-play" title="播放" onClick={addSongList}></i>
					<span className="play-nums">
						{item.playCount > 10000 ? parseInt(item.playCount / 10000) + '万' : item.playCount}
					</span>
				</div>
			</div>
			<div className="name" onClick={() => {
				history.push("/find/playlist/detail?id=" + item.id)
			}}>{item.name}</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayItem);
