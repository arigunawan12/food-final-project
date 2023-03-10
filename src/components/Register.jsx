import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const onSubmit = (values, { resetForm }) => {
  axios({
    method: "post",
    url: `${process.env.REACT_APP_BASEURL}api/v1/register`,
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
    <section className="background">
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
          email: Yup.string().email("Invalid email address").required("Please Enter your email"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .max(20, "Must be 20 characters or less")
            .matches(/^.*(?=.*\d)((?=.*[a-zA-Z]){1}).*$/, "Password must contain atleast one letter and one number")
            .required("Please Enter your password"),
          passwordRepeat: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords does not match")
            .required("Please Enter your password confirmation"),
          role: Yup.string().oneOf(["admin", "general"], "Invalid Job Type").required("Required"),
          profilePictureUrl: Yup.string().required("Please upload your profile photo"),
          phoneNumber: Yup.string()
            .min(10, "Must be 10 characters or more")
            .max(12, "Must be 12 characters or less")
            .matches(/^[0-9]{10,12}$/, "Must be in digit")
            .required("Please Enter your phone number"),
        })}
        onSubmit={onSubmit}
      >
        <div className="container-md mb-3 mt-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4 border border-danger rounded p-4 my-5 shadow">
              <div className="text-center">
                <h2 className="color1">Register</h2>
                <h4>
                  Already have an account?
                  <Link className="text-decoration-none m-1 color2" to="/login">
                    Login
                  </Link>
                </h4>
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
                  <button type="submit" className="btn btn-danger">
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
