import loadingUrl from "@/assets/loading.svg";
import React from 'react';
import PropTypes from "prop-types";

export default function index(props) {
    return (
        <div className="placeholder-wrap" style={{
            width: props.width,
            height: props.height,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <img src={loadingUrl} alt="" />
        </div>
    )
}

index.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}

index.defaultProps = {
    width: "100%",
    height: "100%"
}
