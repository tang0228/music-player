import React from 'react';
import style from "./letter.module.less";
import { Link, useLocation } from "react-router-dom";
import qs from "query-string";

const letter = [
    {name: '热门', code: '-1'},
    {name: 'A', code: 'a'},
    {name: 'B', code: 'b'},
    {name: 'C', code: 'c'},
    {name: 'D', code: 'd'},
    {name: 'E', code: 'e'},
    {name: 'F', code: 'f'},
    {name: 'G', code: 'g'},
    {name: 'H', code: 'h'},
    {name: 'I', code: 'i'},
    {name: 'J', code: 'j'},
    {name: 'K', code: 'k'},
    {name: 'L', code: 'l'},
    {name: 'M', code: 'm'},
    {name: 'N', code: 'n'},
    {name: 'O', code: 'o'},
    {name: 'P', code: 'p'},
    {name: 'Q', code: 'q'},
    {name: 'R', code: 'r'},
    {name: 'S', code: 's'},
    {name: 'T', code: 't'},
    {name: 'U', code: 'u'},
    {name: 'V', code: 'v'},
    {name: 'W', code: 'w'},
    {name: 'X', code: 'x'},
    {name: 'Y', code: 'y'},
    {name: 'Z', code: 'z'},
    {name: '其他', code: '0'},
]

export default function LetterNav(props) {
    const location = useLocation();
    let url = location.pathname;
    let obj = qs.parse(location.search);
    delete obj.initial;
    let str = qs.stringify(obj)
    const {initial} = props;
    return (
        <ul className={style['letter']}>
            {letter.map(l => <Link to={`${url}?${str}&initial=${l.code}`} key={l.code}>
                <li className={initial === l.code ? 'item active' : 'item'}>{l.name}</li>
            </Link>)}
        </ul>
    )
}
