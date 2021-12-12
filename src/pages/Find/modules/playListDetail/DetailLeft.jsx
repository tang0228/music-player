import React, { useCallback, useEffect, useState } from "react";
import style from "./detailLeft.module.less";
import { Link } from "react-router-dom";
import { Tag, Button, Space, Toast, Pagination, Spin } from "@douyinfe/semi-ui";
import {
  //   IconPlayCircle,
  IconPlus,
  IconForward,
  IconDownload,
  IconComment,
} from "@douyinfe/semi-icons";
import utils from "../../../../utils";
import TableItem from "./TableItem";
import Commit from "../../../../components/Commit";
import CommitList from "./CommitList";
import { comment } from "../../../../services/comment";
import { getPlayListCommit } from "../../../../services/apis";
function DetailLeft(props) {
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [total, setTotal] = useState(0); // 总评论数
  const [loading, setLoading] = useState(false); // loading
  const detail = props.detail;
  // 提交评论
  const playListCommit = useCallback(async (val) => {
    const res = await comment({
      t: 1,
      type: 2,
      id: props.id,
      content: val,
    });
    if (res.code === 200) {
      Toast.success({
        content: "评论成功",
        duration: 2,
      });
      getComments();
    }
  }, []);
  // 页码变化
  const handlePageChange = useCallback((page) => {
    setPage(page);
  }, []);
  // 页容量变化
  const handleLimitChange = useCallback((limit) => {
    setLimit(limit);
  }, []);
  const getComments = async () => {
    const res = await getPlayListCommit({
        id: props.id,
        limit,
        offset: (page - 1) * limit,
      });
      if (res.code === 200) {
        setTotal(res.total);
        setComments(res.comments);
        setHotComments(res.hotComments);
        setLoading(false);
      }
  }
  // 获取评论列表
  useEffect(() => {
    (async () => {
      await getComments();
    })();
    return () => {};
  }, [props.id, limit, page]);
  return (
    <div className={style["detail-left"]}>
      <div className="top-content">
        <div className="img">
          <Link to={"/user/home?uid=" + detail.creator.userId}>
            <img src={detail.coverImgUrl} alt="" />
          </Link>
        </div>
        <div className="list-content">
          <div className="list-name">{detail.name}</div>
          <div className="create-desc">
            <Link to={"/user/home?uid=" + detail.creator.userId}>
              <img src={detail.creator.avatarUrl} alt="" />
            </Link>
            <Link
              className="nick-name"
              to={"/user/home?uid=" + detail.creator.userId}
            >
              {detail.creator.nickname}
            </Link>
            {detail.creator.avatarDetail &&
            detail.creator.avatarDetail.identityIconUrl ? (
              <img
                className="icon"
                src={detail.creator.avatarDetail.identityIconUrl}
                alt=""
              />
            ) : null}

            <div className="create-time">
              {utils.formatDate(detail.createTime)} 创建
            </div>
          </div>
          <div className="operates">
            <Space>
              {/* <Button icon={<IconPlayCircle />}>播放</Button> */}
              <Button type="tertiary" icon={<IconPlus />}>
                ({detail.subscribedCount})
              </Button>
              <Button type="tertiary" icon={<IconForward />}>
                ({detail.shareCount})
              </Button>
              <Button type="tertiary" icon={<IconDownload />}>
                下载
              </Button>
              <Button type="tertiary" icon={<IconComment />}>
                <a className="toComment" href="#comment">
                  ({detail.commentCount})
                </a>
              </Button>
            </Space>
          </div>
          <div className="tags">
            标签：
            <Space>
              {detail.tags.map((t, i) => (
                <Tag key={i}>
                  <Link className="item" to={"/find/playlist?cat=" + t}>
                    {t}
                  </Link>
                </Tag>
              ))}
            </Space>
          </div>
          <div className="desc">介绍：{detail.description}</div>
        </div>
      </div>
      <div className="music-list">
        <div className="list-header">
          <h3 className="title">歌曲列表</h3>
          <span className="total">{detail.trackCount}首歌</span>
          <span className="play-num">
            播放：<span className="num">{detail.playCount}</span>次
          </span>
        </div>
        <ul className="list-wrap">
          <li className="table-header">
            <div className="play-num"></div>
            <div className="title bd">歌曲标题</div>
            <div className="duration bd">时长</div>
            <div className="name bd">歌手</div>
            <div className="album bd">专辑</div>
          </li>
          {detail.tracks.map((t, i) => (
            <TableItem key={t.id} index={i + 1} item={t} />
          ))}
        </ul>
      </div>
      <Commit
        commitNum={detail.commentCount}
        commit={playListCommit}
        commitLength={140}
      />
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

export default DetailLeft;
