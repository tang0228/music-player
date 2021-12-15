import React, { useCallback, useEffect, useState } from "react";
import style from "./detailLeft.module.less";
import { Link } from "react-router-dom";
import { getLyric } from "../../../services/apis";
import { Button, Space, Toast, Pagination, Spin } from "@douyinfe/semi-ui";
import {
  IconPlayCircle,
  IconPlus,
  IconForward,
  IconDownload,
  IconComment,
  IconChevronUp,
  IconChevronDown,
} from "@douyinfe/semi-icons";
import { getSongComment } from "../../../services/apis";
import CommitList from "../../Find/modules/playListDetail/CommitList";
import Commit from "../../../components/Commit";
import { comment } from "../../../services/comment";

function DetailLeft(props) {
    const id = props.id; // 歌曲ID
    const [lyric, setLyric] = useState(""); // 歌词
    const [open, setOpen] = useState(false); // 是否展开歌词
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [total, setTotal] = useState(0); // 总评论数
  const [loading, setLoading] = useState(false); // loading
  const detail = props.detail;
  // 获取歌词
  useEffect(() => {
      (async () => {
          const res = await getLyric({
              id
          });
          if(res.code === 200) {
              setLyric(res.lrc.lyric.replace(/\[.*?\]|\x20/g, ''));
          }
      })();
      return () => {
      }
  }, [])
  // 提交评论
  const playListCommit = useCallback(async (val) => {
    const res = await comment({
      t: 1,
      type: 0,
      id,
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
  // 获取评论
  const getComments = async () => {
      setLoading(true)
    const res = await getSongComment({
        id,
        limit,
        offset: (page - 1) * limit,
      });
      if (res.code === 200) {
        setLoading(false);
        setTotal(res.total);
        setComments(res.comments);
        setHotComments(res.hotComments);
      }
  }
  // 获取评论列表
  useEffect(() => {
    (async () => {
      await getComments();
    })();
    return () => {};
  }, [id, limit, page]);
  return (
    <div className={style["detail-left"]}>
      <div className="top-content">
        <div className="img">
            <img src={detail.al.picUrl} alt="" />
        </div>
        <div className="list-content">
          <div className="list-name">{detail.name}</div>
          <div className="sub-name">
              {detail.alia.map((item, index) => <span key={index} className="sub-item">{item}</span>)}
          </div>
          <div className="row">
              <span className="label">歌手：</span>
              <div className="wrap">
                  {detail.ar.map((a, i) => (i === 0 ? <Link key={a.id} className="item" to={'/artist?id=' + a.id}>{a.name}</Link> : 
                    <span key={a.id} className="divider">/<Link className="item" to={'/artist?id=' + a.id}>{a.name}</Link></span>
                ))}
              </div>
          </div>
          <div className="row">
              <span className="label">所属专辑：</span>
              <div className="wrap">
                  <Link className="item" to={'/album?id=' + detail.al.id}>{detail.al.name}</Link>
              </div>
          </div>
          <div className="operates">
            <Space>
              <Button type="danger" icon={<IconPlayCircle />}>播放</Button>
              <Button type="tertiary" icon={<IconPlus />}>收藏</Button>
              <Button type="tertiary" icon={<IconForward />}>分享</Button>
              <Button type="tertiary" icon={<IconDownload />}>下载</Button>
              <Button type="tertiary" icon={<IconComment />}>
                <a className="toComment" href="#comment">
                  ({detail.commentCount})
                </a>
              </Button>
            </Space>
          </div>
          <div className="lyric">{open ? lyric : lyric.split("\n").slice(0, 16).join("\n")}</div>
          <div className="arrow" onClick={() => {
              setOpen(!open);
          }}>
                <span className="text">{open ? '收起' : '展开'}</span>
                {open ? <IconChevronUp /> : <IconChevronDown />}
          </div>
        </div>
      </div>
       <Commit
        commitNum={total}
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
