import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "./index.less";

/**
 * 路由跳转的进度条
 * @returns 
 */
export default function index() {
    useEffect(() => {
        window.scrollTo(0, 0); // 滚动到顶部
        NProgress.start();
        return () => {
            NProgress.done();
        }
    }, [])

    return null;
}
