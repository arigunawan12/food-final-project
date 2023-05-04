import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row, FloatingLabel, Form, Button } from "react-bootstrap";

function Login() {
  const d = new Date();
  let year = d.getFullYear();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
    }),

    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/login`, values, {
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
          data: {
            email: values.email,
            password: values.password,
          },
        })
        .then((res) => {
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("role", user.role);
          localStorage.setItem("name", user.name);

          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
        });
    },
  });

  return (
    <>
      <Container fluid className="login-container">
        <Row className="justify-content-center align-items-center mt-5" style={{ height: "calc(100vh - 60px)" }}>
          <Col className="col-xl-3 col-lg-4 col-md-6  mx-3 border border-light rounded bg-light">
            <p className="text-center mt-4 fs-2 text">Login</p>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <FloatingLabel label="Email address" className="mb-3">
                  <Form.Control id="email" name="email" type="email" placeholder="name@example.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                  {formik.touched.email && formik.errors.email ? <div className="no-input">{formik.errors.email}</div> : null}
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel label="Password">
                  <Form.Control type="password" placeholder="Password" id="password" name="password" autoComplete="current-password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                  {formik.touched.password && formik.errors.password ? <div className="no-input">{formik.errors.password}</div> : null}
                </FloatingLabel>
              </Form.Group>
              <div className="text-center mt-3 d-grid gap-2">
                <Button type="submit" value="Login" className="btn btn-danger">
                  Log In
                </Button>
              </div>
            </Form>
            <div className="text-center">
              <p>
                Are you new?{" "}
                <span>
                  <Link to="/register" className="bottom-hyperlink" style={{ textDecoration: "none", fontWeight: "bold" }}>
                    Sign up here.
                  </Link>
                </span>
              </p>
            </div>
          </Col>
        </Row>
        <div className="h4 text-center mt-2 bg-transparent text-light" display={{ height: "60px" }}>
          © All Rights Reserved <span>{year}</span>. Created by <b>Wahyu Ari Gunawan</b>.
        </div>
      </Container>
    </>
  );
}

export default Login;
