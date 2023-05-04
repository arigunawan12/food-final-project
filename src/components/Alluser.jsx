import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import { Card } from "react-bootstrap";

import defaultImage from "./images/default.webp";
import "../style.css";

const Alluser = () => {
  const [data, setData] = useState();

  const onImageError = (e) => {
    e.target.src = defaultImage;
  };

  const getAllUser = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/all-user`,
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
    getAllUser();
  }, []);

  const onSubmit = (values) => {
    if (window.confirm("Are you sure you want to change the role? You can still update it in the future."))
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}api/v1/update-user-role/${values.id}`,
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
          alert("Role has been updated.");
          window.location.reload();
          getAllUser();
        })
        .catch((error) => {
          console.log(error);
        });
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
    <section>
      <div className="container-md">
        <div className="text-center">
          <h2>All User</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
          {data &&
            data.data.map((r) => {
              return (
                <Card style={{ width: "18rem" }} key={r.id}>
                  <div className="card h-100 card-user shadow">
                    <h5 className="card-title text-center my-2">{r.name}</h5>
                    <Card.Img src={r.profilePictureUrl ? r.profilePictureUrl : defaultImage} className="img-card-profile mx-auto mb-2" alt={r.name} onError={onImageError} />
                    <div className="card-body card-body-style">
                      <p className="card-text">
                        <i className="bi bi-person-circle me-2"></i>
                        {r.role}
                      </p>
                      <p className="card-text">
                        <i className="bi bi-envelope me-2"></i>
                        {r.email}
                      </p>
                      <p className="card-text">
                        <i class="bi bi-telephone me-2"></i>
                        {r.phoneNumber}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#staticBackdrop_${r.id}`}>
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="modal fade" id={`staticBackdrop_${r.id}`} tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                    <div className="modal-dialog modal-md">
                      <div className="modal-content">
                        <div className="modal-body">
                          <Formik
                            initialValues={{
                              role: r.role,
                              id: r.id,
                            }}
                            enableReinitialize={true}
                            validationSchema={Yup.object({
                              role: Yup.string().oneOf(["admin", "general"], "Invalid Job Type"),
                            })}
                            onSubmit={onSubmit}
                          >
                            <div className="container-md my-3">
                              <div className="text-center">
                                <h2>Update Role</h2>
                              </div>
                              <div className="row justify-content-center my-3">
                                <div className="col-md-12">
                                  <Card.Img src={r.profilePictureUrl ? r.profilePictureUrl : defaultImage} className="img-card-profile mx-auto" alt={r.name} />

                                  <h3 className="card-title text-center mt-2">{r.name}</h3>
                                  <Form>
                                    <MySelect label="Role" name="role">
                                      <option value="">Select a Role</option>
                                      <option value="admin">Admin</option>
                                      <option value="general">General</option>
                                    </MySelect>

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
                </Card>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Alluser;
