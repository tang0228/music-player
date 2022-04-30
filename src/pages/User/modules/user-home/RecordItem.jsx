import React from "react";
import "./recordItem.less";
import {
	IconPlayCircle,
	IconPlus,
	IconFolder,
	IconForward,
	IconDownload,
} from "@douyinfe/semi-icons";
import utils from "../../../../utils";
import { Link } from "react-router-dom";
import { getMusicPlayUrl } from "../../../../services/apis";
import { connect } from "react-redux";
import { addSongAction } from "../../../../store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";

const mapStateToProps = (state) => {
	return {
		song: state.song,
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		addSong: (...args) => dispatch(addSongAction(...args)),
		setCurSongId: (...args) => dispatch(setCurSongIdAction(...args))
	}
}

function RecordItem(props) {
	const { record, index, addSong, showNum, setCurSongId } = props;
	// 播放歌曲
	const play = async (id) => {
		const res = await getMusicPlayUrl({ id });
		setCurSongId(id);
		if (res.code === 200 && res.data[0].url) {
			addSong(res.data);
		}
	}
	return (
		<li className={utils.isEven(index) ? "record-item even" : "record-item"}>
			<div className="hd">
				<span className="hd-index">{index}.</span>
				<i className="icon-play" onClick={() => {
					play(record.song.id)
				}}></i>
			</div>
			<div className="singer">
				<Link to={'/find/song?id=' + record.song.id} className="music-name">{record.song.name}</Link>
				<span className="divider">-</span>
				<span className="singer-name">
					{record.song.ar.map((a, i) => (
						<Link className="name" to={'/find/artist?id=' + a.id} key={a.name}>{i === 0 ? a.name : "/" + a.name}</Link>
					))}
				</span>
			</div>
			<div className="operates">
				<i className="icon icon-add"></i>
				<i className="icon icon-fav"></i>
				<i className="icon icon-share"></i>
				<i className="icon icon-down"></i>
			</div>
			<div className="tops">
				<span
					className="bg"
					style={{
						width: `${record.score}%`,
					}}
				></span>
				{showNum ? <span className="text">{record.playCount}次</span> : null}
			</div>
		</li>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordItem);
