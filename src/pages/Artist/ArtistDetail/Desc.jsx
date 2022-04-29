import React from "react";
import style from "./desc.module.less";
import { Empty } from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

export default function Desc(props) {
  const { desc, intro, name } = props;
  return (
    <>
      {desc ? (
        <div className={style["desc-wrap"]}>
          <h2>
            <i></i>
            {name}简介
          </h2>
          <p className="desc">{desc}</p>
          {intro.map((item, index) => (
            <div key={index} className="intro-item">
              <h2>{item.ti}</h2>
              <p className="txt desc">{item.txt}</p>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          image={
            <IllustrationConstruction style={{ width: 150, height: 150 }} />
          }
          darkModeImage={
            <IllustrationConstructionDark style={{ width: 150, height: 150 }} />
          }
          description={"暂时没有哦"}
          style={{ padding: 30 }}
        />
      )}
    </>
  );
}
