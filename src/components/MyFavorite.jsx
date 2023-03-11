import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyFavorite = () => {
  const [data, setData] = useState();

  const getLikeFood = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/like-foods`,
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
    getLikeFood();
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getLikeFood();
  };

  return (
    <section>
      <div className="container-md">
        <h2 className="color1 text-center mt-4 fw-bolder">My Favorite</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
          {data &&
            data.data.map((r) => {
              return (
                <div className="card-group" key={r.id}>
                  <div className="card h-100 food-card shadow">
                    <img src={r.imageUrl} className="card-img-top food-card-image mx-auto" alt={r.name} />
                    <div className="card-body">
                      <h5 className="card-title text-center">{r.name}</h5>
                      <p className="card-text">{r.description}</p>
                      <i className="fa-brands fa-elementor">
                        {r.ingredients.map((m, index) => {
                          return <span key={index}>{(index ? ", " : "") + m}</span>;
                        })}
                      </i>
                    </div>
                    <div className="card-footer ">
                      <small className="text-muted">
                        <Link to={`/foodrating/${r.id}`}>
                          <i className="bi bi-star-fill" style={{ color: `gold` }}></i>
                        </Link>
                        {r.rating}
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-heart-fill m-1" style={{ color: `${r.isLike ? "red" : ""}` }} onClick={() => handleLike(r.id, r.isLike)}></i>
                        {r.totalLikes}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default MyFavorite;
