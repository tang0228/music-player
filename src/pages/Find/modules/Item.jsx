import React from "react";
import LazyLoad from "react-lazyload";
import { IconCustomerSupport, IconPlayCircle } from "@douyinfe/semi-icons";
import "./item.less";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";

export default function Item(props) {
	return (
		<li className="item-wrapper">
			<div
				className="item-content"
			><Link to={`/find/playlist/detail?id=${props.id}`}>
					<LazyLoad height={140} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
						<img src={props.coverImgUrl} alt="" />
					</LazyLoad>
					<span className="mask"></span>
					<div className="bottom">
						<IconCustomerSupport />
						<span className="play-nums">
							{parseInt(props.playCount / 10000)}万
						</span>
						<IconPlayCircle />
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
