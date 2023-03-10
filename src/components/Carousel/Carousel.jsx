import React from "react";
import kebab from "../../Images/kebab.jpg";
import toast from "../../Images/toast.jpg";
import spaghetti from "../../Images/spaghetti.jpg";
import "./style.css";

const carousel = () => {
  return (
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={kebab} class="d-block w-100" alt="..." />
        </div>

        <div class="carousel-item active">
          <img src={toast} class="d-block w-100" alt="..." />
        </div>

        <div class="carousel-item active">
          <img src={spaghetti} class="d-block w-100" alt="..." />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default carousel;
