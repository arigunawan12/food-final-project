import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../carousel/Carousel";

const Home = () => {
  const [data, setData] = useState();

  const getFoodData = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/foods`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const handleLike = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/like`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/unlike`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Carousel />

      <section>
        <div className="container-md">
          <hr className="bg-light lines-style mt-5 mb-5" style={{ border: `0`, borderTop: `1px solid rgba(0, 0, 0, 0.5)` }} />
          <h1 className="text-danger mt-4 fw-bolder">
            <span className="color1">Food</span>
            <span className="color2 m-1">Record</span>
          </h1>
          <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-5">
            {data &&
              data.data.map((r) => {
                return (
                  <div className="card-group col-lg-3 col-md-6" key={r.id}>
                    <div className="card h-100 food-card shadow mt-3">
                      <img src={r.imageUrl} className="card-img-top mx-auto h-50" alt={r.name} />
                      <div className="card-body">
                        <h5 className="card-title text-center">{r.name}</h5>
                        <p className="card-text">{r.description}</p>
                        <i className="fa-brands fa-elementor">
                          {r.ingredients.map((m, index) => {
                            return <span key={index}>{(index ? ", " : "") + m}</span>;
                          })}
                        </i>
                      </div>
                      <div className="card-footer d-flex justify-conten-between">
                        <div className="text-muted">
                          <i className="bi bi-star-fill m-1" style={{ color: `gold` }}></i>

                          {r.rating}
                        </div>

                        <button type="button" className="btn btn-danger p-2 mx-auto b">
                          {" "}
                          <Link to={`/foodrating/${r.id}`} style={{ color: "#fff", textDecoration: "none" }}>
                            Detail's
                          </Link>
                        </button>
                        <div className="text-muted">
                          <i className="bi bi-heart-fill m-1" style={{ color: `${r.isLike ? "#DD4A48" : "#C8C6C6"}` }} onClick={() => handleLike(r.id, r.isLike)}></i>
                          {r.totalLikes}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
