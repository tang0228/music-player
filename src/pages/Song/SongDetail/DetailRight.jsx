import React, { useEffect, useState } from "react";
import style from "./detailRight.module.less";
import { IconPlay, IconPlus } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import { getSimiPlayList, getSimiSong } from "../../../services/apis";

export default function DetailRight(props) {
	const { id } = props;
	const [simiList, setSimiList] = useState([]); // 相似歌单
	const [simiSongs, setSimiSongs] = useState([]); // 相似歌曲
	// 获取相似歌单
	useEffect(() => {
		(async () => {
			const res = await getSimiPlayList({
				id,
			});
			if (res.code === 200) {
				setSimiList(res.playlists);
			}
		})();
		return () => { };
	}, []);
	// 获取相似歌曲
	useEffect(() => {
		(async () => {
			const res = await getSimiSong({
				id,
			});
			if (res.code === 200) {
				setSimiSongs(res.songs);
			}
		})();
		return () => {
		}
	}, [])
	return (
		<div className={style["detail-right"]}>
			{simiList && simiList.length ? <div className="play-simi">
				<h3 className="title">包含这首歌的歌单</h3>
				<div className="simi-content">
					{simiList.map(l => <div key={l.id} className="simi-item">
						<img src={l.coverImgUrl} alt="" />
						<div className="desc">
							<Link to={'/find/playlist/detail?id=' + l.id} className="sub-title">{l.name}</Link>
							<span className="text">by <Link to={'/user/home?uid=' + l.creator.userId} className="name">{l.creator.nickname}</Link></span>
						</div>
					</div>)}
				</div>
			</div> : null}
			{simiSongs && simiSongs.length ? <div className="play-simi">
				<h3 className="title">相似歌曲</h3>
				<div className="simi-content">
					{simiSongs.map(s => <div className="simi-item song-item" key={s.id}>
						<div className="content">
							<Link to={'/find/song?id=' + s.id} className="song-name">{s.name}</Link>
							<div className="artists">
								{s.artists.map((a, i) => (i === 0 ? <Link className="item" key={a.id} to={'/find/artist?id=' + a.id}>{a.name}</Link> : <span className="divider" key={a.id}>/<Link className="item" to={'/find/artist?id=' + a.id}>{a.name}</Link></span>))}
							</div>
						</div>
						<IconPlay style={{ color: '#999' }} />
						<IconPlus style={{ color: '#999' }} />
					</div>)}
				</div>
			</div> : null}
		</div>
	);
}
