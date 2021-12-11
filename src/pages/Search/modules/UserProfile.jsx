import React from "react";
import utils from "../../../utils";
import { Button } from "@douyinfe/semi-ui";
import { IconPlus, IconFemale, IconMale } from "@douyinfe/semi-icons";
import "./userProfile.less";
import LazyLoad from "react-lazyload";

export default function UserProfile(props) {
  const users = props.users;
  const items = users.map((u, i) => (
    <li
      key={u.userId}
      className={utils.isEven(i + 1) ? "user-item" : "user-item even"}
    >
      <div className="user-info">
        <LazyLoad height={200}>
          <img src={u.avatarUrl} alt="" />
        </LazyLoad>
        <div className="user-desc">
          <span className={u.gender === 2 ? "name pink" : "name blue"}>
            {u.nickname} {u.gender === 2 ? <IconFemale /> : <IconMale />}{" "}
          </span>
          <span className="desc">{u.signature}</span>
        </div>
      </div>
      <div className="btn">
        <Button type="tertiary">
          <IconPlus />
          <span className="add">关注</span>
        </Button>
      </div>
      <div className="playlist">歌单：{u.playlistCount || 0}</div>
      <div className="fans">粉丝：{u.followeds || 0}</div>
    </li>
  ));
  return <ul className="user-container">{items}</ul>;
}
