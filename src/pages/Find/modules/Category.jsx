import React, { useEffect, useState} from 'react';
import "./category.less";
import { getPlayListCat } from "../../../services/apis";
import CatSelect from './CatSelect';
import { Button } from "@douyinfe/semi-ui";

export default function Category() {
    const [categories, setCategories] = useState();
    useEffect(() => {
        (async () => {
            const res = await getPlayListCat();
            setCategories(res.categories);
            console.log(res, 'cat')
        })();
        return () => {
        }
    }, [])
    return (
        <div className="cat-container">
            <div className="cat-select">
                <span>全部</span>
                <CatSelect categories={categories}/>
            </div>
            
            <Button type="danger">热门</Button>
        </div>
    )
}
