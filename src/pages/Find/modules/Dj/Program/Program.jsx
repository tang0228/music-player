import React, { useEffect, useState } from 'react';
import style from "./program.module.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import ProgramLeft from "./ProgramLeft";
import ProgramRight from "./ProgramRight";
import { getProgramDetail } from "../../../../../services/dj";

export default function Program() {
    const location = useLocation();
    const id = qs.parse(location.search).id || ''; // program id
    const [detail, setDetail] = useState(null); // program detail

    // 获取 节目详情
    useEffect(() => {
        getProgramDetail({ id }).then(res => {
            if (res.code === 200) {
                setDetail(res.program);
            }
        })
        return () => {
        }
    }, [id]);
    return (
        <div className={style['program']}>
            {detail ? <>
                <ProgramLeft id={id} detail={detail} />
                <ProgramRight id={id} rid={detail.radio.id} />
            </> : null}
        </div>
    )
}
