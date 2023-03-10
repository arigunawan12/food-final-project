import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import thumbnail2 from "../../Images/thumbnail2.jpg";
import { Navbar } from "../../components";

const AllUsers = () => {
  const [data, setData] = useState();

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
      <Navbar />
      <div className="container-md">
        <div className="text-center">
          <h2>All User</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
          {data &&
            data.data.map((r) => {
              return (
                <div className="col" key={r.id}>
                  <div className="card h-100 card-user shadow">
                    <img src={thumbnail2} alt="thumbnail2" className="user-card-image1" />
                    <img src={r.profilePictureUrl} className="user-card-image2 img-thumbnail mx-auto" alt={r.name} />
                    <div className="card-body card-body-style">
                      <h5 className="card-title text-center">{r.name}</h5>
                      <p className="card-text">
                        <i className="fa-regular fa-id-badge m-1"></i>
                        {r.role}
                      </p>
                      <p className="card-text">
                        <i className="fa-regular fa-envelope m-1"></i>
                        {r.email}
                      </p>
                      <p className="card-text">
                        <i className="fa-solid fa-phone m-1"></i>
                        {r.phoneNumber}
                      </p>
                    </div>
                    <div className="card-footer text-center">
                      <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#staticBackdrop_${r.id}`}>
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
                                <h2>Profile</h2>
                              </div>
                              <div className="row justify-content-center my-3">
                                <div className="col-md-12">
                                  <img src={r.profilePictureUrl} className="img-fluid user-card-image mx-auto d-block" alt={r.name} />
                                  <h5 className="card-title text-center mt-2">{r.name}</h5>
                                  <Form>
                                    <MySelect label="Role" name="role">
                                      <option value="">Select a Role</option>
                                      <option value="admin">Admin</option>
                                      <option value="general">General</option>
                                    </MySelect>

                                    <div className="text-center">
                                      <button type="submit" className="btn btn-dark">
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
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
