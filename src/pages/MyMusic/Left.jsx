import React from 'react'
import style from "./left.module.less"
import Item from "./Item"

function Left(props) {
    const { id, playList, likePlayList, userId } = props;

    return (
        <div className={style['left']}>
            <Item userId={userId} list={playList} title="创建的歌单" showBtn={true} id={id} del={() => {
                props.del && props.del();
            }} create={() => {
                props.create && props.create();
            }} />
            {likePlayList.length ? <Item list={likePlayList} title="收藏的歌单" showBtn={false} del={() => {
                props.del && props.del();
            }} showEdit={false} /> : null}
        </div>
    )
}

export default Left;