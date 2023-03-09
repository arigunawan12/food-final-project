import React from "react";
import kebab from "../../Images/kebab.jpg";
import toast from "../../Images/toast.jpg";
import spaghetti from "../../Images/spaghetti.jpg";

const Carousel = () => {
  return (
    <section>
      <div className="container-fluid p-0">
        <div id="myCarousel" className="carousel slide carousel-fade mb-4" data-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ backgroundImage: `url(${kebab})` }}></div>
            <div className="carousel-item" style={{ backgroundImage: `url(${toast})` }}></div>
            <div className="carousel-item" style={{ backgroundImage: `url(${spaghetti})` }}></div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
