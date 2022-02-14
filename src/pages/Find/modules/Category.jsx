import React, { useEffect, useState, useCallback} from 'react';
import "./category.less";
import { getPlayListCat } from "../../../services/apis";
import CatSelect from './CatSelect';
import qs from "query-string";
import { useLocation } from "react-router-dom";

function transferCat(cat, sub) {
    let newCat = [];
    for (const key in cat) {
        newCat.push({
            name: cat[key],
            category: key,
            subCat: [],
        })
    }
    Array.isArray(sub) && sub.forEach((c, i) => {
        newCat[c.category].subCat.push(c);
    });
    return newCat;
}

export default function Category() {
    const location = useLocation();
    const [categories, setCategories] = useState();
    const [cat, setCat] = useState(qs.parse(location.search).cat);
    useEffect(() => {
        (async () => {
            const res = await getPlayListCat();
            const newCat = transferCat(res.categories, res.sub);
            setCategories(newCat);
        })();
        return () => {
        }
    }, []);

    const catChange = useCallback(
        (name) => {
            setCat(name);
        },
        [],
    )
    return (
        <div className="cat-container">
            <div className="cat-select">
                <span className="cat-title">{cat ? cat : '全部'}</span>
                <CatSelect categories={categories} catChange={catChange} />
            </div>
        </div>
    )
}
