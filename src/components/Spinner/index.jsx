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
        NProgress.start();
        return () => {
            NProgress.done();
        }
    }, [])

    return null;
}
