import React from 'react';
import PropTypes from "prop-types";
import utils from '../../../utils';
import "./searchNote.less";

export default function SearchNote(props) {
    const {keyword, total, type} = props;
    const typeText = utils.getTextByType(type);
    return (
        <div className="note-container">
            搜索“{keyword}”，找到 <span className="nums">{total}</span> 个{typeText}
        </div>
    )
};

SearchNote.propTypes = {
    keyword: PropTypes.string,
    total: PropTypes.number,
    type: PropTypes.string || PropTypes.number,
}


