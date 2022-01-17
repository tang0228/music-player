import React from 'react';
import style from "./program.module.less";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import ProgramLeft from "./ProgramLeft"

export default function Program() {
    const location = useLocation();
    const id = qs.parse(location.search).id || ''; // program id
    return (
        <div className={style['program']}>
            <ProgramLeft id={id} />
        </div>
    )
}
