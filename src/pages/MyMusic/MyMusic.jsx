import React, { useState, useEffect } from 'react'
import style from "./myMusic.module.less"
import Left from "./Left"
import DetailLeft from '../Find/modules/playListDetail/DetailLeft'
import qs from "query-string"
import { getUserPlayList, getPlayListDetail } from "@/services/apis"
import { useLocation, useHistory } from "react-router-dom"
import { Spin } from "@douyinfe/semi-ui";
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

function MyMusic(props) {
    const { user } = props;
    const location = useLocation();
    const history = useHistory();
    let id = qs.parse(location.search).id || "";
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false); // loading
    const [playList, setPlayList] = useState([]);
    const [likePlayList, setLikePlayList] = useState([]);

    const getList = async () => {
        const res = await getUserPlayList({
            uid: user.userId,
        });
        if (res.code === 200) {
            let playList = res.playlist.filter(p => p.userId === user.userId);
            let likePlayList = res.playlist.filter(p => p.userId !== user.userId);
            history.replace('/myMusic?id=' + playList[0].id);
            setPlayList(playList);
            setLikePlayList(likePlayList);
        }
    }

    //获取用户歌单
    useEffect(() => {
        getList();
    }, [])

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getPlayListDetail({ id });
            if (res.code === 200) {
                setLoading(false);
                setDetail(res.playlist);
            }
        })();
    }, [id]);

    const handle = () => {
        getList();
    }
    return (
        <div className={style['my-music']}>
            <div className="left">
                <Left userId={user.userId} id={id} playList={playList} likePlayList={likePlayList} del={handle} create={handle} />
            </div>
            <div className="right">
                {detail ? <DetailLeft detail={detail} id={id} /> : null}
            </div>
            <Spin
                spinning={loading}
                tip="loading..."
                size="large"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                }}
            ></Spin>
        </div>
    )
}

export default connect(mapStateToProps)(MyMusic);
