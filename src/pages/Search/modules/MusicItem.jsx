import React, {useCallback} from 'react';
import {IconPlayCircle, IconDownload, IconFolder, IconPlus, IconForward } from "@douyinfe/semi-icons"
// import { Modal, Button, Form, Row, Toast } from '@douyinfe/semi-ui';
import "./musicItem.less";
import utils from '../../../utils';
import { getMusicPlayUrl, checkMusic } from "../../../services/apis";
import { Link } from "react-router-dom";

export default function MusicItem(props) {
    const checkCanPlay = useCallback(
        async (id) => {
            const res = await checkMusic({
                id
            });
            return res;
        },
        [],
    )
    const playMusic = useCallback(
        async (id) => {
            const canPlay = await checkCanPlay(id);
            if(canPlay) {
                const res = await getMusicPlayUrl({
                    id,
                });
                console.log(res);
            } else {

            }
        },
        [],
    );

    // const closeModal = useCallback(
    //     () => {
    //     },
    //     [],
    // )
    const songs = props.songs;
    const items = songs.map((song, index) =>(
        <li key={song.id} className={`${utils.isEven(index + 1) ? 'search-item' : 'search-item even'}`}>
            <IconPlayCircle id={song.id} onClick={() => {
                playMusic(song.id);
            }}/>
            <Link to={'/song?id=' + song.id} className="name">{song.name}</Link>
            <div className="operates">
                <IconPlus />
                <IconFolder />
                <IconForward />
                <IconDownload />
            </div>
            <div className="singers">
                {song.artists && song.artists.map((item, i) => <Link className="singer-name" to={'/artist?id=' + item.id} key={item.id}>{i === 0 ? item.name : `/${item.name}`}</Link>)}
            </div>
            <Link to={'/album?id=' + song.album.id} className="album">《{song.album.name}》</Link>
            <div className="duration">{utils.formatTime(song.duration)}</div>
        </li>
    ))
    return (
        <ul className="music-container">
            {items}
            {/* <Modal
                title="登录"
                visible={props.visible}
                onCancel={closeModal}
                centered
                bodyStyle={{height: 200}}
            ></Modal> */}
        </ul>
    )
}


