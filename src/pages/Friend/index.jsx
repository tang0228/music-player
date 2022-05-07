import React, { useEffect, useState } from 'react'
import {getUserEvent} from "@/services/user"
import style from "./index.module.less"
import Right from "./Right"
import Left from "./Left"
import { Spin } from '@douyinfe/semi-ui'
import { connect } from 'react-redux'
import utils from "@/utils"

const mapStateToProps = (state) => ({
    user: state.user
});

let lasttime, es = [];

function Friend(props) {
    const { user } = props
    const [event, setEvent] = useState([]); // 动态
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true); // 是否有更多数据

    useEffect(() => {
        getEvent();
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', utils.throttle(handleScroll, 1000))
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const handleScroll = () => {
        if(loading) {
            return;
        }
        const dom = document.documentElement;
        const dx = Math.abs(dom.scrollTop + dom.clientHeight - dom.offsetHeight);
        if(dx < 100 && more) {
            getEvent();
        }
    }

    const getEvent = async () => {
        setLoading(true);
        const res = await getUserEvent({
            uid: user.userId,
            limit: 20,
            lasttime: lasttime
        });
        if (res.code === 200) {
            setLoading(false);
            setMore(res.more);
            lasttime = res.lasttime;
            const list = res.event.map(e => ({
                ...e,
                json: JSON.parse(e.json)
            }));
            const result = list.concat(es);
            es = result;
            setEvent(result);
        }
    }

    const shareSuccess = () => {
        getEvent();
    }
    return (
        <div className={style["friend-container"]}>
            <div className="left">
                <Left list={event} shareSuccess={shareSuccess} user={user} />
            </div>
            <div className="right">
                <Right length={event.length} user={user} />
            </div>
            <Spin
                spinning={loading}
                tip="loading..."
                size="large"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                }}
            ></Spin>
        </div>
    )
}

export default connect(mapStateToProps)(Friend);
