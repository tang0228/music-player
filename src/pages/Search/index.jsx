import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "./modules/SearchItem";
import { Pagination } from "@douyinfe/semi-ui";
import "./index.less";

export default function Search() {
  const [limit, setLimit] = useState(35); // 页容量
  const [page, setPage] = useState(1); // 页码
  const location = useLocation();
  const songs = location.state.songs;
  // 页码变化
  const handlePageChange = useCallback(
      (val) => {
          setPage(val);
      },
      [],
  );
  // 页容量变化
  const handleLimitChange = useCallback(
    (val) => {
        setLimit(val);
    },
    [],
)
  const searchItems = songs.map((song, index) => (
    <SearchItem index={index + 1} key={song.id} {...song} />
  ));
  return (
    <div className="search-container">
      {searchItems}
      <div className="pagination-ontainer">
        <Pagination
        //   total={total}
          currentPage={page}
          onPageChange={handlePageChange}
          showSizeChanger
          pageSize={limit}
          pageSizeOpts={[15, 35, 70]}
          onPageSizeChange={handleLimitChange}
        ></Pagination>
      </div>
    </div>
  );
}
