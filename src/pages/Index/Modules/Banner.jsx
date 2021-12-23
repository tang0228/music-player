import React, { useEffect, useState } from "react";
import { getBanner } from "../../../services/apis";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
      <Carousel autoPlay={true} showThumbs={false} showStatus={false} infiniteLoop={true}>
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
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1000
              }} />
          </div>) : null}
      </Carousel>
  );
}
