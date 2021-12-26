import React from "react";
import style from "./itemNav.module.less";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IconArrowRight } from "@douyinfe/semi-icons";

export default function ItemNav(props) {
  const { navItem, moreLink } = props;
  return (
    <div className={style["item-nav"]}>
      {navItem.link ? (
        <Link className="item-title" to={navItem.link}>
          {navItem.title}
        </Link>
      ) : (
        <div className="item-title">{navItem.title}</div>
      )}

      <div className="item-cat">
        {props.catList
          ? props.catList.map((c, i) => (
              <Link
                key={c.id}
                className="cat-link"
                to={"/find/playlist?cat=" + window.encodeURIComponent(c.name)}
              >
                {i > 0 ? <span className="line">|</span> : null}
                {c.name}
              </Link>
            ))
          : null}
      </div>
      {moreLink ? (
        <div className="item-more">
          <Link className="more-link" to={moreLink}>
            更多
          </Link>
          <IconArrowRight
            size="small"
            style={{
              color: "#C10D0C",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

ItemNav.propTypes = {
  navItem: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }),
  moreLink: PropTypes.string,
};

ItemNav.defaultProps = {
  moreLink: "",
  navItem: {
    title: "",
    link: "",
  },
};
