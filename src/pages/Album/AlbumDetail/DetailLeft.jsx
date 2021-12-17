import React, { useEffect, useState, useCallback } from "react";
import style from "./detailLeft.module.less";
import { getAlbumCommit } from "../../../services/apis";
import { comment } from "../../../services/comment";
import utils from "../../../utils";
import { Link } from "react-router-dom";
import {
  Button,
  Space,
  Empty,
  Toast,
  Pagination,
  Spin,
} from "@douyinfe/semi-ui";
import {
  IconPlayCircle,
  IconPlus,
  IconForward,
  IconDownload,
  IconComment,
  IconChevronUp,
  IconChevronDown,
} from "@douyinfe/semi-icons";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";
import Commit from "../../../components/Commit";
import CommitList from "../../Find/modules/playListDetail/CommitList";
import TableItem from "../../Find/modules/playListDetail/TableItem";

export default function DetailLeft(props) {
  const { id, albumDetail, songs } = props;
  const [open, setOpen] = useState(false); // 是否收起
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [total, setTotal] = useState(0); // 总评论数
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [loading, setLoading] = useState(false); // loading
  //评论专辑
  const albumCommit = useCallback(async (val) => {
    const res = await comment({
        t: 1,
        type: 3,
        content: val,
        id: id
    });
    if (res.code === 200) {
        Toast.success({
          content: "评论成功",
          duration: 2,
        });
        getCommits();
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
  const getCommits = async () => {
    setLoading(true);
    const res = await getAlbumCommit({
      id,
      limit,
      offset: (page - 1) * limit,
      timestamp: Date.now()
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
  }, [id, page, limit]);
  return (
    <div className={style["detail-left"]}>
      {albumDetail ? (
        <>
          <div className="top-content">
            <div className="img">
              <img src={albumDetail.picUrl} alt="" />
            </div>
            <div className="list-content">
              <div className="list-name">{albumDetail.name}</div>
              <div className="sub-name">
                {albumDetail.alias.map((item, index) => (
                  <span key={index} className="sub-item">
                    {item}
                  </span>
                ))}
              </div>
              <div className="row">
                <span className="label">歌手：</span>
                <div className="wrap">
                  {albumDetail.artists.map((a, i) =>
                    i === 0 ? (
                      <Link
                        key={a.id}
                        className="item"
                        to={"/artist?id=" + a.id}
                      >
                        {a.name}
                      </Link>
                    ) : (
                      <span key={a.id} className="divider">
                        /
                        <Link className="item" to={"/artist?id=" + a.id}>
                          {a.name}
                        </Link>
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="row">
                <span className="label">发行时间：</span>
                <div className="wrap">
                  {utils.formatDate(albumDetail.publishTime)}
                </div>
              </div>
              <div className="row">
                <span className="label">发行公司：</span>
                <div className="wrap">{albumDetail.company}</div>
              </div>
              <div className="operates">
                <Space>
                  <Button icon={<IconPlayCircle />}>播放</Button>
                  <Button type="tertiary" icon={<IconPlus />}>
                    收藏
                  </Button>
                  <Button type="tertiary" icon={<IconForward />}>
                    ({albumDetail.info.shareCount})
                  </Button>
                  <Button type="tertiary" icon={<IconDownload />}>
                    下载
                  </Button>
                  <Button type="tertiary" icon={<IconComment />}>
                    <a className="toComment" href="#comment">
                      ({albumDetail.info.commentCount})
                    </a>
                  </Button>
                </Space>
              </div>
            </div>
          </div>
          <div className="desc">
            <h3 className="title">专辑介绍：</h3>
            <p className="content">
              {open
                ? albumDetail.description.split("\n\n").join("\n")
                : albumDetail.description
                    .split("\n\n")
                    .join("\n")
                    .split("\n")
                    .splice(0, 5)
                    .join("\n") + "..."}
            </p>
            <div
              className="arrow"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span className="text">{open ? "收起" : "展开"}</span>
              {open ? <IconChevronUp /> : <IconChevronDown />}
            </div>
          </div>
        </>
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
      <div className="music-list">
        <div className="list-header">
          <h3 className="title">歌曲列表</h3>
          <span className="total">{albumDetail.size}首歌</span>
        </div>
        <ul className="list-wrap">
          <li className="table-header">
            <div className="play-num"></div>
            <div className="title bd">歌曲标题</div>
            <div className="duration bd">时长</div>
            <div className="name bd">歌手</div>
          </li>
          {songs.map((t, i) => (
            <TableItem key={t.id} index={i + 1} item={t} />
          ))}
        </ul>
      </div>
      <Commit commitNum={total} commit={albumCommit} commitLength={140} />
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
