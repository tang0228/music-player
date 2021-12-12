import React, { useEffect, useState, useCallback } from "react";
import { getPlaylist } from "../../../services/apis";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import Category from "./Category";
import { Pagination, Spin } from "@douyinfe/semi-ui";
import "./playlist.less";
import utils from "../../../utils";
import qs from "query-string";

export default function PlayList() {
  const [limit, setLimit] = useState(35); // 页容量
  const [page, setPage] = useState(1); // 页码
  const [list, setList] = useState([]); // 歌单列表
  const [total, setTotal] = useState(0); // 歌单总数
  const [loading, setLoading] = useState(false); // 加载中
  const location = useLocation();
  const cat = qs.parse(location.search).cat || "";
  // 获取歌单
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getPlaylist({
        offset: (page - 1) * limit,
        limit,
        cat,
      });
      if (res.code === 200) {
        // 去重
        const playlists = utils.unique(res.playlists);
        setList(playlists);
        setTotal(res.total);
        setLoading(false);
      }
    })();
    return () => {};
  }, [page, limit, cat]);
  // 页码变化
  const handlePageChange = useCallback((val) => {
    setPage(val);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((val) => {
    setLimit(val);
  }, []);
  // 每一个歌单元素
  const lis = list.map((l) => <Item key={l.id} {...l}></Item>);
  return (
    <div className="playlist-container">
      <Category />
      <ul className="ul-wrapper">{lis}</ul>
      {!loading ? (
        <div className="pagination-wrapper">
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
      ) : null}
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
