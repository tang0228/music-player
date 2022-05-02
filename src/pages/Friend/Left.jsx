import React, { useState } from 'react'
import style from "./left.module.less"
import "./modal.less"
import { Link } from "react-router-dom"
import { Empty, Modal, TextArea, Toast, Input, Button } from '@douyinfe/semi-ui'
import { IconSearch } from '@douyinfe/semi-icons'
import { search } from "@/services/search"
import utils from "@/utils"
import { share } from "@/services/user"

const SHARE_MAP = {
    '18': "分享单曲",
    '19': "分享专辑",
    '17': "分享电台节目",
    '28': "分享电台节目",
    '22': "转发",
    '39': "发布视频",
    '24': "分享专栏文章",
    '35': "分享歌单",
    '13': "分享歌单",
    '41': "分享视频",
    '21': "分享视频",
}

export default function Left(props) {
    const [visible, setVisible] = useState(false);
    const [song, setSong] = useState(null);// 选中的单曲
    const [isChooseSong, setIsChooseSOng] = useState(false); // 是否正在选择歌曲
    const [word, setWord] = useState(""); // 搜索框的关键词
    const [songs, setSongs] = useState([]); // 伸缩的歌曲列表
    const [msg, setMsg] = useState("");
    const { list } = props;
    console.log(list)

    const shareNew = () => {
        share({ id: song.id, msg }).then(res => {
            if(res.code === 200) {
                props.shareSuccess && props.shareSuccess();
            }
        })
    }

    const handleAreaChange = val => {
        setMsg(val);
    }

    const handleOk = () => {
        if (!song) {
            Toast.warning({
                content: "请选择单曲哦"
            });
            return;
        }
        shareNew();
        setVisible(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }

    // 返回
    const back = () => {
        setIsChooseSOng(false);
        setWord("");
        setSongs([]);
    }

    const chooseSong = () => {
        setIsChooseSOng(true);
    }

    // 搜索歌曲
    const handleInpChange = val => {
        // setWord(val);
        if (!val) {
            setSongs([]);
            return;
        }
        search({ keywords: val }).then(res => {
            if (res.code === 200) {
                setSongs(res.result.songs);
            }
        })
    }

    // 确认选中歌曲
    const select = s => {
        setSong(s);
        setIsChooseSOng(false);
    }
    return (
        <div className={style['left-wrap']}>
            <div className="list-header">
                <h3 className="title">动态</h3>
                <span className="btn btn-video" title='发动态' onClick={() => {
                    setVisible(true);
                }}></span>
                <span className="btn btn-msg" title="发布视频" onClick={() => {
                    window.open('https://music.163.com/st/ncreator/upload')
                }}></span>
            </div>
            {list.length ? <ul className="list-wrap">
                {list.map(l => <li key={l.id} className="list-item">
                    <i className="icon-arrow"></i>
                    <Link to={'/user/home?uid=' + l.user.userId}>
                        <img className='avatar' src={l.user.avatarUrl} alt="" />
                    </Link>
                    <div className="main-content">
                        <div className="user-name">
                            <Link className='nickname' to={'/user/home?uid=' + l.user.userId}>{l.user.nickname}</Link>
                            <span className="text">{SHARE_MAP[l.type]}</span>
                        </div>
                        <div className="time">{utils.formatDate(l.showTime)}</div>
                        <div className="share-text">{l.json.msg}</div>
                        <div className="flag">
                            <div className="img-wrap">
                                <img src={l.json.song.img80x80 || l.json.song.xInfo.img80x80} alt="" />
                                <i className="icon-play"></i>
                            </div>
                            <div className="song-info">
                                <p className='song-name'><Link to={'/find/song?id=' + l.json.song.id}>{l.json.song.name}</Link></p>
                                <p className="artist-name"><Link to={'/find/artist?id=' + l.json.song.artists[0].id}>{l.json.song.artists[0].name}</Link></p>
                            </div>
                        </div>
                    </div>
                </li>)}
            </ul> : <Empty
                title="暂时还没有动态"
            />}
            <Modal
                title={isChooseSong ? '添加音乐' : '分享'}
                visible={visible}
                mask={false}
                onCancel={handleCancel}
                className='share-modal'
                width={528}
                footer={
                    isChooseSong ? <Button type="primary" onClick={back}>
                        返回
                    </Button> :
                        <>
                            <Button type="primary" onClick={handleOk}>
                                分享
                            </Button>
                            <Button type="tertiary" onClick={handleCancel}>
                                取消
                            </Button>
                        </>
                }
            >
                {!isChooseSong ? <>
                    <TextArea placeholder='一起聊聊吧~' value={msg} maxCount={140} onChange={handleAreaChange} />
                    {!song ? <div className="song-box" onClick={chooseSong}>
                        <i className="icon-img"></i>
                        <span className="text">给动态配上音乐</span>
                        <i className="icon-add"></i>
                    </div> : <div className="song-box" onClick={chooseSong}>
                        <span className="text">单曲：{song.name} - {song.artists.map((a, i) => <span key={a.id} >
                            {i !== 0 ? '/' + a.name : a.name}
                        </span>)} </span>
                        <i className="icon-arrow"></i>
                    </div>}
                </> : <>
                    <Input prefix={<IconSearch />} onChange={handleInpChange} ></Input>
                    <ul className='list-wrap'>
                        {songs.length ? songs.map((s, k) => <li key={s.id} onClick={() => {
                            select(s)
                        }
                        } className={utils.isEven(k) ? 'list-item even' : 'list-item'}>
                            <i className="icon-play"></i>
                            <span className="song-name ell">{s.name}</span>
                            <span className="artist-name ell">
                                {s.artists.map((a, i) => <span key={a.id} >
                                    {i !== 0 ? '/' + a.name : a.name}
                                </span>)}
                            </span>
                        </li>) : null}
                    </ul>
                </>}
            </Modal >
        </div >
    )
} 
