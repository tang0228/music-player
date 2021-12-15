import React, { useEffect, useState, useCallback } from "react";
import style from "./detailLeft.module.less";
import { getAlbum, getAlbumCommit } from "../../../services/apis";
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

export default function DetailLeft(props) {
  const { id } = props;
  const [open, setOpen] = useState(false); // 是否收起
  const [albumDetail, setAlbumDetail] = useState(null); // 专辑内容
  const [songs, setSongs] = useState([]); // 专辑的歌曲
  const [page, setPage] = useState(1); // 评论列表
  const [limit, setLimit] = useState(20); // 页容量
  const [total, setTotal] = useState(0); // 总评论数
  const [comments, setComments] = useState([]); // 评论列表
  const [hotComments, setHotComments] = useState([]); // 热门评论列表
  const [loading, setLoading] = useState(false); // loading
  // 获取专辑相关内容
  useEffect(() => {
    (async () => {
      const res = await getAlbum({ id });
      if (res.code === 200) {
        setAlbumDetail(res.album);
        setSongs(res.songs);
      }
    })();
    return () => {};
  }, [id]);
  //评论专辑
  const albumCommit = useCallback((val) => {}, []);
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
      return () => {
      }
  }, [id, page, limit])
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
    </div>
  );
}
