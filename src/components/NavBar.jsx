import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style.css";
import meat from "./images/meat.webp";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [name, setName] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          setName(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        alert(`${response.data.message}`);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <div className="container-md">
        <Link className="navbar-brand" to="/">
          <img src={meat} alt="foodAddict" width="30" height="30" className="m-1" />
          <span className="text-light m-1 fw-bold">Food</span>
          <span className="text-danger fw-bold">Recipe</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item ">
                  <Link className="nav-link fw-bold text-light" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-light" to="/myfavorite">
                    My Favorite
                  </Link>
                </li>
              </>
            ) : null}
            {localStorage.getItem("role") === "admin" ? (
              <li className="nav-item fw-bold">
                <Link className="nav-link text-light" to="/foodboard">
                  Food Recipe
                </Link>
              </li>
            ) : null}
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {localStorage.getItem("token") ? (
                <li className="nav-item dropdown">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="nav-link dropdown-toggle fw-bold text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {name}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item fw-bold text-dark" to={`/profile`}>
                        My Profile
                      </Link>
                    </li>
                    {localStorage.getItem("role") === "admin" ? (
                      <li>
                        <Link className="dropdown-item fw-bold text-dark" to="/alluser">
                          All user
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <Link className="dropdown-item fw-bold text-dark" to="#" onClick={() => handleLogout()}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
