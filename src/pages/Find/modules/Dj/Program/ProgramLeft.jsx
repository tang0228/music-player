import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import style from "./left.module.less";
import { getProgramDetail } from "../../../../../services/dj";
import { Button, Space } from '@douyinfe/semi-ui';
import {
    IconPlayCircle,
    IconLikeThumb,
    IconForward,
    IconDownload,
    IconComment,
    IconChevronUp,
    IconChevronDown,
} from "@douyinfe/semi-icons";
import utils from "../../../../../utils"

export default function ProgramLeft(props) {
    const { id } = props;
    const [detail, setDetail] = useState(null); // program detail
    const [open, setOpen] = useState(false);
    useEffect(() => {
        getProgramDetail({ id }).then(res => {
            if (res.code === 200) {
                setDetail(res.program);
            }
        })
        return () => {
        }
    }, [])
    return (
        <>
            {detail ? <div className={style['program-left']}>
                <div className="p-info">
                    <div className="img-wrap">
                        <img src={detail.coverUrl} alt="" />
                    </div>
                    <div className="main-detail">
                        <div className="row-1">
                            <i className='icon'></i>
                            <div className="name">{detail.name}</div>
                        </div>
                        <div className="row-2">
                            <i className='icon'></i>
                            <Link to={"/find/djradio/detail?id=" + detail.dj.id} className="name">{detail.dj.brand}</Link>
                            <Button type="tertiary"><i className='icon-sub'></i>订阅({detail.radio.subCount})</Button>
                        </div>
                    </div>
                </div>
                <div className="operates">
                    <Space>
                        <Button icon={<IconPlayCircle />}>播放{utils.formatTime(detail.duration)}</Button>
                        <Button type="tertiary" icon={<IconLikeThumb />}>
                            ({detail.likedCount})
                        </Button>
                        <Button type="tertiary" icon={<IconComment />} onClick={() => {
                            utils.goAnchor("#comment");
                        }}>
                            ({detail.commentCount})
                        </Button>
                        <Button type="tertiary" icon={<IconForward />}>
                            ({detail.shareCount})
                        </Button>
                        <Button type="tertiary" icon={<IconDownload />}>
                            下载
                        </Button>
                    </Space>
                </div>
                <div className="c-info">
                    <span className="cat">{detail.categoryName}</span>
                    <span className="name">{detail.radio.name}&nbsp;&nbsp;第{detail.serialNum}期</span>
                    <span className="time">{utils.formatDate(detail.createTime)}创建</span>
                    <span className="nums">播放：<span style={{ color: '#c20c0c' }}>{detail.listenerCount}</span>次</span>
                </div>
                {
                    detail.description ? <div className="desc">
                        介绍：{open ? detail.description : detail.description.split("\n").splice(0, 5).join("\n") + '...'}
                        <div className="arrow" onClick={() => {
                            setOpen(!open);
                        }}>
                            <span className="text">{open ? '收起' : '展开'}</span>
                            {open ? <IconChevronUp /> : <IconChevronDown />}
                        </div>
                    </div> : null
                }
            </div> : '网络不好......'}
        </>


    )
}
