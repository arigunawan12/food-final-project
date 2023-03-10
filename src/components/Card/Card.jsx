import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import "./style.css";

function ListCard() {
  const [allFoods, setAllFoods] = useState([]);

  const getFood = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}api/v1/foods`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
      .then((res) => {
        setAllFoods(res.data.data);
      })
      .catch(() => {
        alert("An error has occurred. Please reload the page.");
      });
  };

  useEffect(() => {
    getFood();
  }, []);

  const handleLikes = (id, isLike) => {
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
        .then((res) => {
          console.log(res);
          getFood();
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
          getFood();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container>
        <Row>
          {allFoods &&
            allFoods.map((food) => {
              return (
                <Col xs={12} sm={6} md={4} lg={3} className="my-3">
                  <CardGroup style={{ height: "520px" }}>
                    <Card style={{ width: "18rem" }} border="secondary" key={food.id} className="justify-content-md-center">
                      <Card.Img variant="top" src={food.imageUrl} alt={food.name} style={{ height: "305px", objectFit: "cover" }} />
                      <Card.Body>
                        <a key={food.id} href={`/details/${food.id}`}>
                          <h4 className="text-capitalize">{food.name}</h4>
                        </a>
                        <Card.Text>{food.description} </Card.Text>
                        <span className="card-symbols">
                          <i className="bi bi-star-fill" style={{ color: "#FFCC00" }}></i> {food.rating} |{" "}
                          <i
                            className="bi bi-heart-fill"
                            style={{
                              color: `${food.isLike ? "#DD4A48" : "#C8C6C6"}`,
                              cursor: "pointer",
                            }}
                            onClick={() => handleLikes(food.id, food.isLike)}
                          ></i>
                          {food.totalLikes}
                        </span>
                      </Card.Body>
                      <button className="button button-primary">Find out more</button>
                    </Card>
                  </CardGroup>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default ListCard;
