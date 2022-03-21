import React from "react";
import style from "./playItem.module.less";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import loadingUrl from "@/assets/loading.svg";

export default function PlayItem(props) {
	const item = props.item;
	const history = useHistory();
	return (
		<div className={style["play-item-wrap"]}>
			<div className="img-wrap" title={item.name} onClick={() => {
				history.push("/find/playlist/detail?id=" + item.id)
			}}>
				<LazyLoad height={140} debounce={500} placeholder={<img src={loadingUrl} />}>
					<img src={item.coverImgUrl} alt="" />
					<span className="mask"></span>
				</LazyLoad>
				<div className="bottom">
					<i className="icon-heard"></i>
					<i className="icon-play" title="播放"></i>
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
