import React, {useEffect, useState } from 'react';
import { getPlayListDetail } from "../../../../services/apis"
import TopLeftNav from './TopLeftNav';
import RightContent from './RightContent';
import qs from "query-string";
import { useLocation } from 'react-router-dom';

export default function TopList() {
    const location = useLocation();
    const id = location.search ? qs.parse(location.search).id : '19723756';
    const [listDetail, setListDetail] = useState(null);
    useEffect(() => {
        getPlayListDetail({id}).then(res => {
            if(res.code === 200) {
                setListDetail(res.playlist);
            }
        })
        return () => {
        }
    }, [id])
    return (
        <div className="top-list-container" style={{
            width: 980,
            margin: '0 auto',
            border: '1px solid #ddd',
            display: 'flex',
        }}>
            <TopLeftNav id={id} />
           {listDetail ? <RightContent detail={listDetail} id={id} /> : null }
        </div>
    )
}
