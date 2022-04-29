import React, { useState, useEffect } from 'react';
import style from "./right.module.less";
import utils from '../../../../utils';
import { Button, Space, Toast, Pagination, Spin } from "@douyinfe/semi-ui";
import {
    IconPlayCircle,
    IconPlus,
    IconForward,
    IconDownload,
    IconComment,
    IconClock,
} from "@douyinfe/semi-icons";
import TableItem from "../playListDetail/TableItem";
import Commit from "../../../../components/Commit";
import CommitList from "../../../../components/CommitList/CommitList";
import { comment, likeComment } from "../../../../services/comment";
import { getPlayListCommit } from "../../../../services/apis";
import { addSongListAction } from "@/store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        curSongId: state.curSongId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurSongId: (...args) => dispatch(setCurSongIdAction(...args)),
        addSongs: (...args) => dispatch(addSongListAction(...args))
    };
};

function RightContent(props) {
    const [comments, setComments] = useState([]); // 评论列表
    const [hotComments, setHotComments] = useState([]); // 热门评论列表
    const [page, setPage] = useState(1); // 评论列表
    const [limit, setLimit] = useState(20); // 页容量
    const [total, setTotal] = useState(0); // 总评论数
    const [loading, setLoading] = useState(false); // loading
    const { detail, id, text, setCurSongId, addSongs } = props;

    // 提交评论
    const playListCommit = async (val) => {
        const res = await comment({
            t: 1,
            type: 2,
            id: id,
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
    const getComments = async () => {
        setLoading(true);
        const res = await getPlayListCommit({
            id: id,
            limit,
            offset: (page - 1) * limit,
            timestamp: Date.now(),
        });
        if (res.code === 200) {
            setTotal(res.total);
            setComments(res.comments);
            setHotComments(res.hotComments);
            setLoading(false);
        }
    }
    // 获取评论列表
    useEffect(() => {
        getComments();
        return () => { };
    }, [id, limit, page]);

    // 点赞评论
    const like = async (cid, liked) => {
        const res = await likeComment({
            id,
            cid,
            t: liked ? 0 : 1,
            type: 2,
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
                content: "操作失败"
            })
        }
    };

    // 删除评论
    const del = async (cid) => {
        const res = await comment({
            t: 0,
            type: 2,
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
    }

    // 添加歌单到播放列表
    const addSongList = id => {
        Toast.success({
            content: "成功添加歌单到播放列表",
            duration: 2
        });
        const list = detail.tracks.map(t => ({
            id: t.id,
            url: 'https://music.163.com/song/media/outer/url?id=' + t.id + '.mp3',
            song: t
        }));
        addSongs(list);
        setCurSongId(list[0].id);
    }

    return (
        <div className={style['right-content']}>
            <div className="top-content">
                <div className="img">
                    <img src={detail.coverImgUrl} alt="" />
                </div>
                <div className="list-content">
                    <div className="list-name">{detail.name}</div>
                    <div className="create-desc">
                        <IconClock />
                        最近更新：
                        {utils.formatDate(detail.updateTime)}
                        （{text}）
                    </div>
                    <div className="operates">
                        <Space>
                            <Button onClick={() => {
                                addSongList();
                            }} icon={<IconPlayCircle />}>播放</Button>
                            <Button type="tertiary" icon={<IconPlus />}>
                                ({detail.subscribedCount})
                            </Button>
                            <Button type="tertiary" icon={<IconForward />}>
                                ({detail.shareCount})
                            </Button>
                            <Button type="tertiary" icon={<IconDownload />}>
                                下载
                            </Button>
                            <Button type="tertiary" icon={<IconComment />} onClick={() => {
                                utils.goAnchor("#comment");
                            }}>
                                ({detail.commentCount})
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
            <div className="music-list">
                <div className="list-header">
                    <h3 className="title">歌曲列表</h3>
                    <span className="total">{detail.trackCount}首歌</span>
                    <span className="play-num">
                        播放：<span className="num">{detail.playCount}</span>次
                    </span>
                </div>
                <ul className="list-wrap">
                    <li className="table-header">
                        <div className="play-num"></div>
                        <div className="title bd">标题</div>
                        <div className="duration bd">时长</div>
                        <div className="name bd">歌手</div>
                    </li>
                    {detail.tracks.map((t, i) => (
                        <TableItem showAlbum={false} key={t.id} index={i + 1} item={t} />
                    ))}
                </ul>
            </div>
            <Commit
                commitNum={detail.commentCount}
                commit={playListCommit}
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
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RightContent);