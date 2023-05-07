import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row, FloatingLabel, Form, Button } from "react-bootstrap";

const Register = () => {
  const d = new Date();
  let year = d.getFullYear();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Must be 5 characters or more").max(15, "Must be less than 15 characters").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .max(15, "Must be less than 15 characters")
        .matches(/^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/, "Password must contain atleast one letter and one number")
        .required("Required"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password does not match")
        .required("Required"),
      role: Yup.string().oneOf(["admin", "user"], "Select Role").required("Required"),
      phoneNumber: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(12, "Must be 12 characters or less")
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/register`,
        values,
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          profilePictureUrl: values.profilePictureUrl,
          phoneNumber: values.phoneNumber,
        },
      })
        .then((res) => {
          console.log(res);
          alert("Your account was created successfully! Please Log In to access the website!");
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("Registration failed. Please try again!");
        });
    },
  });
  return (
    <>
      <Container fluid className="login-container">
        <Row className="justify-content-center align-items-center" style={{ height: "calc(100vh - 60px)" }}>
          <Col className="col-xl-3 col-lg-4 col-md-6  mx-3 border border-light rounded bg-light">
            <p className="text-center mt-4 fs-2 text">Register</p>
            <Form onSubmit={formik.handleSubmit}>
              <FloatingLabel label="Full Name" className="mb-3">
                <Form.Control id="name" name="name" type="text" placeholder="John Doe" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
              </FloatingLabel>
              {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

              <FloatingLabel label="Email" className="mb-3">
                <Form.Control id="email" name="email" type="email" placeholder="name@example.com" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <div className="no-input">{formik.errors.email}</div> : null}
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-3">
                <Form.Control id="password" name="password" type="password" placeholder="********" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </FloatingLabel>

              <FloatingLabel label="Password Confirmation" className="mb-3">
                <Form.Control id="passwordRepeat" name="passwordRepeat" type="password" placeholder="********" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordRepeat} />
                {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? <div>{formik.errors.passwordRepeat}</div> : null}
              </FloatingLabel>

              <FloatingLabel label="Role" className="mb-3">
                <Form.Select aria-label="Default select example" id="role" name="role" multiple={false} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role}>
                  <option>Select Your Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel label="Phone Number" className="mb-3">
                <Form.Control id="phoneNumber" name="phoneNumber" type="tel" placeholder="081xx" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNumber} />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}
              </FloatingLabel>

              <FloatingLabel label="Profile Picture" className="mb-3">
                <Form.Control id="profilePictureUrl" name="profilePictureUrl" type="link" placeholder="https://" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profilePictureUrl} />
                {formik.touched.profilePictureUrl && formik.errors.profilePictureUrl ? <div>{formik.errors.profilePictureUrl}</div> : null}
              </FloatingLabel>

              <div className="text-center mt-3 d-grid gap-2">
                <Button type="submit" value="Register" className="btn btn-danger">
                  Register
                </Button>
              </div>
            </Form>
            <div className="text-center mt-2">
              <p>
                Have an account?
                <span>
                  <Link to="/login" className="bottom-hyperlink" style={{ textDecoration: "none", fontWeight: "bold" }}>
                    Sign in here.
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
};

export default Register;
