import React, { useEffect, useState, useCallback } from "react";
import style from "./commitList.module.less";
import { getPlayListCommit } from "../../../../services/apis";
import LazyLoad from "react-lazyload";
import { IconLikeHeart } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import { Pagination, Spin } from "@douyinfe/semi-ui";

export default function CommitList(props) {
  const id = props.id; // 歌单ID
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [total, setTotal] = useState(0); // 总评论数
  const [loading, setLoading] = useState(false); // loading
  // 获取评论列表
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getPlayListCommit({
        id,
        limit,
        offset: (page - 1) * limit,
      });
      if (res.code === 200) {
        setTotal(res.total);
        setComments(res.comments);
        setHotComments(res.hotComments);
        setLoading(false);
      }
    })();
    return () => {};
  }, [id, limit, page]);
  // 页码变化
  const handlePageChange = useCallback((page) => {
    setPage(page);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((limit) => {
    setLimit(limit);
  }, []);
  return (
    <div className={style["comment-list"]}>
      {hotComments && hotComments.length ? (
        <ul className="comment">
          <li className="header">
            <h3 className="title">精彩评论</h3>
          </li>
          {hotComments.map((c) => (
            <li className="comment-item" key={c.commentId}>
              <LazyLoad height={200}>
                <Link to={"/user/home?id=" + c.userId}>
                  <img src={c.user.avatarUrl} alt="" />
                </Link>
              </LazyLoad>
              <div className="comment-desc">
                <p className="comment-content">
                  <Link className="name" to={"/user/home?id=" + c.userId}>
                    {c.user.nickname}
                  </Link>
                  <span className="divider">:</span>
                  <span className="content">{c.content}</span>
                </p>
                <div className="comment-points">
                  <span className="time">{c.timeStr}</span>
                  <div className="operate">
                    <IconLikeHeart />
                    {c.likedCount ? (
                      <span className="num">({c.likedCount})</span>
                    ) : null}
                    <span className="line">|</span>
                    <span className="reback">回复</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <br />
      <br />
      {comments && comments.length ? (
        <ul className="comment">
          <li className="header">
            <h3 className="title">最新评论</h3>
          </li>
          {comments.map((c) => (
            <li className="comment-item" key={c.commentId}>
              <LazyLoad height={200}>
                <Link to={"/user/home?id=" + c.userId}>
                  <img src={c.user.avatarUrl} alt="" />
                </Link>
              </LazyLoad>
              <div className="comment-desc">
                <p className="comment-content">
                  <Link className="name" to={"/user/home?id=" + c.userId}>
                    {c.user.nickname}
                  </Link>
                  <span className="divider">:</span>
                  <span className="content">{c.content}</span>
                </p>
                {/* 回复评论列表 */}
                {c.beReplied.length
                  ? c.beReplied.map((be) => (
                      <div key={be.beRepliedCommentId} className="beReplied">
                        <p className="comment-content">
                          <Link
                            className="name"
                            to={"/user/home?id=" + be.user.userId}
                          >
                            {be.user.nickname}
                          </Link>
                          <span className="divider">:</span>
                          <span className="content">{be.content}</span>
                        </p>
                      </div>
                    ))
                  : null}
                <div className="comment-points">
                  <span className="time">{c.timeStr}</span>
                  <div className="operate">
                    <IconLikeHeart />
                    {c.likedCount ? (
                      <span className="num">({c.likedCount})</span>
                    ) : null}
                    <span className="line">|</span>
                    <span className="reback">回复</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
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
