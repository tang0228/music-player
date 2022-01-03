import React, { useEffect, useState } from "react";
import { getPersonalized, getHotPlayList } from "../../../services/apis";
import style from "./recommendPlaylist.module.less";
import ItemNav from "./ItemNav";
import HotItem from "./HotItem";
import { Spin } from "@douyinfe/semi-ui";

export default function RecommendPlaylist() {
  const [hotTags, setHotTags] = useState([]); // 热门歌单分类
  const [list, setList] = useState([]); // 推荐歌单
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getPersonalized({ limit: 8 });
      if (res.code === 200) {
        setList(res.result);
      }
      getHotPlayList().then((res) => {
        if (res.code === 200) {
          setLoading(false);
          setHotTags(res.tags.splice(0, 5));
        }
      });
    })();
    return () => {};
  }, []);
  return (
    <div className={style["recommend-playlist"]}>
      <ItemNav
        navItem={{
          title: "热门推荐",
          link: "/find/playlist",
        }}
        moreLink="/find/playlist"
        catList={hotTags}
      ></ItemNav>
      <ul className="list-content">
        {list ? (
          list.map((l) => <HotItem key={l.id} {...l}></HotItem>)
        ) : (
          <div
            style={{
              position: "relative",
              height: 408,
              width: "100%",
            }}
          >
            <Spin
              spinning={loading}
              tip="loading..."
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "99999",
              }}
            />
          </div>
        )}
      </ul>
    </div>
  );
}
