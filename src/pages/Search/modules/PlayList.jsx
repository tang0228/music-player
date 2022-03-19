import React from "react";
import utils from "../../../utils";
import {
	IconPlayCircle,
	IconPlus,
	IconFolder,
	IconForward,
} from "@douyinfe/semi-icons";
import "./playList.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";

export default function PlayList(props) {
	const playlist = props.playlist;
	const items = playlist.map((p, i) => (
		<li
			className={utils.isEven(i + 1) ? "play-item" : "play-item even"}
			key={p.id}
		>
			<IconPlayCircle />
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
