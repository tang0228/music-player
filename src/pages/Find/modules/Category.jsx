import React, { useEffect} from 'react';
import "./category.less";
import { getPlayListCat } from "../../../services/apis";

import { Button } from "@douyinfe/semi-ui";

export default function Category() {
    useEffect(() => {
        (async () => {
            const res = await getPlayListCat();
            console.log(res, 'cat')
        })();
        return () => {
        }
    }, [])
    return (
        <div className="cat-container">
            <div className="cat-select">
                <span>全部</span>
            </div>
            <Button type="danger">热门</Button>
        </div>
    )
}
