import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import style from "./index.module.less";
import { Link } from "react-router-dom";
import utils from '../../utils';
import { setCurSongIdAction } from "@/store/actions/curSongId";
import { deleteOneSongAction, deleteAllSongAction } from '../../store/actions/song';
import { setVolumnAndTypeAction } from '../../store/actions/volumn';
import SongList from "./SongList";

const mapStateToProps = (state) => {
	return {
		songs: state.songs,
		curSongId: state.curSongId,
		volAndType: state.volAndType
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurSongId: (...args) => dispatch(setCurSongIdAction(...args)),
		setVolAndType: (...args) => dispatch(setVolumnAndTypeAction(...args)),
		delOneSong: (...args) => dispatch(deleteOneSongAction(...args)),
		delAllSong: (...args) => dispatch(deleteAllSongAction(...args)),
	};
};

let flag = 1;

function SongPlay(props) {
	const { songs, curSongId, setCurSongId, volAndType, setVolAndType, delOneSong, delAllSong } = props;
	const [isPlay, setIsPlay] = useState(false); // 是否正在播放音乐
	const [showVoiceControl, setShowVoiceControl] = useState(false); // 是否显示控制音量
	const [curHeight, setCurHeight] = useState(93);
	const [dragTop, setDragTop] = useState(0);
	const [curWidth, setCurWidth] = useState(0);
	const [curTime, setCurTime] = useState(0); // 歌曲当前播放的时间
	const [showList, setShowList] = useState(false);
	let [playType, setPlayType] = useState(0); // 0:单曲循环；1：随机播放；2：顺序播放

	const playIngSong = songs.find(s => s.id == curSongId) || songs[0];
	useEffect(() => {
		if (!songs.length) {
			return false;
		}
		const audio = document.getElementById("my-audio");
		let rect = document.querySelector('.vbg').getBoundingClientRect();
		setCurHeight(parseInt(rect.height * volAndType.vol) > 93 ? 93 : parseInt(rect.height * volAndType.vol));
		setDragTop(93 - parseInt(rect.height * volAndType.vol));
		audio.volume = volAndType.vol;
		setPlayType(volAndType.type);
		return () => {
		}
	}, [volAndType, showVoiceControl])

	useEffect(() => {
		++flag;
		if (flag === 2) {
			return;
		}
		setIsPlay(true);
		return () => {
		}
	}, [curSongId])



	// 播放音乐
	const play = () => {
		if (!playIngSong) {
			return;
		}
		setIsPlay(!isPlay);
		const audio = document.getElementById("my-audio");
		// audio.autoplay = false;
		if (isPlay) {
			audio.pause();
		} else {
			audio.play();
		}
	}

	// 点击进度条
	const dragSetCurTime = (width) => {
		if (!playIngSong) {
			return false;
		}
		const audio = document.getElementById("my-audio");
		audio.currentTime = width / 100 * audio.duration;
	}

	// 调节音量
	const setVoice = (height) => {
		let volume = (height / 93) > 1 ? 1 : (height / 93) < 0 ? 0 : (height / 93);
		setVolAndType({
			vol: volume,
		})
	}

	// 歌曲播放完
	const songEnded = () => {
		if (playType === 0) { // 单曲播放
		} else if (playType === 1) { // 随机播放
			let index = utils.getRandomIntNumber(0, songs.length - 1);
			setCurSongId(songs[index].id);
		} else { // 顺序播放
			next();
		}
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
	// 播放类型的文本
	const getPlayTypeText = (val) => {
		switch (val) {
			case 0:
				return "单曲循环"
			case 1:
				return "随机"
			case 2:
				return "循环"
			default:
				break;
		}
	}
	return (
		<div className={style["b-bottom"]}>
			<div className='song-play'>
				{/* <div className="song-lock">
					<div className="left">
						<i className="icon-lock"></i>
					</div>
					<div className="right"></div>
				</div> */}
				<div className="bg"></div>
				{/* <div className="hand"></div> */}
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
									<span className="song-artist">
										{playIngSong && playIngSong.song.ar.map((a, i) => (
											<Link key={a.id} to={"/find/artist?id=" + a.id}>{i === 0 ? '' : '/'}{a.name}</Link>
										))}
									</span>
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
						<i className="icon icon-draw" title='画中画歌词' onClick={() => {
							const audio = document.getElementById("my-audio");
							audio.requestPictureInPicture().then(res => {
								console.log(res)
							})
						}}>画中画歌词</i>
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
							<i title={getPlayTypeText(playType)} className={playType === 0 ? "icon icon-one" : playType === 1 ? "icon icon-random" : "icon icon-loop"} onClick={() => {
								setVolAndType({
									type: ++playType % 3,
								})
							}}></i>
							<i title='播放列表' className="icon icon-list" onClick={() => {
								setShowList(!showList)
							}}>{songs.length}</i>
							{showList ? <SongList onClose={() => {
								setShowList(false);
							}} songs={songs} curSong={playIngSong} curSongId={curSongId} itemClickPlay={(id) => {
								setCurSongId(id);
							}} deleteOneSong={(id) => {
								if (curSongId === id) {
									let delIndex = songs.findIndex(s => s.id === id);
									let nenxtId = songs[++delIndex % songs.length].id;
									setCurSongId(nenxtId);
								}
								delOneSong(id);
							}} deleteAllSong={() => {
								delAllSong();
							}} /> : null}
						</div>
					</div>
				</div>
				{songs.length ? <audio id="my-audio" src={playIngSong.url} loop={volAndType.type === 0} onTimeUpdate={() => {
					const audio = document.getElementById('my-audio');
					setCurTime(audio.currentTime);
					setCurWidth(audio.currentTime / audio.duration * 100);
				}} onEnded={songEnded}></audio> : null}

			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPlay);