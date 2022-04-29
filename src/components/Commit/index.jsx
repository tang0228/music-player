import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./index.module.less";
import { TextArea, Button, Toast } from "@douyinfe/semi-ui";
import Picker from "emoji-picker-react";
import { connect } from "react-redux";
import { IconImage } from "@douyinfe/semi-icons";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function Commit(props) {
  const user = props.user;
  const [showEmoji, setShowEmoji] = useState(false);
  const [commitText, setCommitText] = useState("");// 评论内容
  const onEmojiClick = (e, emo) => {
    //   setEmoText(emo.emoji);
    //   setCommitText(emo.names[0] + commitText);
  };
  const handleValueChange = (val) => {
    setCommitText(val);
  }
  const showEmojiSelect = () => {
    setShowEmoji(!showEmoji);
  };
  const commit = () => {
      if(!commitText) {
        Toast.warning({
            content: "请先输入内容哦😊",
            duration: 2
        });
        return;
      }
    // 回传给父组件
      setCommitText(""); // 输入框清空
      props.commit && props.commit(commitText)
  }
  return (
    <div className={style.commit} id="comment">
      <div className="commit-header">
        <h3 className="title">评论</h3>
        <span className="nums">共{props.commitNum}条评论</span>
      </div>
      <div className="commit-wrap">
        <img src={user ? user.avatarUrl : 'http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50'} alt="" />
        <div className="commit-content">
          <TextArea placeholder="评论" value={commitText} onChange={handleValueChange} maxCount={props.commitLength}></TextArea>
          <div className="commit-opearte">
            <IconImage onClick={showEmojiSelect} />
            <Button onClick={commit}>评论</Button>
          </div>
          {showEmoji ? (
            <div className="emoji-box">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

Commit.propTypes = {
  commitNum: PropTypes.number, // 评论数量
  commitLength: PropTypes.number, // 评论内容限制长度
};

export default connect(mapStateToProps)(Commit);
