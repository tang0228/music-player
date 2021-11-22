import React, { useCallback, useState } from "react";
import "./userUpdate.less";
import { connect } from "react-redux";
import {
  Tabs,
  TabPane,
  Input,
  TextArea,
  RadioGroup,
  Radio,
  DatePicker,
  Button,
  Toast,
} from "@douyinfe/semi-ui";
import { updateUserInfo, getUserDetail } from "../../../../services/apis";
import { addUserAction } from "../../../../store/actions/user";

// 搜索的tabs
const tabs = [
  { text: "基本设置", key: "1" },
  { text: "绑定设置", key: "2" },
  { text: "隐私设置", key: "3" },
];

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (...args) => dispatch(addUserAction(...args)),
  };
};

function UserUpdate(props) {
  const { user, addUser } = props;
  const uid = user.userId;
  const [sex, setSex] = useState(user.gender); // 性别
  const [name, setName] = useState(user.nickname); // 昵称
  const [birth, setBirth] = useState(user.birthday); // 生日
  const [intro, setIntro] = useState(user.signature); // 介绍
  const handleValueChange = useCallback((val) => {
    setName(val);
  }, []);
  const textChange = useCallback((val) => {
    setIntro(val);
  }, []);
  // 切花性别 radio
  const handleRadioChange = useCallback((e) => {
    setSex(e.target.value);
  }, []);
  // 日期改变
  const dateChange = useCallback((date, dateStr) => {
    const time = new Date(dateStr).getTime();
    setBirth(time);
  }, []);
  // 保存
  const save = useCallback(async () => {
    const res = await updateUserInfo({
      gender: sex,
      nickname: name,
      birthday: birth,
      signature: intro,
      city: 330100,
      province: 330000,
    });
    if (res.code === 200) {
      Toast.success({
        content: "保存成功",
        duration: 2,
      });
      const r = await getUserDetail({
        uid,
      });
      if (r.code === 200) {
        // 更新用户信息 本地
        addUser(r.profile);
        localStorage.setItem("user", JSON.stringify(r.profile));
      }
    }
  }, [sex, name, birth, intro, uid]);
  const tabpanes = tabs.map((tab) => (
    <TabPane key={tab.key} tab={tab.text} itemKey={tab.key}></TabPane>
  ));
  return (
    <div className="user-update-container">
      <h2 className="title">个人设置</h2>
      <div className="user-tabs">
        <Tabs type="card" defaultActiveKey="1">
          {tabpanes}
        </Tabs>
      </div>
      <div className="user-box">
        <div className="update-wrap">
          <div className="row">
            <span className="label">昵称:</span>
            <Input value={name} onChange={handleValueChange}></Input>
          </div>
          <div className="row">
            <span className="label">介绍:</span>
            <TextArea
              value={intro}
              maxCount={300}
              showCounter
              onChange={textChange}
            ></TextArea>
          </div>
          <div className="row">
            <span className="label">性别:</span>
            <RadioGroup value={sex} onChange={handleRadioChange}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
              <Radio value={0}>保密</Radio>
            </RadioGroup>
          </div>
          <div className="row">
            <span className="label">生日:</span>
            <DatePicker
              value={birth}
              onChange={dateChange}
              showClear={false}
            ></DatePicker>
          </div>
          <div className="btn-wrap">
            <Button onClick={save}>保存</Button>
          </div>
        </div>
        <div className="user-avatar">
          <img src={user.avatarUrl} alt="" />
          <span className="bg">更换头像</span>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
