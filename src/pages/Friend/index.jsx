import React, {useEffect} from 'react';
import { getFriend } from "../../services/apis"

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
        <div className="friend-container">
            
        </div>
    )
}
