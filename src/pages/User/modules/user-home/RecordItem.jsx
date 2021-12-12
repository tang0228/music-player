import React from "react";
import "./recordItem.less";
import {
  IconPlayCircle,
  IconPlus,
  IconFolder,
  IconForward,
  IconDownload,
} from "@douyinfe/semi-icons";
import utils from "../../../../utils";
import { Link } from "react-router-dom";

export default function RecordItem(props) {
  const { record, index } = props;
  return (
    <li className={utils.isEven(index) ? "record-item even" : "record-item"}>
      <div className="hd">
        <span className="hd-index">{index}.</span>
        <IconPlayCircle />
      </div>
      <div className="singer">
        <Link to={'/song?id=' + record.song.id} className="music-name">{record.song.name}</Link>
        <span className="divider">-</span>
        <span className="singer-name">
          {record.song.ar.map((a, i) => (
            <Link className="name" to={'/artist?id=' + a.id} key={a.name}>{i === 0 ? a.name : "/" + a.name}</Link>
          ))}
        </span>
      </div>
      <div className="operates">
        <IconPlus />
        <IconFolder />
        <IconForward />
        <IconDownload />
      </div>
      <div className="tops">
        <span
          className="bg"
          style={{
            width: `${record.score}%`,
          }}
        ></span>
        <span className="text">{record.playCount}次</span>
      </div>
    </li>
  );
}
