import React, { useEffect, useState } from "react";
import style from "./mvLeft.module.less";
import { Link } from "react-router-dom";
import { IconLikeThumb, IconForward, IconPlus } from "@douyinfe/semi-icons";
import { Button, Space, Spin, Pagination, Toast } from "@douyinfe/semi-ui";
import { getMvNumInfo, getMvCommit } from "../../../services/mv";
import Commit from "../../../components/Commit";
import CommitList from "../../../components/CommitList/CommitList";
import { comment } from "../../../services/comment";

export default function MvLeft(props) {
  const { mvDetail, id } = props;
  const [nums, setNums] = useState({});
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [total, setTotal] = useState(0); // 总评论数
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [loading, setLoading] = useState(false); // loading
  // 获取mv转发点赞数等等
  useEffect(() => {
    (async () => {
      const res = await getMvNumInfo({ mvid: id });
      if (res.code === 200) {
        setNums(res);
      }
    })();
    return () => {};
  }, [id]);

  // 评论
  const mvCommit = async (val) => {
    const res = await comment({
      t: 1,
      type: 1,
      content: val,
      id: id,
    });
    if (res.code === 200) {
      Toast.success({
        content: "评论成功",
        duration: 2,
      });
      getCommits();
    }
  };
  // 页码变化
  const handlePageChange = (page) => {
    setPage(page);
  };
  // 页容量变化
  const handleLimitChange = (limit) => {
    setLimit(limit);
  };

  // 获取mv评论
  const getCommits = async () => {
    setLoading(true);
    const res = await getMvCommit({
      id,
      limit,
      offset: (page - 1) * limit,
      timestamp: Date.now(),
    });
    if (res.code === 200) {
      setLoading(false);
      setTotal(res.total);
      setComments(res.comments);
      setHotComments(res.hotComments);
    }
  };
  useEffect(() => {
    getCommits();
    return () => {};
  }, [id, limit, page]);

  return (
    <div className={style["mv-left"]}>
      <div className="top">
        <div className="top-name">
          <span className="name-icon">MV</span>
          <h3 className="name-mvname">{mvDetail.name}</h3>
          {mvDetail.artists.map((a, i) =>
            i === 0 ? (
              <Link
                key={a.id}
                to={"/artist?id=" + a.id}
                className="name-artist"
              >
                {a.name}
              </Link>
            ) : (
              <Link
                key={a.id}
                to={"/artist?id=" + a.id}
                className="name-artist"
              >
                <span className="divider">/</span>
                {a.name}
              </Link>
            )
          )}
        </div>
        <div className="top-img">
          <img src={mvDetail.cover} alt="" />
          <i className="img-play"></i>
        </div>
        {nums ? (
          <div className="top-btns">
            <Space>
              <Button type="tertiary" icon={<IconLikeThumb />}>
                ({nums.likedCount})
              </Button>
              <Button type="tertiary" icon={<IconPlus />}>
                ({mvDetail.subCount})
              </Button>
              <Button type="tertiary" icon={<IconForward />}>
                ({nums.shareCount})
              </Button>
            </Space>
          </div>
        ) : null}
      </div>
      <Commit commitNum={total} commit={mvCommit} commitLength={140} />
      <CommitList total={total} comments={comments} hotComments={hotComments} />
      {total > 0 ? (
        <div className="pagination-wrapper">
          <Pagination
            total={total}
            currentPage={page}
            onPageChange={handlePageChange}
            showSizeChanger
            pageSize={limit}
            pageSizeOpts={[20, 30, 50]}
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
