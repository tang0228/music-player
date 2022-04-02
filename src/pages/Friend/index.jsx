import React from 'react';
// import { getFriend } from "../../services/apis"

export default function Friend() {
    // useEffect(() => {
    //     (async () => {
    //         const res = await getFriend({});
    //         console.log(res, 'friend')
    //     })();
    //     return () => {
    //     }
    // }, [])
    return (
        <div className="friend-container" style={{
            height: 'calc(100vh - 145px)',
            width: 980,
            border: '1px solid #d3d3d3',
            borderTop: 'none',
            boxSizing: 'border-box',
            borderBottom: 'none',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            friend
        </div>
    )
}
