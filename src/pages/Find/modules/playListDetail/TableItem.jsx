import React from "react";
import "./tableItem.less";
import utils from "../../../../utils";
import { IconPlayCircle, IconPlus, IconFolder, IconForward, IconDownload } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
import { getMusicPlayUrl } from "../../../../services/apis";
import { connect } from "react-redux";
import { addSongAction } from "../../../../store/actions/song";

const mapStateToProps = (state) => {
    return {
        song: state.song
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
      addSong: (...args) => dispatch(addSongAction(...args)),
    };
  };
function TableItem(props) {
  const {item, index, showAlbum, addSong} = props;
  // 播放歌曲
  const play = async (id) => {
    const res = await getMusicPlayUrl({id});
    if(res.code === 200) {
        addSong(res.data[0].url);
        localStorage.setItem("song_url", JSON.stringify(res.data[0].url));
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
      <div className="title bd ellipsis-1"><Link to={'/find/song?id=' + item.id}>{item.name}</Link></div>
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
          <Link to={'/find/artist?id=' + e.id } key={e.id + i}>{i === 0 ? e.name : `/${e.name}`}</Link>
        ))}
      </div>
      {showAlbum ? <div className="album bd ellipsis-1"><Link to={'/find/album?id='+item.al.id}>{item.al.name}</Link></div> : null}
    </li>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
