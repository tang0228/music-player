import React from "react";
import style from "./tableItem.less";
import utils from "../../../../utils";
import { IconPlayCircle, IconPlus, IconFolder, IconForward, IconDownload } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";
export default function TableItem(props) {
  const {item, index} = props;
  return (
    <li className={utils.isEven(index) ? "table-item even" : "table-item"}>
      <div className="play-num bd">
          <span className="num">{index}</span>
          <IconPlayCircle />
      </div>
      <div className="title bd ellipsis-1"><Link to={'/song?id' + item.id}>{item.name}</Link></div>
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
          <Link to={'/artist?id=' + e.id } key={e.id + i}>{i === 0 ? e.name : `/${e.name}`}</Link>
        ))}
      </div>
      <div className="album bd ellipsis-1"><Link to={'/album?id='+item.al.id}>{item.al.name}</Link></div>
    </li>
  );
}
