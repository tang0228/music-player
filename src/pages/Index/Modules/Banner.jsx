import React, { useEffect, useState } from "react";
import { getBanner } from "../../../services/apis";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./banner.less";
import {Link} from "react-router-dom";
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
  useEffect(() => {
    (async () => {
      const res = await getBanner();
      if (res.code === 200) {
        setBanners(res.banners);
      }
    })();
    return () => {};
  }, []);
  return (
      <div className="banner-wrap">
          <Carousel autoPlay={false} showThumbs={false} showStatus={false} infiniteLoop={false}>
          {banners ? banners.map(b => <div key={b.targetId} style={{
              position: "relative",
          }}>
              <div className="bg" style={{
                  position: "absolute",
                  backgroundImage: `url('${b.imageUrl}')`,
                  filter: "blur(15px)",
                  width: "100%",
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
              
          </div>) : null}
        </Carousel>
        <div className="download">
            <Link className="download-btn" to="/download">下载客户端</Link>
            <p className="download-text">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
      
  );
}
