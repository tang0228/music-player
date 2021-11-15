import React, {useState, useCallback } from "react";
import { withRouter, useHistory } from "react-router-dom";
import navList from "../../common/navList";
import "./index.less";
import { search } from "../../services/apis"

import { NavLink } from "react-router-dom";

import { Dropdown, Avatar, Input, Spin } from "@douyinfe/semi-ui";
import { IconSearch, IconUser, IconMailStroked1, IconSetting, IconQuit, IconVerify, IconShield, IconCrown } from '@douyinfe/semi-icons';

function CommonHeader() {
    const history = useHistory();
    const [keyword, setKeyword] = useState(""); // 搜索的关键词
    const [loading, setLoading] = useState(false); // 是否显示加载中
    const keywordChange = useCallback(
        (val) => {
            setKeyword(val);
        },
        [],
    )

    const searchMusic = useCallback(async () => {
        history.push(`/search?keywords=${keyword}`);
    }, [keyword])
    
  const lis = navList.map((nav) => (
    <NavLink to={nav.url} key={nav.url} className="nav-link">
      <li className="nav-item">{nav.text}</li>
    </NavLink>
  ));
  return (
      <>
        <div className="nav-wrapper">
      <div className="nav-logo">
        <a href="/">网易云音乐</a>
      </div>
      <ul className="nav-list">{lis}</ul>
      <div className="nav-search">
        <Input style={{
            background: "#fff",
            outline: "none",
        }} inputStyle={{
            background: "#fff"
        }} onEnterPress={searchMusic} placeholder="音乐/视频/电台/用户" prefix={<IconSearch />} value={keyword} onChange={keywordChange} showClear></Input>
      </div>
      <div className="nav-user">
        <Dropdown
          trigger={"hover"}
          position={"bottom"}
          render={
            <Dropdown.Menu>
              <Dropdown.Item><IconUser />我的主页</Dropdown.Item>
              <Dropdown.Item><IconMailStroked1 />我的消息</Dropdown.Item>
              <Dropdown.Item><IconCrown />我的等级</Dropdown.Item>
              <Dropdown.Item><IconShield />VIP会员</Dropdown.Item>
              <Dropdown.Item><IconSetting />个人设置</Dropdown.Item>
              <Dropdown.Item><IconVerify />实名认证</Dropdown.Item>
              <Dropdown.Item><IconQuit />退出</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Avatar
            src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
        />
        </Dropdown>
      </div>
    </div>
    <div className="sub-nav"></div>
    <Spin spinning={loading} tip="loading..." size='large' style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
    }} ></Spin>
      </>
  );
};

export default withRouter(CommonHeader);


