import React, { useState, useCallback, useEffect } from "react";
import qs from "query-string";
import { useLocation } from "react-router-dom";
import MusicItem from "./modules/MusicItem";
import SingerItem from "./modules/SingerItem";
import AlbumItem from "./modules/AlbumItem";
import { Pagination, Input, Spin, Tabs, TabPane } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
import "./index.less";
import { search } from "../../services/apis";
import tabs from "../../common/tabs";

import LazyLoad from "react-lazyload";

export default function Search() {
  const [limit, setLimit] = useState(35); // 页容量
  const [page, setPage] = useState(1); // 页码
  const [type, setType] = useState("1"); // 搜索类型
  const [loading, setLoading] = useState(false); // 加载中
  const location = useLocation();
  const query = qs.parse(location.search);
  const keywords = query.keywords; // 传递来的关键词
  const [list, setList] = useState([]); // 歌曲列表
  const [total, setTotal] = useState(0); // 歌曲总数
  // 页码变化
  const handlePageChange = useCallback((val) => {
    setPage(val);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((val) => {
    setLimit(val);
  }, []);
  // tab切换
  const tabChange = useCallback((key) => {
    // setType(key);
  }, []);
  // 搜索
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await search({
        keywords,
        limit,
        offset: (page - 1) * limit,
        type,
      });
      if (res.code === 200) {
        switch (type) {
          case "1":
            setList(res.result.songs);
            setTotal(res.result.songCount);
            break;
          case "100":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          case "10":
            setList(res.result.albums);
            setTotal(res.result.albumCount);
            break;
          case "1014":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          case "1006":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          case "1000":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          case "1009":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          case "1002":
            setList(res.result.artists);
            setTotal(res.result.artistCount);
            break;
          default:
            break;
        }
        setLoading(false);
      }
    })();
    return () => {};
  }, [keywords, limit, page, type]);

  const tabpanes = tabs.map((tab) => (
    <TabPane key={tab.key} tab={tab.text} itemKey={tab.key}></TabPane>
  ));
  return (
    <div className="search-container">
      <div className="search-inp">
        <Input
          suffix={<IconSearch />}
          style={{
            width: 420,
            color: "#000",
            border: "1px solid #ddd",
          }}
          size="large"
          showClear
        ></Input>
      </div>
      <div className="search-tabs">
        <Tabs
          type="card"
          onChange={tabChange}
          onTabClick={(key, e) => {
            setType(key);
          }}
        >
          {tabpanes}
        </Tabs>
      </div>
      {type === "1" && list ? <MusicItem songs={list} /> : null}
      {type === "100" && list ? <SingerItem singers={list} /> : null}
      {type === "10" && list ? <AlbumItem albums={list} /> : null}
      <div className="pagination-ontainer">
        <Pagination
          total={total}
          currentPage={page}
          onPageChange={handlePageChange}
          showSizeChanger
          pageSize={limit}
          pageSizeOpts={[15, 35, 70]}
          onPageSizeChange={handleLimitChange}
        ></Pagination>
      </div>
      <Spin
        spinning={loading}
        tip="loading..."
        size="large"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "9999",
        }}
      ></Spin>
    </div>
  );
}
