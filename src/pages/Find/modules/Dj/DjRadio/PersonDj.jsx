import React, { useEffect, useState } from 'react';
import { getRecommendCat } from '../../../../../services/dj';
import CatItem from '../components/CatItem';

export default function PersonDj() {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        getRecommendCat().then(res => {
            if (res.code === 200) {
                setCats(res.data.splice(0, 5));
            }
        })
        return () => {
        }
    }, [])
    return (
        <div className="person-dj">
            {cats && cats.length ? cats.map(c => <CatItem detail={c} key={c.categoryId}>
            </CatItem>) : null}
        </div>
    )
}
