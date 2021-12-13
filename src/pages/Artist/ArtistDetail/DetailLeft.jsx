import React, { useCallback, useEffect, useState } from "react";
import style from "./detailLeft.module.less";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import { artistTabs } from "../../../common/tabs";
import {
  getArtistSongs,
  getArtistMv,
  getArtistAlbums,
  getArtistDesc,
} from "../../../services/apis";
import Desc from "./Desc";

export default function DetailLeft(props) {
  const { id } = props;
  const [tab, setTab] = useState("song");
  const [artistDetail, setArtistDetail] = useState(null);
  const [songs, setSongs] = useState([]); // 热门歌曲
  const [albums, setAlbums] = useState([]); // 专辑
  const [mvs, setMvs] = useState([]); // MV
  const [desc, setDesc] = useState(""); // 描述
  const [intro, setIntro] = useState([]); // 介绍

  // 获取歌手MV
  const getMvs = async () => {
    const res = await getArtistMv({ id });
    if(res.code === 200) {
    console.log(res);
        setMvs(res.mvs);
    }
  };
  // 获取歌手专辑
  const getAlbums = async () => {
    const res = await getArtistAlbums({ id });
    if(res.code === 200) {
        setAlbums(res.hotAlbums);
    }
  };
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
    if(res.code === 200) {
        setDesc(res.briefDesc);
        setIntro(res.introduction);
    }
  };
  useEffect(() => {
    (async () => {
      switch (tab) {
        case "song":
          await getDetail();
          break;
        case "album":
          await getAlbums();
          break;
        case "mv":
          await getMvs();
          break;
        case "desc":
          await getDetail();
          await getDesc();
          break;
        default:
          break;
      }
    })();
    return () => {};
  }, [tab]);
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
            {
                tab === 'desc' ? <Desc desc={desc} intro={intro} name={artistDetail.name} /> : null
            }
          </div>
        </div>
      ) : null}
    </>
  );
}
