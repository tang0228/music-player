import React, { useState, useEffect } from "react";
import style from "./albums.module.less";
import { getArtistAlbums, getAlbum } from "../../../services/apis";
import { Pagination, Toast } from "@douyinfe/semi-ui";
import utils from "../../../utils";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";
import { addSongListAction } from "@/store/actions/song";
import { setCurSongIdAction } from "@/store/actions/curSongId";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        curSongId: state.curSongId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurSongId: (...args) => dispatch(setCurSongIdAction(...args)),
        addSongs: (...args) => dispatch(addSongListAction(...args))
    };
};

function Albums(props) {
	const { total, id, setCurSongId, addSongs } = props;
	const [albums, setAlbums] = useState([]); // 专辑
	const [limit, setLimit] = useState(12); // 页容量
	const [page, setPage] = useState(1); // 页码

	const getAlbums = async () => {
		const res = await getArtistAlbums({
			id,
			limit,
			offset: (page - 1) * limit,
		});
		if (res.code === 200) {
			setAlbums(res.hotAlbums);
		}
	};
	useEffect(() => {
		(async () => {
			await getAlbums();
		})();
		return () => { };
	}, [id, limit, page]);

	// 页码变化
	const handlePageChange = (val) => {
		setPage(val);
	};
	// 页容量变化
	const handleLimitChange = (val) => {
		setLimit(val);
	};

    // 添加新碟到播放列表
    const addSongList = (id) => {
        getAlbum({ id }).then(res => {
            if (res.code === 200) {
                Toast.success({
                    content: "成功添加新碟到播放列表",
                    duration: 2,
                });
                const list = res.songs.map(s => ({
                    id: s.id,
                    url: "https://music.163.com/song/media/outer/url?id=" + s.id + '.mp3',
                    song: s
                }));
                addSongs(list);
                setCurSongId(list[0].id);
            }
        })
    }
	return (
		<>
			{albums ? (
				<div className={style["albums-wrap"]}>
					<div className="album-content">
						{albums.map((m) => (
							<div key={m.id} className="album-item">
								<div className="img-wrap">
									<LazyLoad height={120} debounce={500} placeholder={<img src={loadingUrl} width="100%"  height="100%"/>}>
										<img src={m.picUrl} alt="" />
										<Link className="mask" to={"/find/album?id=" + m.id}></Link>
									</LazyLoad>
									<i className="icon-play" onClick={addSongList.bind(null, m.id)}></i>
								</div>
								<Link to={"/find/album?id=" + m.id} className="name">
									{m.name}
								</Link>
								<div className="time">{utils.formatDate(m.publishTime)}</div>
							</div>
						))}
					</div>
					<div className="pagination-ontainer">
						<Pagination
							total={total}
							currentPage={page}
							onPageChange={handlePageChange}
							pageSize={limit}
							onPageSizeChange={handleLimitChange}
						></Pagination>
					</div>
				</div>
			) : '空'}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
