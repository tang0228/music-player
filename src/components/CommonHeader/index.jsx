import React, { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import navList from "../../common/navList";
import "./index.less";
import { NavLink, Link } from "react-router-dom";
import { Dropdown, Avatar, Input, Toast } from "@douyinfe/semi-ui";
import {
	IconSearch,
	IconUser,
	IconMailStroked1,
	IconSetting,
	IconQuit,
	IconVerify,
	IconShield,
	IconCrown,
} from "@douyinfe/semi-icons";
import { delUserAction } from "../../store/actions/user";
import { connect } from "react-redux";
import { logout } from "../../services/apis";
import { searchSuggest } from "@/services/search";
import Login from "../Login";
import SubNav from "../SubNav";
import SearchSuggest from "./SearchSuggest";
const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		delUser: (...args) => dispatch(delUserAction(...args)),
	};
};

function CommonHeader(props) {
	const { user, delUser } = props;
	const history = useHistory();
	const location = useLocation();
	let showSubNav = location.pathname.startsWith('/find'); // 路径是否以 /find 开头
	const [keyword, setKeyword] = useState(""); // 搜索的关键词
	const [visible, setVisible] = useState(false);
	const [suggest, setSuggest] = useState(null);
	const [showSS, setShowSS] = useState(false);

	// 点击文档下拉搜索推荐隐藏
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [])

	const handleClick = e => {
		setShowSS(false);
	}

	// 搜索框内容变化时
	const keywordChange = (val) => {
		if (!val) {
			setShowSS(false);
			setKeyword(val);
			return;
		}
		setShowSS(true);
		setKeyword(val);
		getSearchSuggest(val);
	};

	// 获取搜索建议
	const getSearchSuggest = (keywords) => {
		searchSuggest({ keywords }).then(res => {
			if (res.code === 200) {
				setSuggest(res.result);
			}
		})
	}

	const handleFocus = () => {
		if (keyword) {
			setShowSS(true);
		}
	}

	const searchMusic = async () => {
		if (!keyword) {
			Toast.warning({
				content: "请输入 音乐/视频/电台/用户 等关键字",
				duration: 2,
			});
			return;
		}
		history.push(`/search?keywords=${keyword}`);
	};
	//   退出登录
	const handleLogout = async () => {
		const res = await logout();
		if (res.code === 200) {
			history.push("/find"); // 退出登录回到首页
			delUser();
			localStorage.removeItem("user");
			Toast.success({
				content: "退出登录成功，欢迎下次再来",
				duration: 2,
			});
		} else {
			Toast.error({
				content: "操作失败",
				duration: 2,
			});
		}
	};

	const lis = navList.map((nav) => (
		<NavLink to={nav.url} key={nav.url} className="nav-link">
			<li className="nav-item">{nav.text}</li>
		</NavLink>
	));
	return (
		<>
			<div className="nav-wrapper">
				<div className="nav-logo">
					<Link className="logo-text" to="/find">
						Music-Player
					</Link>
				</div>
				<ul className="nav-list">{lis}</ul>
				<div className="nav-search">
					<div onClick={e => {
						e.stopPropagation()
					}}>
						<Input
							style={{
								background: "#fff",
								outline: "none",
							}}
							onEnterPress={searchMusic}
							placeholder="音乐/视频/电台/用户"
							prefix={<IconSearch />}
							value={keyword}
							onChange={keywordChange}
							onFocus={handleFocus}
							showClear
						></Input>
					</div>
					{showSS && suggest ? <div className="search-suggest">
						<SearchSuggest data={suggest} />
					</div> : null}
				</div>
				{user ? (
					<div className="nav-user">
						<Dropdown
							trigger={"hover"}
							position={"bottom"}
							render={
								<Dropdown.Menu>
									<Dropdown.Item icon={<IconUser />}>
										<Link to={`/user/home?uid=${user.userId}`}>我的主页</Link>
									</Dropdown.Item>
									<Dropdown.Item icon={<IconMailStroked1 />}>
										<Link to={`/user/event`}>我的消息</Link>
									</Dropdown.Item>
									<Dropdown.Item icon={<IconCrown />}>
										我的等级
									</Dropdown.Item>
									<Dropdown.Item icon={<IconShield />}>
										VIP会员
									</Dropdown.Item>
									<Dropdown.Item icon={<IconSetting />}>
										个人设置
									</Dropdown.Item>
									<Dropdown.Item icon={<IconVerify />}>
										实名认证
									</Dropdown.Item>
									<Dropdown.Item icon={<IconQuit />} onClick={handleLogout}>
										退出
									</Dropdown.Item>
								</Dropdown.Menu>
							}
						>
							<Avatar src={user.avatarUrl} />
						</Dropdown>
					</div>
				) : (
					<div style={{
						marginLeft: 30,
						cursor: 'pointer'
					}}
						onClick={() => {
							setVisible(true);
						}}
					>
						登录
					</div>
				)}
			</div>
			{showSubNav ? <SubNav /> : <div className="sub-nav"></div>}
			<Login
				visible={visible}
				closeModal={() => {
					setVisible(false);
				}}
			></Login>
		</>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CommonHeader));
