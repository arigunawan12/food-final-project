// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./login.css";
import { Col, Container, Row, Form } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
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
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);

          const role = res.data.user.role;
          localStorage.setItem("role", role);

          const name = res.data.user.name;
          localStorage.setItem("name", name);

          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
        });
    },
  });

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Sign In</h2>
            <Form id="form" className="flex flex-col" onSubmit={formik.handleSubmit}>
              <label>Email address</label>
              <Form.Control type="email" placeholder="email" name="email" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email ? <div className="no-input">{formik.errors.email}</div> : null}

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Form.Control type="password" name="password" placeholder="password" {...formik.getFieldProps("password")} autoComplete="off" />
              {formik.touched.password && formik.errors.password ? <div className="no-input">{formik.errors.password}</div> : null}

              <button className="btn btn-primary submit-btn">Sign In</button>
            </Form>
          </Col>

          <Col>
            <h2>Column 2</h2>
            <p>Some text..</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
