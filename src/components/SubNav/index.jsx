import React from "react";
import subNavList from "../../common/subNav";
import { NavLink } from "react-router-dom";
import "./index.less";

export default function SubNav() {
  const lis = subNavList.map((nav) => (
    <NavLink key={nav.url} exact to={nav.url} className="sub-nav-link">
      <li className="sub-nav-item"><em>{nav.text}</em></li>
    </NavLink>
  ));
  return <ul className="sub-nav-container">{lis}</ul>;
}
