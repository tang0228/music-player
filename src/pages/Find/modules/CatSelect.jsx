import React, { useState, useCallback } from 'react';
import {IconChevronDown, IconMusic} from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import "./catSelect.less";

export default function CatSelect() {
    const [showSelect, setShowSelect] = useState(false); // 是否打开下拉框
    const openSelect = useCallback(
        () => {
            setShowSelect(!showSelect);
        },
        [showSelect],
    )
    return (
        <div className="select-wrapper">
            <div className="select-btn" onClick={openSelect}>
                <span className="select-title">选择分类</span>
                <IconChevronDown />
            </div>
            {showSelect ? <div className="select-content">
                <Button type="primary" >全部风格</Button>
                <dl className="select-row">
                    <dt className="title"></dt>
                    <dd className="item"></dd>
                </dl>
                <dl className="select-row">
                    <dt className="title"></dt>
                    <dd className="item"></dd>
                </dl>
                <dl className="select-row">
                    <dt className="title"></dt>
                    <dd className="item"></dd>
                </dl>
                <dl className="select-row">
                    <dt className="title"></dt>
                    <dd className="item"></dd>
                </dl>
                <dl className="select-row">
                    <dt className="title">
                        <IconMusic />
                    </dt>
                    <dd className="item"></dd>
                </dl>
            </div> : null}
        </div>
    )
}
