import React, { useEffect, useState } from 'react'
import { getFriend } from "../../services/apis"
import style from "./index.module.less"
import Right from "./Right"
import Left from "./Left"
import { Spin } from '@douyinfe/semi-ui'

export default function Friend() {
    const [event, setEvent] = useState([]); // 动态
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getEvent();
    }, [])

    const getEvent = async () => {
        setLoading(true);
        const res = await getFriend({});
        if (res.code === 200) {
            setLoading(false);
            const list = res.event.map(e => ({
                ...e,
                json: JSON.parse(e.json)
            }))
            setEvent(list);
        }
    }

    const shareSuccess = () => {
        getEvent();
    }
    return (
        <div className={style["friend-container"]}>
            <div className="left">
                <Left list={event} shareSuccess={shareSuccess} />
            </div>
            <div className="right">
                <Right />
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
