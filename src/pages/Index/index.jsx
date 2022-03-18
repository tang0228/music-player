import React from "react";
import style from "./index.module.less";
import Banner from "./Modules/Banner";
import RecommendPlaylist from "./Modules/RecommendPlaylist";
import PersonRecommend from "./Modules/PersonRecommend";
import NewDisc from "./Modules/NewDisc";
import UserInfo from "./Modules/UserInfo/UserInfo";
import EntryArtist from "./Modules/EntryArtist/EntryArtist";
import HotDj from "./Modules/HotDj/HotDj";
import Download from "./Modules/Download/Download";
import TopList from "./Modules/TopList/TopList";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import PlaceHolder from "@/components/Placeholder";

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

function Index(props) {
	const { user } = props;
	return (
		<div className={style.main_container}>
			<Banner />
			<div className="content">
				<div className="left">
					<LazyLoad height={100} debounce={500} once placeholder={<PlaceHolder height="100px" />} >
						<RecommendPlaylist />
					</LazyLoad>
					{user ? <LazyLoad height={100} debounce={500} once placeholder={<PlaceHolder height="100px" />}>
						<PersonRecommend />
					</LazyLoad> : null}
					<LazyLoad height={100} debounce={500} once placeholder={<PlaceHolder height="100px" />}>
						<NewDisc />
					</LazyLoad>
					<LazyLoad height={100} debounce={500} once placeholder={<PlaceHolder height="100px" />} >
						<TopList />
					</LazyLoad>
				</div>
				<div className="right">
					<UserInfo />
					<EntryArtist />
					<HotDj />
					<Download />
				</div>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(Index);
