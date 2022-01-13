import React from 'react';
import PropTypes from "prop-types";
import style from "./listItem.module.less";
import { IconCopyAdd, IconPlayCircle, IconPlus } from "@douyinfe/semi-icons";
import { Link } from "react-router-dom";

export default function ListItem(props) {
    return (
        <div className={style['list-item']}>
            <div className="item-top">
                <Link to={'/find/toplist?id=' + props.id}>
                    <img src={props.imgUrl} alt="" />
                </Link>
                <div className="name">
                    <div className="title"><Link to={'/find/toplist?id=' + props.id}>{props.title}</Link></div>
                    <IconPlayCircle size="extra-large" style={{ color: '#ddd' }} />
                    <IconCopyAdd size="extra-large" style={{ color: '#ddd' }} />
                </div>
            </div>
            <div className="item-bottom">
                {
                    props.list && props.list.length ? props.list.map((l, i) => <li key={l.id} className="row">
                    <span className={i > 2 ? 'index' : 'index top'}>{i+1}</span>
                    <Link to={'/find/song?id=' + l.id} className="name">{l.name}</Link>
                    <div className="operate">
                        <IconPlayCircle />
                        <IconPlus />
                        <IconCopyAdd />
                    </div>
                </li>) : null
                }
                <li className="row">
                    <Link to={'/find/toplist?id=' + props.id} className="all">查看全部&gt;</Link>
                </li>
            </div>
        </div>
    )
}

ListItem.propTypes = {
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.array,
}
