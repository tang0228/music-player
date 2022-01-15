import React from 'react';
import style from "./header.module.less";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export default function Header(props) {
    return (
        <div className={style['header-wrap']}>
            <Link className="title" to={props.url}>{props.title}</Link>
            <Link className="more" to={props.url}>更多&gt;</Link>
        </div>
    )
};

Header.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
}
