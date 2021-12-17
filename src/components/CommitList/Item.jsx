import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { IconLikeThumb } from "@douyinfe/semi-icons";

export default function Item(props) {
  const c = props.c;
  return (
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
            <span className="like" onClick={() => {
                props.commentLike && props.commentLike(c.commentId)
            }}>
              <IconLikeThumb />
              {c.likedCount ? (
                <span className="num">({c.likedCount})</span>
              ) : null}
            </span>
            <span className="line">|</span>
            <span className="reback">回复</span>
          </div>
        </div>
      </div>
    </li>
  );
}
