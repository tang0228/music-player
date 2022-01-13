import React, { useEffect, useState } from 'react';
import { getPlayListDetail } from "../../../../services/apis";
import ListItem from "./ListItem";
import style from "./topList.module.less";
import ItemNav from "../ItemNav"

async function getList(id, cb) {
    let res = await getPlayListDetail({ id });
    if (res.code === 200) {
        cb(res.playlist.tracks.splice(0, 10))
    } else {
        cb([])
    }
}

export default function TopList() {
    const [upList, setUpList] = useState([]);
    const [newList, setNewList] = useState([]);
    const [meList, setMeList] = useState([]);

    useEffect(() => {
        getList('19723756', setUpList);
        getList('3779629', setNewList);
        getList('2884035', setMeList);
        return () => {
        }
    }, [])
    return (
        <>
            <ItemNav navItem={{
                title: "榜单",
                link: "/find/toplist",
            }} moreLink="/find/toplist"></ItemNav>
            <div className={style['top-list']}>
                <ListItem
                    imgUrl="https://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100"
                    title="飙升榜"
                    list={upList}
                    id="19723756"
                />
                <ListItem
                    imgUrl="https://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100"
                    title="新歌榜"
                    list={newList}
                    id="3779629"
                />
                <ListItem
                    imgUrl="https://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100"
                    title="原创榜"
                    list={meList}
                    id="2884035"
                />
            </div>
        </>
    )
}
