import React, { useEffect, useState } from 'react';
import style from "./index.module.less";

import { getAlbumList } from '../../../services/album';

export default function AlbumList() {
    useEffect(() => {
        getAlbumList({
            limit: 35,
            offset: 0,
            area: 'ALL',
        }).then(res => {
            console.log(res)
        })
        return () => {
        }
    }, [])
    return (
        <div className={style['album-list']}>
            
        </div>
    )
}
