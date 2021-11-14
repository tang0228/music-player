import React, { useEffect} from 'react';
import "./index.less";
import { getPlayListCat } from "../../services/apis"

export default function Find(props) {
    useEffect(() => {
        (async () => {
            const res = await getPlayListCat();
            console.log(res, 'cat')
        })();
        return () => {
        }
    }, [])
    return (
        <div className="find-container">
            {props.children}
        </div>
    )
}
