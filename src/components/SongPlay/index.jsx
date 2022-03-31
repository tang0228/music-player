import React, { useState } from 'react';
import { connect } from 'react-redux';
import style from "./index.module.less";
import { Link } from "react-router-dom";
import utils from '../../utils';
import { setCurSongIdAction } from "@/store/actions/curSongId";
import SongList from "./SongList";

const mapStateToProps = (state) => {
	return {
		songs: state.songs,
		curSongId: state.curSongId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurSongId: (...args) => dispatch(setCurSongIdAction(...args))
	};
};

function SongPlay(props) {
	const { songs, curSongId, setCurSongId } = props;
	const [isPlay, setIsPlay] = useState(false); // 是否正在播放音乐
	const [showVoiceControl, setShowVoiceControl] = useState(false); // 是否显示控制音量
	const [curHeight, setCurHeight] = useState(93);
	const [dragTop, setDragTop] = useState(0);
	const [curWidth, setCurWidth] = useState(0);
	const [curTime, setCurTime] = useState(0); // 歌曲当前播放的时间
	const [showList, setShowList] = useState(false);

	const playIngSong = songs.find(s => s.id == curSongId) || songs[0];
	// 播放音乐
	const play = () => {
		if (!playIngSong) {
			return;
		}
		const audio = document.getElementById("my-audio");
		audio.autoplay = false;
		if (isPlay) {
			setIsPlay(false);
			audio.pause();
		} else {
			setIsPlay(true);
			audio.play();
		}
	}

	// 点击进度条
	const dragSetCurTime = (width) => {
		const audio = document.getElementById("my-audio");
		audio.currentTime = width / 100 * audio.duration;
	}

	// 调节音量
	const setVoice = (height) => {
		let volume = (height / 93) > 1 ? 1 : (height / 93) < 0 ? 0 : (height / 93);
		const audio = document.getElementById("my-audio");
		audio.volume = volume;
	}

	// 上一首
	const prev = () => {
		if (songs.length === 1) {
			return false;
		}
		const curIndex = songs && songs.findIndex(s => s.id === playIngSong.id);
		let prevIndex = curIndex - 1 < 0 ? songs.length - 1 : curIndex - 1;
		setCurWidth(0); // 进度条重置为0
		setCurSongId(songs[prevIndex].id);
		if (isPlay) {
			const audio = document.getElementById("my-audio");
			audio.autoplay = true;
		}
	}
	// 下一首
	const next = () => {
		if (songs.length === 1) {
			return false;
		}
		const curIndex = songs && songs.findIndex(s => s.id === playIngSong.id);
		let nextIndex = curIndex + 1 > songs.length - 1 ? 0 : curIndex + 1;
		setCurWidth(0);
		setCurSongId(songs[nextIndex].id);
		if (isPlay) {
			const audio = document.getElementById("my-audio");
			audio.autoplay = true;
		}
	}
	return (
		<div className={style["b-bottom"]}>
			<div className='song-play'>
				<div className="song-lock">
					<div className="left">
						<i className="icon-lock"></i>
					</div>
					<div className="right"></div>
				</div>
				<div className="bg"></div>
				<div className="hand"></div>
				<div className="song-content">
					<div className="left">
						<i className='icon icon-prev' title='上一首' onClick={prev}>下一首</i>
						<i className={isPlay ? 'icon icon-play' : 'icon icon-pause'} title='暂停或播放' onClick={play}>暂停或播放</i>
						<i className="icon icon-next" title='下一首' onClick={next}>下一首</i>
					</div>
					<div className="center">
						<div className="song-info">
							<div className="img-wrap">
								<img src={playIngSong ? playIngSong.song.al.picUrl : 'https://s4.music.126.net/style/web2/img/default/default_album.jpg'} alt="" />
								<Link to={"/find/song?id=" + curSongId} className="mask"></Link>
							</div>
							<div className="song-detail">
								{playIngSong ? <>
									<Link to={"/find/song?id=" + curSongId} className="song-name">{songs.length && playIngSong.song.name}</Link>
									{playIngSong.song.mv ? <Link to={"/find/mv?id=" + playIngSong.song.mv} className='icon-mv'></Link> : null}
									<Link to={"/find/artist?id=" + playIngSong.song.ar[0].id} className="song-artist">{songs.length && playIngSong.song.ar[0].name}</Link>

								</> :
									<><Link to="/" className="song-name"></Link>
										<Link to="/" className="song-artist"></Link></>
								}
								<div className="progress" onClick={(e) => {
									let clickX = e.clientX;
									let rect = document.querySelector('.song-detail .progress').getBoundingClientRect();
									let curLeft = rect.left;
									let width = rect.width;
									let endCurWidth = (clickX - curLeft) / width * 100 > 100 ? 100 : (clickX - curLeft) / width * 100;
									setCurWidth(endCurWidth);
									dragSetCurTime(endCurWidth);
								}}>
									<div className="rdy"></div>
									<div className="cur" style={{ width: `${curWidth}%` }}>
										<span className="icon-drag"></span>
									</div>
								</div>
							</div>
							{playIngSong ? <div className="song-time">
								<em>{utils.formatTime(Math.floor(curTime) * 1000)}</em>
								/ {songs.length && utils.formatTime(playIngSong.song.dt)}
							</div> : null}
						</div>
					</div>
					<div className="right">
						<i className="icon icon-draw" title='画中画歌词'>画中画歌词</i>
						<i className="icon icon-fold" title="收藏">收藏</i>
						<i className="icon icon-share" title="分享">分享</i>
						<div className="bar">
							<div className="voice-control" style={{
								visibility: showVoiceControl ? 'visible' : 'hidden'
							}}>
								<div className="bg"></div>
								<div className="vbg" onClick={(e) => {
									let clickY = e.clientY;
									let rect = document.querySelector('.vbg').getBoundingClientRect();
									let curTop = rect.top;
									let endCurHeignt = curTop + rect.height - clickY - 4;
									setCurHeight(endCurHeignt > 93 ? 93 : endCurHeignt);
									setDragTop(93 - endCurHeignt < 0 ? 0 : 93 - endCurHeignt > 85 ? 85 : 93 - endCurHeignt);
									setVoice(endCurHeignt);
								}}>
									<div className="voice-cur" style={{ height: curHeight }}></div>
									<div className="voice-drag" style={{ top: dragTop }}></div>
								</div>
							</div>
							<i className="icon icon-voice" onClick={() => {
								setShowVoiceControl(!showVoiceControl)
							}}></i>
							<i className="icon icon-one"></i>
							<i className="icon icon-list" onClick={() => {
								setShowList(!showList)
							}}>{songs.length}</i>
							{showList ? <SongList onClose={() => {
								setShowList(false);
							}} songs={songs} curSong={playIngSong} curSongId={curSongId} /> : null}
						</div>
					</div>
				</div>
				{songs.length ? <audio id="my-audio" src={playIngSong.url} onTimeUpdate={() => {
					const audio = document.getElementById('my-audio');
					setCurTime(audio.currentTime);
					setCurWidth(audio.currentTime / audio.duration * 100);
				}} onEnded={() => {
					console.log(123)
					setIsPlay(false);
				}}></audio> : null}

			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPlay);