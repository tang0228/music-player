import React, { useState } from 'react'
import style from "./item.module.less"
import { delPlayList, createPlayList } from "@/services/playlist"
import { Link } from "react-router-dom"
import { Toast, Popconfirm, Modal, Input } from "@douyinfe/semi-ui"

export default function Item(props) {
    const { title, list, showBtn, id, showEdit = true, userId } = props;
    const [open, setOpen] = useState(true);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");


    const handleClick = () => {
        setOpen(!open)
    }

    // 删除歌单
    const del = async id => {
        const res = await delPlayList({ id });
        if (res.code === 200) {
            props.del && props.del();
            Toast.success({
                content: "删除成功",
            })
        }
    }

    const onConfirm = id => {
        del(id);
    }

    const handleOk = () => {
        createPlayList({ name }).then(res => {
            if (res.code === 200) {
                props.create && props.create();
                Toast.success({
                    content: "创建成功",
                })
            }
        })
        setVisible(false);
        setName("");
    }

    const handleCancel = () => {
        setVisible(false);
        setName("");
    }

    const handleChange = (val) => {
        setName(val);
    }

    return (
        <div className={style["left-item"]}>
            <div className="item-header">
                <span className="wrap" onClick={handleClick}>
                    <i className={open ? "icon icon-arrow-down" : "icon icon-arrow-left"}></i>
                    <span className="text">{title}（{list.length}）</span>
                </span>
                {showBtn ? <span className="add-btn" onClick={() => {
                    setVisible(true);
                }}><i>新建</i></span> : null}
            </div>
            {open ? <ul className="item-list">
                {list.map((l, i) => <li key={l.id} className={l.id == id ? 'list-item active' : 'list-item'}>
                    <Link to={'/myMusic?id=' + l.id} className="wrap">
                        <img src={l.coverImgUrl} alt="" />
                        <div className="info">
                            <p className="name ell">{l.name}</p>
                            <p className="num ell">{l.trackCount}首 by {l.creator.nickname}</p>
                        </div>
                    </Link>
                    {(userId == l.creator.userId && i !== 0) || userId != l.creator.userId ? <span className="options">
                        {showEdit ? <i className="icon-edit icon"></i> : null}
                        <Popconfirm
                            title="确定删除歌单？"
                            onConfirm={onConfirm.bind(null, l.id)}
                        >
                            <i className="icon-del icon" ></i>
                        </Popconfirm>
                    </span> : null}
                </li>)}
            </ul> : null}
            <Modal
                title="新建歌单"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                mask={false}
            >
                <Input placeholder='请输入新建歌单名称' value={name} onChange={handleChange}></Input>
            </Modal>
        </div>
    )
}
