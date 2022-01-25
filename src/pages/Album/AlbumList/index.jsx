import React, { useEffect, useState } from 'react';
import style from "./index.module.less";
import { getAlbumList } from '../../../services/album';
import { getAlbumNewest } from "../../../services/apis";
import { Link, useLocation } from "react-router-dom";
import { Pagination, Spin, Toast } from "@douyinfe/semi-ui";
import Item from "./Item";
import qs from "query-string";

const navs = [
    { text: "全部", target: "ALL" },
    { text: "华语", target: "ZH" },
    { text: "欧美", target: "EA" },
    { text: "韩国", target: "KR" },
    { text: "日本", target: "JP" },
];

export default function AlbumList() {
    const [albums, setAlbums] = useState([]); // 新碟
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const location = useLocation();
    let query_area = qs.parse(location.search).area || 'ALL';
    // 获取新碟
    useEffect(() => {
        getAlbumNewest().then(res => {
            if (res.code === 200) {
                setAlbums(res.albums.splice(0, 10));
            }
        }, err => {
            console.log(err, 123)
            Toast.error({
                content: err,
                duration: 2
            })
        })
        return () => {
        }
    }, []);

    // 获取分类光碟列表
    useEffect(() => {
        setLoading(true)
        getAlbumList({
            limit: 35,
            offset: (page - 1) * 35,
            area: query_area,
        }).then(res => {
            if (res.code === 200) {
                setTotal(res.total);
                setList(res.albums);
                setLoading(false);
            }
        }, err => {
            setLoading(false);
            Toast.error({
                content: err,
                duration: 2
            })
        })
        return () => {
        }
    }, [page, query_area]);

    // 页码变化
    const handlePageChange = page => {
        setPage(page);
    }

    return (
        <div className={style['album-list']}>
            <div className="header">
                <div className="title">热门新碟</div>
            </div>
            <div className="album-wrapper">
                {albums ? albums.map(al => <Item key={al.id} {...al} />) : null}
            </div>
            <div className="header">
                <div className="title">全部新碟</div>
                <div className="cat-nav">
                    {navs.map((n, i) => <Link key={n.target} to={"/find/album/list?area=" + n.target} className='item'>{n.text} {i < 4 ? <span className='line'>|</span> : ''}</Link>)}
                </div>
            </div>
            <div className="album-wrapper">
                {list ? list.map(al => <Item key={al.id} {...al} />) : null}
            </div>
            {total > 0 ? (
                <div className="pagination-wrapper">
                    <Pagination
                        total={total}
                        currentPage={page}
                        onPageChange={handlePageChange}
                        pageSize={35}
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
        </div >
    )
}
