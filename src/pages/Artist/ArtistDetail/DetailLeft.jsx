import React, { useCallback, useEffect, useState } from "react";
import style from "./detailLeft.module.less";
import { Tabs, TabPane, Empty } from "@douyinfe/semi-ui";
import { artistTabs } from "../../../common/tabs";
import { getArtistSongs, getArtistDesc } from "../../../services/apis";
import Desc from "./Desc";
import Songs from "./Songs";
import Mvs from "./Mvs";
import Albums from "./Albums";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

export default function DetailLeft(props) {
  const { id } = props;
  const [tab, setTab] = useState("song");
  const [artistDetail, setArtistDetail] = useState(null);
  const [songs, setSongs] = useState([]); // 热门歌曲
  const [desc, setDesc] = useState(""); // 描述
  const [intro, setIntro] = useState([]); // 介绍

  // 获取歌手歌曲（个人信息）
  const getDetail = async () => {
    const res = await getArtistSongs({ id });
    if (res.code === 200) {
      setArtistDetail(res.artist);
      setSongs(res.hotSongs);
    }
  };
  // 获取歌手描述
  const getDesc = async () => {
    const res = await getArtistDesc({ id });
    if (res.code === 200) {
      setDesc(res.briefDesc);
      setIntro(res.introduction);
    }
  };
  useEffect(() => {
    (async () => {
      await getDetail();
      switch (tab) {
        case "desc":
          await getDesc();
          break;
        default:
          break;
      }
    })();
    return () => {};
  }, [tab, id]);
  // 切花tab
  const tabChange = useCallback((val) => {
    setTab(val);
  }, []);
  const tabpanes = artistTabs.map((tab) => (
    <TabPane key={tab.key} tab={tab.text} itemKey={tab.key}></TabPane>
  ));
  return (
    <>
      {artistDetail ? (
        <div className={style["detail-left"]}>
          <div className="detail-header">
            <h2 className="name">{artistDetail.name}</h2>
            <h3 className="alias">{artistDetail.alias.map((a) => a)}</h3>
            <div className="nav-wrap">
              <div className="img-wrap">
                <img src={artistDetail.picUrl} alt="" />
              </div>
              <div className="artist-tabs">
                <Tabs type="card" onChange={tabChange}>
                  {tabpanes}
                </Tabs>
              </div>
            </div>
          </div>
          <div className="detail-content">
            {tab === "desc" ? (
              <Desc desc={desc} intro={intro} name={artistDetail.name} />
            ) : null}
            {tab === "song" ? <Songs songs={songs} /> : null}
            {tab === "mv" ? <Mvs total={artistDetail.mvSize} id={id} /> : null}
            {tab === "album" ? (
              <Albums total={artistDetail.albumSize} id={id} />
            ) : null}
          </div>
        </div>
      ) : (
        <Empty
          image={
            <IllustrationConstruction style={{ width: 150, height: 150 }} />
          }
          darkModeImage={
            <IllustrationConstructionDark style={{ width: 150, height: 150 }} />
          }
          description={"信息丢失"}
          style={{ padding: 30 }}
        />
      )}
    </>
  );
}
