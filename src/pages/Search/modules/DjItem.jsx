import React from "react";
import "./djItem.less";
import LazyLoad from "react-lazyload";
import { IconFemale, IconMale } from "@douyinfe/semi-icons";

export default function DjItem(props) {
  const djs = props.djs;
  const items = djs.map((d) => (
    <div key={d.id} className="dj-item">
      <LazyLoad height={200}>
        <img src={d.picUrl} alt="" />
      </LazyLoad>
      <div className="dj-content">
        <p className="desc">{d.desc || '这人很懒，没有介绍'}</p>
        <div className="info">
          by
          <span className="name">{d.name}</span>
          <span className={d.dj.gender === 2 ? "pink" : "blue"}>
            {d.nickname} {d.dj.gender === 2 ? <IconFemale /> : <IconMale />}
          </span>
        </div>
      </div>
    </div>
  ));
  return <div className="dj-container">{items}</div>;
}
