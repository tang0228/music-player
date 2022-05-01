import React, { useEffect } from 'react'
import { getFriend } from "../../services/apis"
import style from "./index.module.less"

export default function Friend() {
    useEffect(() => {
        (async () => {
            const res = await getFriend({});
            console.log(res, 'friend')
        })();
        return () => {
        }
    }, [])
    return (
        <div className={style["friend-container"]}>
            <div className="left"></div>
            <div className="right"></div>
        </div>
    )
}
