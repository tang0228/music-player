import React from "react";
import style from "./index.module.less";
import Banner from "./Modules/Banner";
import RecommendPlaylist from "./Modules/RecommendPlaylist";
import PersonRecommend from "./Modules/PersonRecommend";
import NewDisc from "./Modules/NewDisc";
import UserInfo from "./Modules/UserInfo/UserInfo";
import EntryArtist from "./Modules/EntryArtist/EntryArtist";
import HotDj from "./Modules/HotDj/HotDj";

export default function Index() {
  return (
    <div className={style.main_container}>
      <Banner />
      <div className="content">
        <div className="left">
          <RecommendPlaylist />
          <PersonRecommend />
          <NewDisc />
        </div>
        <div className="right">
          <UserInfo />
          <EntryArtist />
          <HotDj />
        </div>
      </div>
    </div>
  );
}
