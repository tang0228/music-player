import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import {
  IconChevronDown,
  IconMusic,
  IconGlobeStroke,
  IconCheckList,
  IconHourglass,
  IconLikeHeart,
} from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import "./catSelect.less";

const iconArr = [
  <IconGlobeStroke />,
  <IconCheckList />,
  <IconHourglass />,
  <IconLikeHeart />,
  <IconMusic />,
];

export default function CatSelect(props) {
  const { categories } = props;
  const history = useHistory();
  const location = useLocation();
  const cat = qs.parse(location.search).cat;
  const [showSelect, setShowSelect] = useState(false); // 是否打开下拉框
  const openSelect = useCallback(() => {
    setShowSelect(!showSelect);
  }, [showSelect]);

  const handleCatClick = useCallback(
      (e) => {
          let name = e.target.outerText;
          if(name === "全部风格") {
            props.catChange && props.catChange("");
            history.push(`/find/playlist`)
          } else {
            props.catChange && props.catChange(name);
            history.push(`/find/playlist?cat=${name}`)
          }
      },
      [],
  )

  const items =
    Array.isArray(categories) &&
    categories.map((c, i) => (
      <dl className="select-row" key={c.name}>
        <dt className="title">
          {iconArr[i]}
          <span className="text">{c.name}</span>
        </dt>
        <dd className={"item"}>
          {c.subCat.map((s) => (
            <span key={s.name}>
              <span className={cat === s.name ? 'cat selected' : 'cat'} onClick={handleCatClick}>{s.name}</span>
              <span className="line">|</span>
            </span>
          ))}
        </dd>
      </dl>
    ));
  return (
    <div className="select-wrapper">
      <div className="select-btn" onClick={openSelect}>
        <span className="select-title">选择分类</span>
        <IconChevronDown />
      </div>
      {showSelect ? (
        <div className="select-content">
          <div className="all">
            <Button type="primary" onClick={handleCatClick}>全部风格</Button>
          </div>
          {items}
        </div>
      ) : null}
    </div>
  );
}
