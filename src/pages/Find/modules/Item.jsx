import React from "react";
import LazyLoad from "react-lazyload";
import style from "./item.module.less";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";

export default function Item(props) {
	return (
		<li className={style["item-wrapper"]}>
			<div
				className="item-content"
			><Link to={`/find/playlist/detail?id=${props.id}`}>
					<LazyLoad height={140} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
						<img src={props.coverImgUrl} alt="" />
					</LazyLoad>
					<span className="mask"></span>
					<div className="bottom">
						<i className="icon-heard"></i>
						<i className="icon-play" title="播放"></i>
						<span className="play-nums">
							{parseInt(props.playCount / 10000)}万
						</span>
					</div>
				</Link>
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
