import React, { useEffect, useState } from "react";
import { getBanner } from "../../../services/apis";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./banner.less";
import {Link} from "react-router-dom";

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
              <img src={b.imageUrl} alt="" style={{
                  position: "absolute",
                  height: 285,
                  width: 728,
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1000
              }} />
          </div>) : null}
        </Carousel>
        <div className="download">
            <Link className="download-btn" to="/download">下载客户端</Link>
            <p className="download-text">PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
      
  );
}
