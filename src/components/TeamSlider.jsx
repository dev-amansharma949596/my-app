import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Vite best practice: import images (don’t use ../src/... in src="")
import team1 from "../assets/Img/team-1.jpg";
import team2 from "../assets/Img/team-2.jpg";
import team3 from "../assets/Img/team-3.jpg";

const team = [
  {
    name: "Doctor Name",
    role: "Cardiology Specialist",
    desc: "Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor",
    img: team1,
  },
  {
    name: "Doctor Name",
    role: "Cardiology Specialist",
    desc: "Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor",
    img: team2,
  },
  {
    name: "Doctor Name",
    role: "Cardiology Specialist",
    desc: "Dolor lorem eos dolor duo eirmod sea. Dolor sit magna rebum clita rebum dolor",
    img: team3,
  },
];

export default function TeamSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 1 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 2 },
      }}
    >
      {team.map((t, idx) => (
        <SwiperSlide key={idx}>
          <div className="team-item">
            <div className="row g-0 bg-light rounded overflow-hidden">
              <div className="col-12 col-sm-5 h-100">
                <img
                  className="img-fluid h-100"
                  src={t.img}
                  alt={t.name}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="col-12 col-sm-7 h-100 d-flex flex-column">
                <div className="mt-auto p-4">
                  <h3>{t.name}</h3>
                  <h6 className="fw-normal fst-italic text-primary mb-4">{t.role}</h6>
                  <p className="m-0">{t.desc}</p>
                </div>

                <div className="d-flex mt-auto border-top p-4">
                  <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#!">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-lg btn-primary btn-lg-square rounded-circle me-3" href="#!">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-lg btn-primary btn-lg-square rounded-circle" href="#!">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
