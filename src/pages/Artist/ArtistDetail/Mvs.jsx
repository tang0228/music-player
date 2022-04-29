import React, { useState, useEffect } from "react";
import style from "./mvs.module.less";
import { Pagination } from "@douyinfe/semi-ui";
import { getArtistMv } from "../../../services/apis";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import loadingUrl from "@/assets/loading.svg";

export default function Mvs(props) {
	const { total, id } = props;
	const [limit, setLimit] = useState(12); // 页容量
	const [page, setPage] = useState(1); // 页码
	const [mvs, setMvs] = useState([]); // mv

	// 获取歌手MV
	const getMvs = async () => {
		const res = await getArtistMv({
			id,
			limit,
			offset: (page - 1) * limit,
		});
		if (res.code === 200) {
			setMvs(res.mvs);
		}
	};
	useEffect(() => {
		(async () => {
			await getMvs();
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
	return (
		<>
			{mvs ? (
				<div className={style["mvs-wrap"]}>
					<div className="mv-content">
						{mvs.map((m) => (
							<div key={m.id} className="mv-item">
								<div className="img-wrap">
									<LazyLoad height={120} debounce={500} placeholder={<img src={loadingUrl} width="100%" height="100%" />}>
										<img src={m.imgurl} alt="" />
									</LazyLoad>
									<Link className="mask" to={"/find/mv?id=" + m.id}></Link>
									<Link className="icon-play" to={"/find/mv?id=" + m.id}></Link>
								</div>
								<Link to={"/find/mv?id=" + m.id} className="name">
									{m.name}
								</Link>
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
			) : null}
		</>
	);
}
