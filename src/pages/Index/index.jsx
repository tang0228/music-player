import React from "react";
import style from "./index.module.less";
import Banner from "./Modules/Banner";
import RecommendPlaylist from "./Modules/RecommendPlaylist";
import PersonRecommend from "./Modules/PersonRecommend";
import NewDisc from "./Modules/NewDisc";

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
        <div className="right"></div>
      </div>
    </div>
  );
}
