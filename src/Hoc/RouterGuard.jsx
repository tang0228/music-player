import React, { useEffect } from 'react'
import { HashRouter as Router, withRouter, useHistory, useLocation } from 'react-router-dom'

let prevLocation, curLocation, action, unBlock;

function _Helper() {
    const history = useHistory();
    prevLocation = useLocation();
    useEffect(() => {
        unBlock = history.block((location, ac) => {
            curLocation = location;
            action = ac;
            return "";
        })
        
        return () => {
            // unBlock();
        }
    }, [])

    return null
}

withRouter(_Helper);

export default function RouterGuard(props) {

    const handleConfirm = (msg, cb) => {
        props.onBeforeRouter && props.onBeforeRouter(prevLocation, curLocation, action, msg, cb);
    }
    return (

        <Router getUserConfirmation={handleConfirm}>
            <_Helper></_Helper>
            {props.children}
        </Router>
    )
}
