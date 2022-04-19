import React from "react";
import utils from "../../../utils";
import {
	IconPlus,
	IconFolder,
	IconForward,
} from "@douyinfe/semi-icons";
import "./playList.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";
import { getPlayListDetail } from "@/services/apis";
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

function PlayList(props) {
	const {playlist, addSongs, setCurSongId} = props;

	// 添加歌单到播放列表
	const addSongList = id => {
		getPlayListDetail({ id }).then(res => {
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

	const items = playlist.map((p, i) => (
		<li
			className={utils.isEven(i + 1) ? "play-item" : "play-item even"}
			key={p.id}
		>
			<i className="list-play" onClick={addSongList.bind(null, p.id)}></i>
			<Link to={"/find/playlist/detail?id=" + p.id} >
				<div className="img-wrap">
					<LazyLoad height={50} debounce={500} placeholder={<img width="50px" height="50px" src={loadingUrl} />}>
						<img className="img" src={p.coverImgUrl} alt="" />
						<span className="mask"></span>
					</LazyLoad>
				</div>
			</Link>
			<Link to={"/find/playlist/detail?id=" + p.id} className="name">
				{p.name}
			</Link>
			<div className="operates">
				<IconPlus />
				<IconFolder />
				<IconForward />
			</div>
			<span className="count">{p.trackCount} 首</span>
			<span className="creator">by <Link className="name" to={'/user/home?uid=' + p.creator.userId}>{p.creator.nickname}</Link></span>
			<span className="book">收藏：{p.bookCount}</span>
			<span className="listens">收听：{parseInt(p.playCount / 10000)}万</span>
		</li>
	));
	return <ul className="playlist-wrap">{items}</ul>;
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
