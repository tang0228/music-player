import React from "react";
import "./tableItem.less";
import utils from "../../../../utils";
import { Toast } from "@douyinfe/semi-ui";
import { IconPlayCircle, IconPlus, IconFolder, IconForward, IconDownload, IconVideo } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import { getMusicPlayUrl } from "../../../../services/apis";
import { connect } from "react-redux";
import { addSongAction } from "../../../../store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";

const mapStateToProps = (state) => {
  return {
    song: state.song
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSong: (...args) => dispatch(addSongAction(...args)),
    setCurSongId: (...args) => dispatch(setCurSongIdAction(...args))
  };
};
function TableItem(props) {
  const { item, index, showAlbum, addSong, setCurSongId } = props;
  // 播放歌曲
  const play = async (id) => {
    const res = await getMusicPlayUrl({ id });
    setCurSongId(id);
    if (res.code === 200 && res.data[0].url) {
      addSong(res.data);
    } else {
      Toast.error({
        content: "无权限",
        duration: 2
      })
    }
  };
  return (
    <li className={utils.isEven(index) ? "table-item even" : "table-item"}>
      <div className="play-num bd">
        <span className="num">{index}</span>
        <IconPlayCircle onClick={() => {
          play(item.id)
        }} />
      </div>
      <div className="title bd ellipsis-1">
        <Link to={'/find/song?id=' + item.id}>{item.name}</Link>
        {item.alia && item.alia.length ?
          <span className="mv-name">-{item.alia.map(a => a)}</span>
          : null}
        {item.mv ? <Link className="mv-play" to={'/find/mv?id=' + item.mv}><IconVideo /></Link> : null}
      </div>
      <div className="duration bd">
        <span className="time">{utils.formatTime(item.dt)}</span>
        <div className="btns">
          <IconPlus />
          <IconFolder />
          <IconForward />
          <IconDownload />
        </div>
      </div>
      <div className="name bd ellipsis-1">
        {item.ar.map((e, i) => (
          <Link to={'/find/artist?id=' + e.id} key={e.id + i}>{i === 0 ? e.name : `/${e.name}`}</Link>
        ))}
      </div>
      {showAlbum ? <div className="album bd ellipsis-1"><Link to={'/find/album?id=' + item.al.id}>{item.al.name}</Link></div> : null}
    </li>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
