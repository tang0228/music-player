import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMvDetail } from "../../../services/mv";
import qs from "query-string";
import style from "./index.module.less";
import MvLeft from "./MvLeft";
import MvRight from "./MvRight";
import {
	IllustrationConstruction,
	IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";
import { Empty } from "@douyinfe/semi-ui";

export default function MvDetail() {
	const location = useLocation();
	const id = qs.parse(location.search).id;
	const [mvDetail, setMvDetail] = useState(null); // mv详情
	useEffect(() => {
		(async () => {
			const res = await getMvDetail({ mvid: id });
			if (res.code === 200) {
				setMvDetail(res.data);
			}
		})();
		return () => { };
	}, [id]);
	return (
		<>
			{mvDetail ? (
				<div className={style["mv-detail"]}>
					<div className="left">
						<MvLeft mvDetail={mvDetail} id={id} />
					</div>
					<div className="right">
						<MvRight mvDetail={mvDetail} id={id} />
					</div>
				</div>
			) : (
				<Empty
					image={
						<IllustrationConstruction style={{ width: 150, height: 150 }} />
					}
					darkModeImage={
						<IllustrationConstructionDark style={{ width: 150, height: 150 }} />
					}
					description={"信息丢失"}
					style={{ padding: 30 }}
				/>
			)}
		</>
	);
}
