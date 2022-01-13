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
          <RecommendPlaylist />
          {user ? <PersonRecommend /> : null}
          <NewDisc />
          <TopList />
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
