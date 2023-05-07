import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import defaultImage from "./images/default.webp";

const Profile = () => {
  const [data, setData] = useState();
  const onImageError = (e) => {
    e.target.src = defaultImage;
  };

  const getUserProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: process.env.REACT_APP_APIKEY,
      },
    })
      .then((response) => {
        setData(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/update-profile`,
      data: {
        name: values.name,
        email: values.email,
        profilePictureUrl: values.profilePictureUrl,
        phoneNumber: values.phoneNumber,
      },
      headers: {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response);
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}api/v1/update-user-role/${data && data.id}`,
          data: {
            role: values.role,
          },
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("role", values.role);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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

  return (
    <section style={{ height: "calc(100vh - 120px)", position: "relative" }}>
      <div className="container mx auto" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}>
        <div className="text-center">
          <h2>My Profile</h2>
        </div>
        <div className="card mx-auto card-user shadow" style={{ width: "18rem" }}>
          <img src={data && data.profilePictureUrl ? data && data.profilePictureUrl : defaultImage} className="img-fluid m-0 img-profile-page" alt={data && data.name} onError={onImageError} />
          <div className="card-body">
            <h5 className="card-title text-center">{data && data.name}</h5>
            <p className="card-text">
              <i className="fa-regular fa-id-badge m-1"></i>
              {data && data.role}
            </p>
            <p className="card-text">
              <i className="fa-regular fa-envelope m-1"></i>
              {data && data.email}
            </p>
            <p className="card-text">
              <i className="fa-solid fa-phone m-1"></i>
              {data && data.phoneNumber}
            </p>
          </div>
          <div className="card-footer text-center">
            <button type="button" className="btn btn-danger " data-bs-toggle="modal" data-bs-target="#exampleModal">
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-body">
              <Formik
                initialValues={{
                  name: data && data.name,
                  email: data && data.email,
                  profilePictureUrl: data && data.profilePictureUrl,
                  phoneNumber: data && data.phoneNumber,
                  role: data && data.role,
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                  name: Yup.string().min(6, "Must be 6 characters or more").max(20, "Must be 20 characters or less"),
                  email: Yup.string().email("Invalid email address"),
                  profilePictureUrl: Yup.string(),
                  phoneNumber: Yup.string()
                    .min(10, "Must be 10 characters or more")
                    .max(12, "Must be 12 characters or less")
                    .matches(/^[0-9]{10,12}$/, "Must be in digit"),
                  role: Yup.string().oneOf(["admin", "general"], "Invalid Job Type"),
                })}
                onSubmit={onSubmit}
              >
                <div className="container-md my-3">
                  <div className="text-center">
                    <h2>My Profile</h2>
                  </div>
                  <div className="row justify-content-center my-3">
                    <div className="col-md-12">
                      <img src={data && data.profilePictureUrl} className="img-fluid user-card-image mx-auto d-block" alt={data && data.name} />
                      <Form>
                        <MyTextInput label="Name" name="name" type="text" />

                        <MyTextInput label="Email Address" name="email" type="email" />

                        <MyTextInput label="Profile Picture URL" name="profilePictureUrl" type="url" />

                        <MyTextInput label="Phone Number" name="phoneNumber" type="tel" />

                        {localStorage.getItem("role") === "admin" ? (
                          <MySelect label="Role" name="role">
                            <option value="">Select a Role</option>
                            <option value="admin">Admin</option>
                            <option value="general">General</option>
                          </MySelect>
                        ) : null}

                        <div className="text-center">
                          <button type="submit" className="btn btn-danger">
                            Save
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
