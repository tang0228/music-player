import React, { useState, useCallback, useEffect } from "react";
import style from "./mvs.module.less";
import { Pagination, Empty } from "@douyinfe/semi-ui";
import { getArtistMv } from "../../../services/apis";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { IconPlayCircle } from "@douyinfe/semi-icons";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

export default function Mvs(props) {
  const { total, id } = props;
  const [limit, setLimit] = useState(12); // 页容量
  const [page, setPage] = useState(1); // 页码
  const [mvs, setMvs] = useState([]); // mv

  // 获取歌手MV
  const getMvs = async () => {
    const res = await getArtistMv({
      id,
      limit,
      offset: (page - 1) * limit,
    });
    if (res.code === 200) {
      setMvs(res.mvs);
    }
  };
  useEffect(() => {
    (async () => {
      await getMvs();
    })();
    return () => {};
  }, [id, limit, page]);

  // 页码变化
  const handlePageChange = useCallback((val) => {
    setPage(val);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((val) => {
    setLimit(val);
  }, []);
  return (
    <>
      {mvs ? (
        <div className={style["mvs-wrap"]}>
          <div className="mv-content">
            {mvs.map((m) => (
              <div key={m.id} className="mv-item">
                <div className="img-wrap">
                  <LazyLoad>
                    <img src={m.imgurl} alt="" />
                  </LazyLoad>
                  <Link className="mask" to={"/find/mv?id=" + m.id}></Link>
                  <Link className="play" to={"/find/mv?id=" + m.id}>
                    <IconPlayCircle size="extra-large" />
                  </Link>
                </div>
                <Link to={"/find/mv?id=" + m.id} className="name">
                  {m.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="pagination-ontainer">
            <Pagination
              total={total}
              currentPage={page}
              onPageChange={handlePageChange}
              pageSize={limit}
              onPageSizeChange={handleLimitChange}
            ></Pagination>
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
