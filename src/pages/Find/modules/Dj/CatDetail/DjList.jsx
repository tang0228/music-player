import React, { useEffect, useState } from 'react';
import style from "./djList.module.less";
import { getHotDjList } from '../../../../../services/dj';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { IconUser } from "@douyinfe/semi-icons";
import utils from '../../../../../utils';
import {
    Pagination,
    Spin,
} from "@douyinfe/semi-ui";

export default function DjList(props) {
    const id = props.id;
    const [djList, setDjList] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // 获取dj列表
    useEffect(() => {
        setLoading(true);
        getHotDjList({ offset: (page - 1) * 32, cateId: id }).then(res => {
            if (res.code === 200) {
                setDjList(res.djRadios);
                setTotal(res.count);
                setLoading(false);
            }
        })
        return () => {
        }
    }, [id, page]);

    // 页码变化
    const handlePageChange = (page) => {
        setPage(page)
    }
    return (
        <div className={style['dj-list']}>
            <div className="header">电台排行榜</div>
            <ul className="list-wrap">
                {djList && djList.length ? djList.map((d, i) => <li className={utils.isEven(i + 1) ? "list-item" : "list-item mr28"} key={d.id}>
                    <LazyLoad>
                        <Link to={"/find/djradio/detail?id=" + d.id}>
                            <img src={d.picUrl} alt="" />
                        </Link>
                    </LazyLoad>
                    <div className="content">
                        <Link to={"/find/djradio/detail?id=" + d.id} className="name">{d.name}</Link>
                        <div className="user">
                            <IconUser style={{ color: '#ddd' }} />
                            <Link className="nickname" to={"/user/home?uid=" + d.dj.id}>{d.dj.nickname}</Link>
                        </div>
                        <div className="nums">
                            <span className="program-num">共{d.programCount}期</span>
                            <span className="sub-num">订阅{d.subCount}次</span>
                        </div>
                    </div>
                </li>) : null}
            </ul>
            {total > 0 ? (
                <div className="pagination-wrapper">
                    <Pagination
                        total={total}
                        currentPage={page}
                        onPageChange={handlePageChange}
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
        </div>
    )
}
