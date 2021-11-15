import React, { useState, useCallback, useEffect } from "react";
import qs from "query-string";
import { useLocation } from "react-router-dom";
import SearchItem from "./modules/SearchItem";
import { Pagination, Input, Spin, Tabs, TabPane } from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
import "./index.less";
import { search } from "../../services/apis";
import tabs from "../../common/tabs";

export default function Search(props) {
  const [limit, setLimit] = useState(35); // 页容量
  const [page, setPage] = useState(1); // 页码
  const [type, setType] = useState(1); // 搜索类型
  const [loading, setLoading] = useState(false); // 加载中
  const location = useLocation();
  const query = qs.parse(location.search);
  const keywords = query.keywords; // 传递来的关键词
  const [songs, setSongs] = useState([]); // 歌曲列表
  const [total, setTotal] = useState(0); // 歌曲总数
  // 页码变化
  const handlePageChange = useCallback((val) => {
    setPage(val);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((val) => {
    setLimit(val);
  }, []);
  const tabChange = useCallback((key) => {
    setType(key);
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
        setSongs(res.result.songs);
        setTotal(res.result.songCount);
        setLoading(false);
      }
    })();
    return () => {};
  }, [keywords, limit, page, type]);

  const searchItems = songs.map((song, index) => (
    <SearchItem index={index + 1} key={song.id} {...song} />
  ));
  const tabpanes = tabs.map(tab => <TabPane key={tab.key} tab={tab.text} itemKey={tab.key}></TabPane>)
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
        <Tabs type="card" onChange={tabChange}>
          {tabpanes}
        </Tabs>
      </div>
      {searchItems}
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
