import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { IconLikeThumb } from "@douyinfe/semi-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

function Item(props) {
  const {c, user} = props;
  return (
    <li className="comment-item" key={c.commentId}>
      <LazyLoad>
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
              {
                  c.user.userId === user.userId ? <span className="del-wrap">
                  <span className="reback" onClick={() => {
                      props.delComment && props.delComment(c.commentId)
                  }}>删除</span>
                  <span className="line">|</span>
                  </span> : null
              }
            <span className={c.liked ? 'like liked' : 'like'} onClick={() => {
                props.commentLike && props.commentLike(c.commentId, c.liked)
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

export default connect(mapStateToProps)(Item);
