import React from "react";
import LazyLoad from "react-lazyload";
import style from "./item.module.less";
import { Link } from "react-router-dom";
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

function Item(props) {
	const { setCurSongId, addSongs } = props;
	// 添加歌单到播放列表
	const addSongList = () => {
		getPlayListDetail({ id: props.id }).then(res => {
			if (res.code === 200) {
				Toast.success({
					content: "成功添加歌单到播放列表",
					duration: 2
				});
				const list = res.playlist.tracks.map(t => ({
					id: t.id,
					url: 'https://music.163.com/song/media/outer/url?id=' + t.id,
					song: t
				}));
				addSongs(list);
				setCurSongId(list[0].id);
			}
		})
	}
	return (
		<li className={style["item-wrapper"]}>
			<div
				className="item-content"
			>
				<LazyLoad height={140} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
					<img src={props.coverImgUrl} alt="" />
				</LazyLoad>
				<Link to={`/find/playlist/detail?id=${props.id}`}>
					<span className="mask"></span>
				</Link>
				<div className="bottom">
					<i className="icon-heard"></i>
					<i className="icon-play" title="播放" onClick={addSongList.bind(null, props.id)}></i>
					<span className="play-nums">
						{parseInt(props.playCount / 10000)}万
					</span>
				</div>

			</div>
			<p className="desc">
				<Link to={`/find/playlist/detail?id=${props.id}`}>{props.description}</Link>
			</p>
			<p className="user">
				<span className="text">by</span>
				<Link className="name" to={`/user/home?uid=${props.creator.userId}`}>{props.creator.nickname}</Link>
			</p>
		</li>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
