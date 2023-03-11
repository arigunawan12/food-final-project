import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
// import chicken from "../images/chicken.png";
// import salmon from "../images/salmon.png";
// import tuna from "../images/tuna.png";

const onSubmit = (values, { resetForm }) => {
  axios({
    method: "post",
    url: "https://api-bootcamp.do.dibimbing.id/api/v1/register",
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
      passwordRepeat: values.passwordRepeat,
      role: values.role,
      profilePictureUrl: values.profilePictureUrl,
      phoneNumber: values.phoneNumber,
    },
    headers: {
      apiKey: process.env.REACT_APP_APIKEY,
    },
  })
    .then((response) => {
      console.log(response);
      resetForm({ values: "" });
      alert("Your account was created successfully! Please Log In to access the website!");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.log(error);
      alert(`${error.response.data.message}`);
    });
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="form-select" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

const Register = () => {
  return (
    <section>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordRepeat: "",
          role: "",
          profilePictureUrl: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(6, "Must be 6 characters or more").max(20, "Must be 20 characters or less").required("Required"),
          email: Yup.string().email("Invalid email address").required("Required"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .max(20, "Must be 20 characters or less")
            .matches(/^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/, "Password must contain atleast one letter and one number")
            .required("Required"),
          passwordRepeat: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords does not match")
            .required("Required"),
          role: Yup.string().oneOf(["admin", "general"], "Invalid Job Type").required("Required"),
          profilePictureUrl: Yup.string().required("Required"),
          phoneNumber: Yup.string()
            .min(10, "Must be 10 characters or more")
            .max(12, "Must be 12 characters or less")
            .matches(/^[0-9]{10,12}$/, "Must be in digit")
            .required("Required"),
        })}
        onSubmit={onSubmit}
      >
        <div className="container-md mb-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-3">
              {/* <img
                src={chicken}
                alt="chicken"
                style={{ maxWidth: `70%` }}
                className="img-fluid"
              />
              <img
                src={salmon}
                alt="salmon"
                style={{ maxWidth: `70%` }}
                className="img-fluid"
              />
              <img
                src={tuna}
                alt="tuna"
                style={{ maxWidth: `70%` }}
                className="img-fluid"
              /> */}
            </div>
            <div className="col-md-4 border rounded p-4 shadow">
              <div className="text-center">
                <h2 className="color1">Register</h2>
                <p>
                  Already have an account?
                  <Link className="text-decoration-none m-1 color2" to="/login">
                    Login
                  </Link>
                </p>
              </div>
              <Form>
                <MyTextInput label="Name" name="name" type="text" placeholder="Jane Doe" />

                <MyTextInput label="Email Address" name="email" type="email" placeholder="janedoe@yahoo.com" />

                <MyTextInput label="Password" name="password" type="password" placeholder="Password" />

                <MyTextInput label="Confirm Password" name="passwordRepeat" type="password" placeholder="Confirm Password" />

                <MySelect label="Role" name="role">
                  <option value="">Select a Role</option>
                  <option value="admin">Admin</option>
                  <option value="general">General</option>
                </MySelect>

                <MyTextInput label="Profile Picture URL" name="profilePictureUrl" type="url" placeholder="Profile Picture URL" />

                <MyTextInput label="Phone Number" name="phoneNumber" type="tel" placeholder="Phone Number" />
                <div className="text-center ">
                  <button type="submit" className="btn bgcolor1 text-light btn-warning shadow">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};

export default Register;
