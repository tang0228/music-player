import React, { useEffect, useState } from "react";
import style from "./detailLeft.module.less";
import { Link } from "react-router-dom";
import { getLyric } from "../../../services/apis";
import { Button, Space, Toast, Pagination, Spin } from "@douyinfe/semi-ui";
import {
	IconPlayCircle,
	IconPlus,
	IconForward,
	IconDownload,
	IconComment,
	IconChevronUp,
	IconChevronDown,
} from "@douyinfe/semi-icons";
import { getSongComment, getSongUrl, getMusicPlayUrl } from "../../../services/apis";
import CommitList from "../../../components/CommitList/CommitList";
import Commit from "../../../components/Commit";
import { comment, likeComment } from "../../../services/comment";
import { addSongAction } from "../../../store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
import { connect } from "react-redux";
import utils from "../../../utils";

const mapStateToProps = (state) => {
	return {
		song: state.song
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addSong: (...args) => dispatch(addSongAction(...args)),
		setCurSongId: (...args) => dispatch(setCurSongIdAction(...args))
	};
};

function DetailLeft(props) {
	const { id, addSong, setCurSongId } = props; // 歌曲ID
	const [lyric, setLyric] = useState(""); // 歌词
	const [open, setOpen] = useState(false); // 是否展开歌词
	const [comments, setComments] = useState([]); // 评论列表
	const [hotComments, setHotComments] = useState([]); // 热门评论列表
	const [page, setPage] = useState(1); // 评论列表
	const [limit, setLimit] = useState(20); // 页容量
	const [total, setTotal] = useState(0); // 总评论数
	const [loading, setLoading] = useState(false); // loading
	const detail = props.detail;
	// 获取歌词
	useEffect(() => {
		(async () => {
			const res = await getLyric({
				id
			});
			if (res.code === 200) {
				setLyric(res.lrc.lyric.replace(/\[.*?\]|\x20/g, ''));
			}
		})();
		return () => {
		}
	}, [id])
	// 提交评论
	const songCommit = async (val) => {
		const res = await comment({
			t: 1,
			type: 0,
			id,
			content: val,
			timestamp: Date.now(),
		});
		if (res.code === 200) {
			Toast.success({
				content: "评论成功",
				duration: 2,
			});
			getComments();
		}
	};
	// 页码变化
	const handlePageChange = (page) => {
		setPage(page);
	};
	// 页容量变化
	const handleLimitChange = (limit) => {
		setLimit(limit);
	};
	// 获取评论
	const getComments = async () => {
		setLoading(true)
		const res = await getSongComment({
			id,
			limit,
			offset: (page - 1) * limit,
			timestamp: Date.now(),
		});
		if (res.code === 200) {
			setLoading(false);
			setTotal(res.total);
			setComments(res.comments);
			setHotComments(res.hotComments);
		}
	}
	// 获取评论列表
	useEffect(() => {
		getComments();
		return () => { };
	}, [id, limit, page]);

	// 对评论 点赞/取消
	const like = async (cid, liked) => {
		const res = await likeComment({
			id,
			cid,
			t: liked ? 0 : 1,
			type: 0,
			timestamp: Date.now(),
		});
		if (res.code === 200) {
			if (liked) {
				Toast.success({
					content: "取消赞成功",
					duration: 2,
				})
			} else {
				Toast.success({
					content: "赞成功",
					duration: 2,
				})
			}
			getComments();
		} else {
			Toast.error({
				content: "操作失败",
			})
		}
	};

	// 删除评论
	const del = async (cid) => {
		const res = await comment({
			t: 0,
			type: 0,
			id: id,
			commentId: cid,
			timestamp: Date.now(),
		});
		if (res.code === 200) {
			Toast.success({
				content: "删除成功",
				duration: 2,
			});
			getComments();
		}
	};

	// 播放歌曲
	const play = async () => {
		const res = await getMusicPlayUrl({ id });
		setCurSongId(id);
		if (res.code === 200 && res.data[0].url) {
			addSong(res.data);
		}
	};

	// 下载歌曲
	const download = async () => {
		const res = await getSongUrl({ id });
	};
	return (
		<div className={style["detail-left"]}>
			<div className="top-content">
				<div className="img">
					<img src={detail.al.picUrl} alt="" />
					<span className="img-mask"></span>
				</div>
				<div className="list-content">
					<div className="list-name">
						<i className="icon-song"></i>
						{detail.name}
					</div>
					<div className="sub-name">
						{detail.alia.map((item, index) => <span key={index} className="sub-item">{item}</span>)}
					</div>
					<div className="row">
						<span className="label">歌手：</span>
						<div className="wrap">
							{detail.ar.map((a, i) => (i === 0 ? <Link key={a.id} className="item" to={'/find/artist?id=' + a.id}>{a.name}</Link> :
								<span key={a.id} className="divider">/<Link className="item" to={'/find/artist?id=' + a.id}>{a.name}</Link></span>
							))}
						</div>
					</div>
					<div className="row">
						<span className="label">所属专辑：</span>
						<div className="wrap">
							<Link className="item" to={'/find/album?id=' + detail.al.id}>{detail.al.name}</Link>
						</div>
					</div>
					<div className="operates">
						<Space>
							<Button onClick={play} type="danger" icon={<IconPlayCircle />}>播放</Button>
							<Button type="tertiary" icon={<IconPlus />}>收藏</Button>
							<Button type="tertiary" icon={<IconForward />}>分享</Button>
							<Button onClick={download} type="tertiary" icon={<IconDownload />}>下载</Button>
							<Button type="tertiary" icon={<IconComment />} onClick={() => {
								utils.goAnchor("#comment");
							}}>
								({total})
							</Button>
						</Space>
					</div>
					<div className="lyric">{open ? lyric : lyric.split("\n").slice(0, 16).join("\n")}</div>
					<div className="arrow" onClick={() => {
						setOpen(!open);
					}}>
						<span className="text">{open ? '收起' : '展开'}</span>
						{open ? <IconChevronUp /> : <IconChevronDown />}
					</div>
				</div>
			</div>
			<Commit
				commitNum={total}
				commit={songCommit}
				commitLength={140}
			/>
			<CommitList like={like} del={del} total={total} comments={comments} hotComments={hotComments} />
			{total > 0 ? (
				<div className="pagination-wrapper">
					<Pagination
						total={total}
						currentPage={page}
						onPageChange={handlePageChange}
						showSizeChanger
						pageSize={limit}
						pageSizeOpts={[20, 30, 50]}
						onPageSizeChange={handleLimitChange}
					></Pagination>
				</div>
			) : null}
			<Spin
				spinning={loading}
				tip="loading..."
				size="large"
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: "9999",
				}}
			></Spin>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailLeft);
