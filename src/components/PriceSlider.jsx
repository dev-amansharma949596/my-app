import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Vite way: import images (don’t use ../src/... in src="")
import price1 from "../assets/Img/price-1.jpg";
import price2 from "../assets/Img/price-2.jpg";
import price3 from "../assets/Img/price-3.jpg";
import price4 from "../assets/Img/price-4.jpg";

const slides = [
  {
    title: "Pregnancy Care",
    price: 49,
    img: price1,
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Health Checkup",
    price: 99,
    img: price2,
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Dental Care",
    price: 149,
    img: price3,
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
  {
    title: "Operation & Surgery",
    price: 199,
    img: price4,
    features: [
      "Emergency Medical Treatment",
      "Highly Experienced Doctors",
      "Highest Success Rate",
      "Telephone Service",
    ],
  },
];

export default function PriceSlider() {
  return (
    <div className="position-relative" style={{ padding: "0 45px 45px 45px" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className="bg-light rounded text-center h-100">
              <div className="position-relative">
                <img className="img-fluid rounded-top" src={s.img} alt={s.title} />

                <div
                  className="position-absolute w-100 h-100 top-50 start-50 translate-middle rounded-top d-flex flex-column align-items-center justify-content-center"
                  style={{ background: "rgba(29, 42, 77, .8)" }}
                >
                  <h3 className="text-white">{s.title}</h3>

                  <h1 className="display-4 text-white mb-0">
                    <small
                      className="align-top fw-normal"
                      style={{ fontSize: "22px", lineHeight: "45px" }}
                    >
                      $
                    </small>
                    {s.price}
                    <small
                      className="align-bottom fw-normal"
                      style={{ fontSize: "16px", lineHeight: "40px" }}
                    >
                      / Year
                    </small>
                  </h1>
                </div>
              </div>

              <div className="text-center py-5">
                {s.features.map((f) => (
                  <p key={f}>{f}</p>
                ))}
                <a href="#!" className="btn btn-primary rounded-pill py-3 px-5 my-2">
                  Apply Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
