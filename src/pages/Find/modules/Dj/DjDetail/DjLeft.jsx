import React, { useEffect, useState } from 'react';
import { getDjProgramById } from "../../../../../services/dj";
import style from "./left.module.less";
import { Link } from "react-router-dom";
import { Button, Space, Pagination, Spin } from "@douyinfe/semi-ui";
import { IconPlayCircle, IconForward, IconPlus, IconDownload } from "@douyinfe/semi-icons";
import utils from "../../../../../utils";

export default function DjLeft(props) {
    const { rid, detail } = props;
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // 评论列表

    // 根据 rid 获取电台节目列表
    useEffect(() => {
        setLoading(true);
        getDjProgramById({ rid, offset: (page - 1) * 30 }).then(res => {
            if (res.code === 200) {
                setTotal(res.count);
                setList(res.programs);
                setLoading(false);
            }
        })
        return () => {
        }
    }, [rid, page]);

    // 页码变化
    const handlePageChange = page => {
        setPage(page);
    }
    return (
        <>
            {detail ? <div className={style['dj-left']}>
                <div className="main-info">
                    <div className="img-wrap">
                        <img src={detail.picUrl} alt="" />
                    </div>
                    <div className="info">
                        <div className="row-1">
                            <i className="icon"></i>
                            <div className="name">{detail.name}</div>
                        </div>
                        <div className="row-2">
                            <img src={detail.dj.avatarUrl} alt="" />
                            <Link to={'/user/home?uid=' + detail.dj.id} className="nickname">{detail.dj.nickname}</Link>
                        </div>
                        <div className="row-3">
                            <Space>
                                <Button ><i className='icon-sub'></i>订阅({detail.subCount})</Button>
                                <Button type="tertiary" icon={<IconPlayCircle />}>播放全部</Button>
                                <Button type="tertiary" icon={<IconForward />}>
                                    分享({detail.shareCount})
                                </Button>
                            </Space>
                        </div>
                        <div className="row-4">
                            <Link to={"/find/djradio/category?id=" + detail.categoryId} className="cat">
                                {detail.category}
                            </Link>
                            {detail.desc}
                        </div>
                    </div>
                </div>
                <div className='list-header'>
                    <div className="title">节目列表</div>
                    <div className="nums">共{total}期</div>
                </div>
                <ul className='list-wrap'>
                    {
                        list && list.length ? list.map(l => <li className={utils.isEven(l.serialNum) ? 'list-item even' : 'list-item'} key={l.id}>
                            <div className="col-1">
                                <span className="index">{l.serialNum}</span>
                                <IconPlayCircle />
                            </div>
                            <div className="col-2">
                                <Link to={'/find/djradio/program?id=' + l.id} className="name">{l.name}</Link>
                                <div className="btns">
                                    <IconPlus />
                                    <IconForward />
                                    <IconDownload />
                                </div>
                            </div>
                            <div className="col-3">播放{l.listenerCount > 100000 ? parseInt(l.listenerCount / 10000) + '万' : l.listenerCount}</div>
                            <div className="col-4">赞{l.likedCount}</div>
                            <div className="col-5">{utils.formatDate(l.createTime)}</div>
                            <div className="col-6">{utils.formatTime(l.duration)}</div>
                        </li>) : null
                    }
                </ul>
                {total > 0 ? (
                    <div className="pagination-wrapper">
                        <Pagination
                            total={total}
                            currentPage={page}
                            onPageChange={handlePageChange}
                            pageSize={30}
                        ></Pagination>
                    </div>
                ) : null}
                <Spin
                    spinning={loading}
                    tip="loading..."
                    size="large"
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "9999",
                    }}
                ></Spin>
            </div> : null}
        </>
    )
}
