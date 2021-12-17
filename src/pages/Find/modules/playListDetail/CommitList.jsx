import React from "react";
import style from "./commitList.module.less";
import LazyLoad from "react-lazyload";
import { IconLikeThumb } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";

export default function CommitList(props) {
  const { total, comments, hotComments } = props;
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
                <Link to={"/user/home?uid=" + c.user.userId}>
                  <img src={c.user.avatarUrl} alt="" />
                </Link>
              </LazyLoad>
              <div className="comment-desc">
                <p className="comment-content">
                  <Link className="name" to={"/user/home?uid=" + c.user.userId}>
                    {c.user.nickname}
                  </Link>
                  <span className="divider">:</span>
                  <span className="content">{c.content}</span>
                </p>
                <div className="comment-points">
                  <span className="time">{c.timeStr}</span>
                  <div className="operate">
                    <IconLikeThumb />
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
            <h3 className="title">最新评论({total})</h3>
          </li>
          {comments.map((c) => (
            <li className="comment-item" key={c.commentId}>
              <LazyLoad height={200}>
                <Link to={"/user/home?uid=" + c.user.userId}>
                  <img src={c.user.avatarUrl} alt="" />
                </Link>
              </LazyLoad>
              <div className="comment-desc">
                <p className="comment-content">
                  <Link className="name" to={"/user/home?uid=" + c.userId}>
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
                            to={"/user/home?uid=" + be.user.userId}
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
                    <IconLikeThumb />
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
    </div>
  );
}
