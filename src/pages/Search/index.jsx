import React, { useState, useEffect } from "react";
import qs from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import MusicItem from "./modules/MusicItem";
import SingerItem from "./modules/SingerItem";
import AlbumItem from "./modules/AlbumItem";
import VideoItem from "./modules/VideoItem";
import Words from "./modules/Words";
import PlayList from "./modules/PlayList";
import DjItem from "./modules/DjItem";
import UserProfile from "./modules/UserProfile";
import {
  Pagination,
  Input,
  Spin,
  Tabs,
  TabPane,
  Empty,
  Toast,
} from "@douyinfe/semi-ui";
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
import { IconSearch } from "@douyinfe/semi-icons";
import "./index.less";
import { search } from "../../services/apis";
import { searchTabs } from "../../common/tabs";
import SearchNote from "./modules/SearchNote";

export default function Search() {
  const [limit, setLimit] = useState(35); // 页容量
  const [page, setPage] = useState(1); // 页码
  const [type, setType] = useState("1"); // 搜索类型
  const [loading, setLoading] = useState(false); // 加载中
  const location = useLocation();
  const history = useHistory();
  const query = qs.parse(location.search);
  const keywords = query.keywords; // 传递来的关键词
  const [s, setS] = useState(keywords);
  const [songs, setSongs] = useState([]); // 歌曲列表
  const [singers, setSingers] = useState([]); // 歌手列表
  const [albums, setAlbums] = useState([]); // 专辑列表
  const [videos, setVideos] = useState([]); // 视频列表
  const [words, setWords] = useState([]); // 歌词列表
  const [playlist, setPlaylist] = useState([]); // 歌单列表
  const [djs, setDjs] = useState([]); // 主播列表
  const [users, setUsers] = useState([]); // 用户列表

  const [total, setTotal] = useState(0); // 歌曲总数
  // 页码变化
  const handlePageChange = (val) => {
    setPage(val);
  };
  // 页容量变化
  const handleLimitChange = (val) => {
    setLimit(val);
  };
  // tab切换
  const tabChange = (key) => {
    setType(key);
  };

  const inpSearch = async () => {
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
          setSongs(res.result.songs);
          setTotal(res.result.songCount);
          break;
        case "100":
          setSingers(res.result.artists);
          setTotal(res.result.artistCount);
          break;
        case "10":
          setAlbums(res.result.albums);
          setTotal(res.result.albumCount);
          break;
        case "1014":
          setVideos(res.result.videos);
          setTotal(res.result.videoCount);
          break;
        case "1006":
          setWords(res.result.songs);
          setTotal(res.result.songCount);
          break;
        case "1000":
          setPlaylist(res.result.playlists);
          setTotal(res.result.playlistCount);
          break;
        case "1009":
          setDjs(res.result.djRadios);
          setTotal(res.result.djRadiosCount);
          break;
        case "1002":
          setUsers(res.result.userprofiles);
          setTotal(res.result.userprofileCount);
          break;
        default:
          break;
      }
      setLoading(false);
    }
  }
  // 搜索
  useEffect(() => {
    inpSearch();
    return () => {
    };
  }, [keywords, limit, page, type]);

  const tabpanes = searchTabs.map((tab) => (
    <TabPane key={tab.key} tab={tab.text} itemKey={tab.key}></TabPane>
  ));

  const searchMusic = () => {
    if (!s) {
      Toast.warning({
        content: "请输入 音乐/视频/电台/用户 等关键字",
        duration: 2,
      });
      return;
    }
    history.push(`/search?keywords=${s}`);
  };
  const keywordChange = val => { setS(val) };
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
          value={s}
          size="large"
          showClear
          onEnterPress={searchMusic}
          onChange={keywordChange}
        ></Input>
      </div>
      {<SearchNote keyword={keywords} type={type} total={total || 0} />}
      <div className="search-tabs">
        <Tabs
          type="card"
          onChange={tabChange}
        >
          {tabpanes}
        </Tabs>
      </div>
      {type === "1" && songs ? <MusicItem songs={songs} /> : null}
      {type === "100" && singers ? <SingerItem singers={singers} /> : null}
      {type === "10" && albums ? <AlbumItem albums={albums} /> : null}
      {type === "1014" && videos ? <VideoItem videos={videos} /> : null}
      {type === "1006" && words ? <Words words={words} /> : null}
      {type === "1000" && playlist ? <PlayList playlist={playlist} /> : null}
      {type === "1009" && djs ? <DjItem djs={djs} /> : null}
      {type === "1002" && users ? <UserProfile users={users} /> : null}

      {total > 0 ? (
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
      ) : (
        <Empty
          image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
          darkModeImage={
            <IllustrationNoResultDark style={{ width: 150, height: 150 }} />
          }
          description={"搜索无结果"}
        />
      )}
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
