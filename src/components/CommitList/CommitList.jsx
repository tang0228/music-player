import React from "react";
import style from "./commitList.module.less";
import Item from "./Item"

export default function CommitList(props) {
  const { total, comments, hotComments } = props;
  const commentLike = (cid) => {
      props.like && props.like(cid);
  }
  return (
    <div className={style["comment-list"]}>
      {hotComments && hotComments.length ? (
        <ul className="comment">
          <li className="header">
            <h3 className="title">精彩评论</h3>
          </li>
          {hotComments.map((c) => (
            <Item commentLike={commentLike} key={c.commentId} c={c}></Item>
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
            <Item commentLike={commentLike} key={c.commentId} c={c}></Item>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
