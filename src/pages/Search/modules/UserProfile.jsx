import React from "react";
import utils from "../../../utils";
import { Button } from "@douyinfe/semi-ui";
import { IconPlus, IconFemale, IconMale } from "@douyinfe/semi-icons";
import "./userProfile.less";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";

export default function UserProfile(props) {
	const users = props.users;
	const items = users.map((u, i) => (
		<li
			key={u.userId}
			className={utils.isEven(i + 1) ? "user-item" : "user-item even"}
		>
			<div className="user-info">
				<Link to={"/user/home?uid=" + u.userId}>
					<div className="img-wrap">
						<LazyLoad height={50} debounce={500} placeholder={<img width="100%" height="100%" src={loadingUrl} />}>
							<img src={u.avatarUrl} alt="" />
							<span className="mask"></span>
						</LazyLoad>
					</div>
				</Link>
				<div className="user-desc">
					<span className={u.gender === 2 ? "name pink" : "name blue"}>
						<Link to={"/user/home?uid=" + u.userId}>{u.nickname} </Link>{" "}
						{u.gender === 2 ? <IconFemale /> : <IconMale />}{" "}
					</span>
					<span className="desc">{u.signature}</span>
				</div>
			</div>
			<div className="btn">
				<Button type="tertiary">
					<IconPlus />
					<span className="add">关注</span>
				</Button>
			</div>
			<div className="playlist">歌单：{u.playlistCount || 0}</div>
			<div className="fans">粉丝：{u.followeds || 0}</div>
		</li>
	));
	return <ul className="user-container">{items}</ul>;
}
