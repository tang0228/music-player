import React, { useEffect, useState } from 'react';
import style from "./right.module.less";
import { getDjProgramById } from '../../../../../services/dj';
import { Link } from "react-router-dom";

export default function ProgramRIght(props) {
    const { id, rid } = props;
    const [list, setList] = useState([]);
    useEffect(() => {
        getDjProgramById({ rid }).then(res => {
            if (res.code === 200) {
                let r = res.programs.filter(p => p.id != id);
                setList(r.splice(0, 5));
            }
        })
        return () => {
        }
    }, [id, rid])
    return (
        <div className={style['program-right']}>
            {list && list.length ? <><div className="list-header">
                <div className="title">更多节目</div>
                <Link className='more' to={"/find/djradio/detail?id=" + rid}>全部&gt;</Link>
            </div>
                <ul className="list-wrap">
                    {list.map(l => <li className='list-item' key={l.id}>
                        <Link to={"/find/djradio/program?id=" + l.id} ><img src={l.coverUrl} alt="" /></Link>
                        <div className="info">
                            <Link to={"/find/djradio/program?id=" + l.id} className="name">{l.name}</Link>
                            <div className="vol">vol.{l.serialNum}</div>
                        </div>
                    </li>)}
                </ul></> : <div className='empty'>暂时没有呢</div>}
        </div>
    )
}
