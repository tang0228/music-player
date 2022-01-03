import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import "./userHome.less";
import qs from "query-string";
import { getUserDetail, getUserRecord, getUserPlayList } from "../../../../services/apis";
import { Button, Popover } from "@douyinfe/semi-ui";
import { IconPlus, IconFemale, IconMale, IconComment, IconWeibo, IconInfoCircle, IconChevronRight } from "@douyinfe/semi-icons";
import RecordItem from './RecordItem';
import PlayItem from './PlayItem';
import { connect } from "react-redux";
import LazyLoad from 'react-lazyload';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
function UserHome(props) {
    const {user} = props;
    const location = useLocation();
    const history = useHistory();
    const uid = +qs.parse(location.search).uid; // 用户id
    const [userInfo, setUserInfo] = useState(null); // 用户信息
    const [type, setType] = useState(1); // week or all
    const [recordList, setRecordList] = useState([]); // 播放记录
    const [playList, setPlayList] = useState([]); // 用户的歌单
    const [likePlayList, setLikePlayList] = useState([]); // 用户收藏的歌单

    //获取用户信息
    useEffect(() => {
        (async () => {
            const res = await getUserDetail({
                uid
            });
            if(res.code === 200) {
                setUserInfo(res)
            }
        })();
        return () => {
        }
    }, [uid]);

    // 获取用户的播放记录
    useEffect(() => {
        (async () => {
            const res = await getUserRecord({
                uid,
                type,
            });
            if(res && res.code === 200) {
                if(type === 1) {
                    setRecordList(res.weekData);
                } else if(type === 0) {
                    setRecordList(res.allData);
                }
            } else {
                setRecordList([]);
            }
        })();
        return () => {
        }
    }, [uid, type]);

    //获取用户歌单
    useEffect(() => {
        (async () => {
            const res = await getUserPlayList({
                uid,
            });
            if(res.code === 200) {
                let playList = res.playlist.filter(p => p.userId === uid);
                let likePlayList = res.playlist.filter(p => p.userId !== uid);
                setPlayList(playList);
                setLikePlayList(likePlayList);
            }
        })();
        return () => {
        }
    }, [uid])
    return (
        <div className="user-home-container">
            { userInfo ? <div className="user-info">
                <div className="img">
                    <LazyLoad>
                        <img src={userInfo.profile.avatarUrl} alt="" />
                    </LazyLoad>
                </div>
                <div className="info-content">
                    <div className="name-wrap">
                        <span className="name">{userInfo.profile.nickname}</span>
                        <span className={userInfo.profile.gender === 1 ? 'level blue' : 'level pink'}>LV. {userInfo.level} {userInfo.profile.gender === 1 ? <IconMale /> : <IconFemale /> }</span>
                        {user && user.userId === uid ? <Button type="tertiary" onClick={() => {
                            history.push(`/user/update?uid=${uid}`)
                        }}>编辑个人资料</Button> : <div className="btns">
                            <Button icon={<IconComment />} type="tertiary">发私信</Button>
                            <Button icon={<IconPlus />} >关注</Button>
                        </div>}
                    </div>
                    <div className="user-nums">
                        <div className="box">
                            <span>{userInfo.profile.eventCount}</span>
                            <span>动态</span>
                        </div>
                        <div className="box">
                            <span>{userInfo.profile.follows}</span>
                            <span>关注</span>
                        </div>
                        <div className="box">
                            <span>{userInfo.profile.followeds}</span>
                            <span>粉丝</span>
                        </div>
                    </div>
                    <div className="item">个人介绍：{userInfo.profile.signature}</div>
                    {/* <div className="user-city">
                        <span className="item">所在地区：浙江省 - 杭州市</span>
                        <span className="item">年龄：00后</span>
                    </div> */}
                    <div className="item">社交网络：<IconWeibo /></div>
                </div>
            </div> : null}
            {/* 用户的播放记录，当前用户才可以访问 */}
            {
                recordList && recordList.length ? <>
                <div className="record-header">
                    <h3>听歌排行</h3>
                    <h4>累计听歌{recordList.length}首</h4>
                    <Popover content={
                        <div style={{
                            padding: 12,
                        }}>实际播放时间过短的歌曲将不纳入计算。</div>
                    }>
                        <IconInfoCircle />
                    </Popover>
                    <div className="nav">
                        <span className={type === 1 ? 'item active' : 'item'} onClick={()=>{
                            setType(1);
                        }}>最近一周</span>
                        <span className="line">|</span>
                        <span className={type === 0 ? 'item active' : 'item'} onClick={() => {
                            setType(0);
                        }}>所有时间</span>
                    </div>
                </div>
                <ul className="record-list">
                    {recordList ? recordList.slice(0, 10).map((r, i) => <RecordItem key={r.song.id} record={r} index={i + 1}></RecordItem>) : null}
                </ul>
                <div className="more">查看更多<IconChevronRight /></div>
                </> : null
            }
            {/* 用户创建的歌单 */}
            {
                playList && playList.length ? <>
                <div className="playlist">
                {userInfo ? (user && user.userId === uid ? '我' : userInfo.profile.nickname) : null}创建的歌单
                <span className="r"></span>
                （{playList.length}）
            </div>
            <div className="list-wrap">
                {playList ? playList.map(p => <PlayItem item={p} key={p.id}></PlayItem>) : null}
            </div>
                </> : null
            }
            
            {/* 用户收藏的歌单 */}
            {likePlayList && likePlayList.length ? <>
                <div className="playlist">
                {userInfo ? (user && user.userId === uid ? '我' : userInfo.profile.nickname) : null}收藏的歌单
                <span className="r"></span>
                （{likePlayList.length}）
            </div>
            <div className="list-wrap">
                {likePlayList ? likePlayList.map(p => <PlayItem item={p} key={p.id}></PlayItem>) : null}
            </div></> : null}
        </div>
    )
};

export default connect(mapStateToProps)(UserHome);
