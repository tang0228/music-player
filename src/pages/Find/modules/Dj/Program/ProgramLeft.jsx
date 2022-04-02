import React, { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import style from "./left.module.less";
import { Button, Space, Spin, Pagination, Toast } from '@douyinfe/semi-ui';
import {
    IconPlayCircle,
    IconLikeThumb,
    IconForward,
    IconDownload,
    IconComment,
    IconChevronUp,
    IconChevronDown,
} from "@douyinfe/semi-icons";
import utils from "../../../../../utils";
import SongList from "./SongList";
import Commit from "../../../../../components/Commit";
import CommitList from "../../../../../components/CommitList/CommitList";
import { comment, likeComment } from "../../../../../services/comment";
import { getDjComments } from "../../../../../services/dj";

export default function ProgramLeft(props) {
    const { id, detail } = props;
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]); // 评论列表
    const [hotComments, setHotComments] = useState([]); // 热门评论列表
    const [page, setPage] = useState(1); // 评论列表
    const [total, setTotal] = useState(0); // 总评论数
    const [loading, setLoading] = useState(false); // loading

    useEffect(() => {
        getComments();
        return () => {
        }
    }, [id, page])

    const getComments = async () => {
        setLoading(true);
        const res = await getDjComments({
            id: id,
            limit: 20,
            offset: (page - 1) * 20,
            timestamp: Date.now(),
        });
        if (res.code === 200) {
            setTotal(res.total);
            setComments(res.comments);
            setHotComments(res.hotComments);
            setLoading(false);
        }
    }

    // 页码变化
    const handlePageChange = (page) => {
        setPage(page)
    };
    // 点赞评论
    const like = useCallback(
        async (cid, liked) => {
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
        },
        [],
    );

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

    const playListCommit = () => {

    }
    return (
        <div className={style['program-left']}>
            <div className="p-info">
                <div className="img-wrap">
                    <img src={detail.coverUrl} alt="" />
                </div>
                <div className="main-detail">
                    <div className="row-1">
                        <i className='icon'></i>
                        <div className="name">{detail.name}</div>
                    </div>
                    <div className="row-2">
                        <i className='icon'></i>
                        <Link to={"/find/djradio/detail?id=" + detail.radio.id} className="name">{detail.dj.brand}</Link>
                        <Button type="tertiary"><i className='icon-sub'></i>订阅({detail.radio.subCount})</Button>
                    </div>
                </div>
            </div>
            <div className="operates">
                <Space>
                    <Button onClick={() => {
                        Toast.warning({
                            content: "暂不支持播放电台",
                        })
                    }} icon={<IconPlayCircle />}>播放{utils.formatTime(detail.duration)}</Button>
                    <Button type="tertiary" icon={<IconLikeThumb />}>
                        ({detail.likedCount})
                    </Button>
                    <Button type="tertiary" icon={<IconComment />} onClick={() => {
                        utils.goAnchor("#comment");
                    }}>
                        ({detail.commentCount})
                    </Button>
                    <Button type="tertiary" icon={<IconForward />}>
                        ({detail.shareCount})
                    </Button>
                    <Button type="tertiary" icon={<IconDownload />}>
                        下载
                    </Button>
                </Space>
            </div>
            <div className="c-info">
                <Link to={'/find/djradio/category?id=' + detail.categoryId} className="cat">{detail.categoryName}</Link>
                <span className="name">{detail.radio.name}&nbsp;&nbsp;第{detail.serialNum}期</span>
                <span className="time">{utils.formatDate(detail.createTime)}创建</span>
                <span className="nums">播放：<span style={{ color: '#c20c0c' }}>{detail.listenerCount}</span>次</span>
            </div>
            {
                detail.description ? <div className="desc">
                    介绍：{open ? detail.description : detail.description.split("\n").splice(0, 5).join("\n") + '...'}
                    <div className="arrow" onClick={() => {
                        setOpen(!open);
                    }}>
                        <span className="text">{open ? '收起' : '展开'}</span>
                        {open ? <IconChevronUp /> : <IconChevronDown />}
                    </div>
                </div> : null
            }
            {detail.songs && detail.songs.length ? <SongList list={detail.songs} /> : null}
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
                        pageSize={20}
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
