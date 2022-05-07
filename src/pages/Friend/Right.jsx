import React, { useState, useEffect } from 'react'
import style from "./right.module.less"
import { Link } from "react-router-dom"
import { getUserDetail } from "@/services/apis"


function Right(props) {
    const { user, length } = props;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserDetail({
            uid: user.userId
        }).then(res => {
            if (res.code === 200) {
                setUserInfo(res.profile);
            }
        })
    }, [length])

    return (
        <div className={style['right-wrap']}>
            {userInfo ? <div className="user-wrap">
                <div className="user-top">
                    <div className="img-wrap">
                        <Link to={'/user/home?uid=' + userInfo.userId}><img src={userInfo.avatarUrl} alt="" /></Link>
                    </div>
                    <div className="user-detail">
                        <Link to={'/user/home?uid=' + userInfo.userId} className="name">{userInfo.nickname}</Link>
                        <p className="desc">{userInfo.signature}</p>
                    </div>
                </div>
                <div className="user-nums">
                    <div className="box">
                        <span>{userInfo.eventCount}</span>
                        <span>动态</span>
                    </div>
                    <div className="box">
                        <span>{userInfo.follows}</span>
                        <span>关注</span>
                    </div>
                    <div className="box">
                        <span>{userInfo.followeds}</span>
                        <span>粉丝</span>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

export default Right;
