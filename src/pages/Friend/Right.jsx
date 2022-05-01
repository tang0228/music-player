import React, { useState, useEffect } from 'react'
import style from "./right.module.less"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
    user: state.user
});

function Right(props) {
    const { user } = props;
    return (
        <div className={style['right-wrap']}>
            <div className="user-wrap">
                <div className="user-top">
                    <div className="img-wrap">
                        <Link to={'/user/home?uid=' + user.userId}><img src={user.avatarUrl} alt="" /></Link>
                    </div>
                    <div className="user-detail">
                        <Link to={'/user/home?uid=' + user.userId} className="name">{user.nickname}</Link>
                        <p className="desc">{user.signature}</p>
                    </div>
                </div>
                <div className="user-nums">
                    <div className="box">
                        <span>{user.eventCount}</span>
                        <span>动态</span>
                    </div>
                    <div className="box">
                        <span>{user.follows}</span>
                        <span>关注</span>
                    </div>
                    <div className="box">
                        <span>{user.followeds}</span>
                        <span>粉丝</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Right)
