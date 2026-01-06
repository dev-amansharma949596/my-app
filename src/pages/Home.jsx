import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../pages/Home.css";  
import Header from "../components/Header";
import Footer from "../components/Footer";
import PriceSlider from "../components/PriceSlider";
import TeamSlider from "../components/TeamSlider";
import TestimonialSlider from "../components/TestimonialSlider";  
import AppointmentModal from "../components/AppointmentModal";

export default function Home() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");  
 
  return (
    <div>
      <Header />
     

      <main>
      <section className="  bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row d-flex justify-content-start align-items-center align-self-center py-2 py-md-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h5
                className="d-inline-block text-primary text-uppercase border-bottom border-5" 
                style={{ borderColor: "rgba(256, 256, 256, .3)" }}
              >
                Welcome To Medinova
              </h5>

              <h1 className="display-2 fw-bold text-white mb-md-4">
                Best Healthcare Solution In Your City
              </h1>

              <div className="pt-2">
                <a href="/doctors" className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2">
                  Find Doctor
                </a>
                 
                <AppointmentModal />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded"
                  src="../src/assets/Img/about.jpg"
                  style={{ objectFit: "cover" }}
                  alt="About"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="mb-4">
                <h5 className="d-inline-block text-primary fw-bold text-uppercase border-bottom border-5">
                  About Us
                </h5>
                <h1 className="display-4">
                  Best Medical Care For Yourself and Your Family
                </h1>
              </div>

              <p>
                Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor
                diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet
                diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed
                stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur
                takimata eirmod, dolores takimata consetetur invidunt magna dolores
                aliquyam dolores dolore. Amet erat amet et magna
              </p>

              <div className="row g-3 pt-3">
                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-user-md text-primary mb-3" />
                    <h6 className="mb-0">
                      Qualified<small className="d-block text-primary">Doctors</small>
                    </h6>
                  </div>
                </div>

                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-procedures text-primary mb-3" />
                    <h6 className="mb-0">
                      Emergency<small className="d-block text-primary">Services</small>
                    </h6>
                  </div>
                </div>

                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-microscope text-primary mb-3" />
                    <h6 className="mb-0">
                      Accurate<small className="d-block text-primary">Testing</small>
                    </h6>
                  </div>
                </div>

                <div className="col-sm-3 col-6">
                  <div className="bg-light text-center rounded-circle py-4">
                    <i className="fa fa-3x fa-ambulance text-primary mb-3" />
                    <h6 className="mb-0">
                      Free<small className="d-block text-primary">Ambulance</small>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Services
            </h5>
            <h1 className="display-4">Excellent Medical Services</h1>
          </div>

          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-user-md text-white" />
                </div>
                <h4 className="mb-3">Emergency Care</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-procedures text-white" />
                </div>
                <h4 className="mb-3">Operation &amp; Surgery</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-stethoscope text-white" />
                </div>
                <h4 className="mb-3">Outdoor Checkup</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-ambulance text-white" />
                </div>
                <h4 className="mb-3">Ambulance Service</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-pills text-white" />
                </div>
                <h4 className="mb-3">Medicine &amp; Pharmacy</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <div className="service-icon mb-4">
                  <i className="fa fa-2x fa-microscope text-white" />
                </div>
                <h4 className="mb-3">Blood Testing</h4>
                <p className="m-0">
                  Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                  stet, justo elitr dolor amet sit
                </p>
                <a className="btn btn-lg btn-primary rounded-pill" href="#!">
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPOINTMENT */}
      <div className="container-fluid bg-primary my-5 py-5">
        <div className="container py-5">
          <div className="row gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="mb-4">
                <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
                  Appointment
                </h5>
                <h1 className="display-4">Make An Appointment For Your Family</h1>
              </div>

              <p className="text-white mb-5">
                Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum.
                Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea
                invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores
                diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus
                sed et. Takimata takimata sanctus sed.
              </p>

              <a className="btn btn-dark rounded-pill py-3 px-5 me-3" href="#!">
                Find Doctor
              </a>
              <a className="btn btn-outline-dark rounded-pill py-3 px-5" href="#!">
                Read More
              </a>
            </div>

            <div className="col-lg-6">
              <div className="bg-white text-center rounded p-5">
                <h1 className="mb-4">Book An Appointment</h1>

                <form>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select bg-light border-0"
                        style={{ height: "55px" }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose Department
                        </option>
                        <option value="1">Department 1</option>
                        <option value="2">Department 2</option>
                        <option value="3">Department 3</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select bg-light border-0"
                        style={{ height: "55px" }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select Doctor
                        </option>
                        <option value="1">Doctor 1</option>
                        <option value="2">Doctor 2</option>
                        <option value="3">Doctor 3</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Your Name"
                        style={{ height: "55px" }}
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <input
                        type="email"
                        className="form-control bg-light border-0"
                        placeholder="Your Email"
                        style={{ height: "55px" }}
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="date" id="date" data-target-input="nearest">
                        <input
                          type="text"
                          className="form-control bg-light border-0 datetimepicker-input"
                          placeholder="Date"
                          data-target="#date"
                          data-toggle="datetimepicker"
                          style={{ height: "55px" }}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="time" id="time" data-target-input="nearest">
                        <input
                          type="text"
                          className="form-control bg-light border-0 datetimepicker-input"
                          placeholder="Time"
                          data-target="#time"
                          data-toggle="datetimepicker"
                          style={{ height: "55px" }}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Make An Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Plan Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Medical Packages
            </h5>
            <h1 className="display-4">Awesome Medical Programs</h1>
          </div>

          <PriceSlider />
        </div>
      </div>
      {/* Pricing Plan End */}

      {/* Team Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Our Doctors
            </h5>
            <h1 className="display-4">Qualified Healthcare Professionals</h1>
          </div>

          <TeamSlider />
        </div>
      </div>
      {/* Team End */}

      {/* Search Start */}
      <div className="container-fluid bg-primary my-5 py-5">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">
              Find A Doctor
            </h5>
            <h1 className="display-4 mb-4">Find A Healthcare Professionals</h1>
            <h5 className="text-white fw-normal">
              Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem eos sit sed ipsum
              takimata ipsum sit est. Ipsum ea voluptua ipsum sit justo
            </h5>
          </div>

          <div className="mx-auto" style={{ width: "100%", maxWidth: "600px" }}>
            <div className="input-group">
              <select
                className="form-select border-primary w-25"
                style={{ height: "60px" }}
                defaultValue="Department"
              >
                <option value="Department" disabled>
                  Department
                </option>
                <option value="1">Department 1</option>
                <option value="2">Department 2</option>
                <option value="3">Department 3</option>
              </select>

              <input
                type="text"
                className="form-control border-primary w-50"
                placeholder="Keyword"
              />

              <button className="btn btn-dark border-0 w-25" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Search End */}

      {/* Testimonial Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Testimonial
            </h5>
            <h1 className="display-4">Patients Say About Our Services</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <TestimonialSlider />
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}

      {/* Blog Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: "500px" }}>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              Blog Post
            </h5>
            <h1 className="display-4">Our Latest Medical Blog Posts</h1>
          </div>

          <div className="row g-5">
            {/* Blog 1 */}
            <div className="col-xl-4 col-lg-6">
              <div className="bg-light rounded overflow-hidden">
                <img className="img-fluid w-100"  src="../src/assets/Img/blog-1.jpg" alt="Blog post" />
                <div className="p-4">
                  <a className="h3 d-block mb-3" href="#!">
                    Dolor clita vero elitr sea stet dolor justo diam
                  </a>
                  <p className="m-0">
                    Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum clita rebum dolor
                    stet amet justo
                  </p>
                </div>
                <div className="d-flex justify-content-between border-top p-4">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle me-2"
                       src="../src/assets/Img/user.jpg"
                      width="25"
                      height="25"
                      alt="Author"
                    />
                    <small>John Doe</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="ms-3">
                      <i className="far fa-eye text-primary me-1" />
                      12345
                    </small>
                    <small className="ms-3">
                      <i className="far fa-comment text-primary me-1" />
                      123
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="col-xl-4 col-lg-6">
              <div className="bg-light rounded overflow-hidden">
                <img className="img-fluid w-100"  src="../src/assets/Img/blog-2.jpg" alt="Blog post" />
                <div className="p-4">
                  <a className="h3 d-block mb-3" href="#!">
                    Dolor clita vero elitr sea stet dolor justo diam
                  </a>
                  <p className="m-0">
                    Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum clita rebum dolor
                    stet amet justo
                  </p>
                </div>
                <div className="d-flex justify-content-between border-top p-4">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle me-2"
                       src="../src/assets/Img/user.jpg"
                      width="25"
                      height="25"
                      alt="Author"
                    />
                    <small>John Doe</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="ms-3">
                      <i className="far fa-eye text-primary me-1" />
                      12345
                    </small>
                    <small className="ms-3">
                      <i className="far fa-comment text-primary me-1" />
                      123
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="col-xl-4 col-lg-6">
              <div className="bg-light rounded overflow-hidden">
                <img className="img-fluid w-100"  src="../src/assets/Img/blog-3.jpg" alt="Blog post" />
                <div className="p-4">
                  <a className="h3 d-block mb-3" href="#!">
                    Dolor clita vero elitr sea stet dolor justo diam
                  </a>
                  <p className="m-0">
                    Dolor lorem eos dolor duo et eirmod sea. Dolor sit magna rebum clita rebum dolor
                    stet amet justo
                  </p>
                </div>
                <div className="d-flex justify-content-between border-top p-4">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle me-2"
                       src="../src/assets/Img/user.jpg"
                      width="25"
                      height="25"
                      alt="Author"
                    />
                    <small>John Doe</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <small className="ms-3">
                      <i className="far fa-eye text-primary me-1" />
                      12345
                    </small>
                    <small className="ms-3">
                      <i className="far fa-comment text-primary me-1" />
                      123
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}
    </main>

      <Footer />
    </div>
  );
}
