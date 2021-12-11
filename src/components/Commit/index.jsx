import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import style from "./index.module.less";
import { TextArea, Button } from "@douyinfe/semi-ui";
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
//   const [emoText, setEmoText] = useState(""); // 选择的emoji
  const onEmojiClick = useCallback((e, emo) => {
    //   setEmoText(emo.emoji);
    //   setCommitText(emo.names[0] + commitText);
  }, []);
  const handleValueChange = (val) => {
    setCommitText(val);
  }
  const showEmojiSelect = () => {
    setShowEmoji(!showEmoji);
  };
  const commit = () => {
    // 回传给父组件
      props.commit && props.commit(commitText)
  }
  return (
    <div className={style.commit} id="comment">
      <div className="commit-header">
        <h3 className="title">评论</h3>
        <span className="nums">共{props.commitNum}条评论</span>
      </div>
      <div className="commit-wrap">
        <img src={user.avatarUrl} alt="" />
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
