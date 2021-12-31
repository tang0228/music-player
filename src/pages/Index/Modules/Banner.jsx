import React, { useEffect, useState } from "react";
import { getBanner } from "../../../services/apis";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./banner.less";
import {Link} from "react-router-dom";
import { Spin } from "@douyinfe/semi-ui";
const mapUrl = {
    '1' : "/song?id=",
    "10": "/album?id=",
    "100": "/artist?id=",
    "1000": "/find/playlist/detail?id=",
    "1002": "/user/home?uid=",
    "106": "/song?id=",
    "1009": "",
    "1004": "mv?id=",
};

export default function Banner() {
  const [banners, setBanners] = useState([]); // banner数据
  const [loading, setLoading] = useState(true); // 加载中
  useEffect(() => {
    (async () => {
        setLoading(true);
      const res = await getBanner();
      if (res.code === 200) {
        setBanners(res.banners);
        setLoading(false);
      }
    })();
    return () => {};
  }, []);
  return (
      <div className="banner-wrap">
          { !loading ? <Carousel autoPlay={false} showThumbs={false} showStatus={false} infiniteLoop={false}>
          {banners.map(b => <div key={b.targetId}>
              <div className="bg" style={{
                  position: "absolute",
                  backgroundImage: `url('${b.imageUrl}')`,
                  filter: "blur(12px)",
                  width: "200%",
                  height: "100%",
              }}></div>
              {mapUrl[b.targetType] ?<Link style={{
                  display: "block",
                  position: "relative",
                  zIndex: 12,
              }} to={mapUrl[b.targetType] + b.targetId}>
              <img src={b.imageUrl} alt="" style={{
                  height: 285,
                  width: 728,
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 10
              }} />
              </Link> : <a href={b.url} style={{
                  display: "block",
                  position: "relative",
                  zIndex: 12,
              }} target="_blank">
                  <img src={b.imageUrl} alt="" style={{
                  height: 285,
                  width: 728,
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 10
              }} /></a>}
              
          </div>)}
        </Carousel>  : <Spin 
                    spinning={loading}
                    tip="loading..."
                    size="large"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "9999",
                    }} /> }
        <div className="download">
            <Link className="download-btn" to="/download">下载客户端</Link>
            <p className="download-text">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
      
  );
}
