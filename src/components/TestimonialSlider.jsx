import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Vite: import images
import t1 from "../assets/Img/testimonial-1.jpg";
import t2 from "../assets/Img/testimonial-2.jpg";
import t3 from "../assets/Img/testimonial-3.jpg";

const testimonials = [
  {
    img: t1,
    text: `Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem
ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.
Erat dolor rebum sit ipsum.`,
    name: "Patient Name",
    role: "Profession",
  },
  {
    img: t2,
    text: `Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem
ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.
Erat dolor rebum sit ipsum.`,
    name: "Patient Name",
    role: "Profession",
  },
  {
    img: t3,
    text: `Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem
ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.
Erat dolor rebum sit ipsum.`,
    name: "Patient Name",
    role: "Profession",
  },
];

export default function TestimonialSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop
      spaceBetween={24}
      slidesPerView={1}
    >
      {testimonials.map((t, idx) => (
        <SwiperSlide key={idx}>
          <div className="testimonial-item text-center">
            <div className="position-relative mb-5">
              <img
                className="img-fluid rounded-circle mx-auto"
                src={t.img}
                alt={t.name}
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />

              <div
                className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle"
                style={{ width: "60px", height: "60px" }}
              >
                <i className="fa fa-quote-left fa-2x text-primary" />
              </div>
            </div>

            <p className="fs-4 fw-normal">{t.text}</p>
            <hr className="w-25 mx-auto" />
            <h3>{t.name}</h3>
            <h6 className="fw-normal text-primary mb-3">{t.role}</h6>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
