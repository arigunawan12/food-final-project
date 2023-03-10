import axios from "axios";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import AttachImage from "../../components/Attach Image/AttachImage";
import { Container, Button } from "react-bootstrap";
// import avatarImage from "../../img/avatar.webp";


function Profile() {
  const [profile, setProfile] = useState();
  // const [savePicture, setSavePicture] = useState("");

  const onImageError = (e) => {
    e.target.src = null;
  };

  const getProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}api/v1/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("An error has occurred. Please reload the page.");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}api/v1/update-profile`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: values.name,
        email: values.email,
        // profilePictureUrl: savePicture,
        phoneNumber: values.phoneNumber,
        role: values.role,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
        getProfile();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: (profile && profile.name) || "",
      email: (profile && profile.email) || "",
      phoneNumber: (profile && profile.phoneNumber) || "",
      role: (profile && profile.role) || "",
      profilePictureUrl: (profile && profile.profilePictureUrl) || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(12, "Must be 12 characters or less")
        .matches(/^[0-9]{10,12}$/, "Must be in digit"),
    }),
  });

  return (
    <>
    
      <Container className="profile-container">
        <h2>My Profile</h2>
        <Container className="profile-box">
          <div className="profile-data">
            <div className="profile-img">
              <img
                src={
                  profile && profile.profilePictureUrl
                    ? profile.profilePictureUrl
                    : null
                }
                alt={profile && profile.name}
                onError={onImageError}
              />
            </div>
            <div className="profile-text">
              <h3>{profile && profile.name}</h3>
              <p>
                <i className="bi bi-envelope-at-fill"></i>{" "}
                {profile && profile.email}
              </p>
              <p>
                <i className="bi bi-phone-vibrate-fill"></i>{" "}
                {profile && profile.phoneNumber}
              </p>
              <p className="text-capitalize">
                <i className="bi bi-file-person-fill"></i>{" "}
                {profile && profile.role}
              </p>
            </div>
            <div className="card-footer profile-footer">
              <Button
                className="profile-button"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Container>
      </Container>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "flex !important" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <Container className="profile-modal">
              <h3
                className="text-center"
                style={{ fontFamily: "'General Sans', sans-serif" }}
              >
                Edit Profile
              </h3>

              <div className="modal-body form-modal">
                <form onSubmit={(e) => handleSubmit(e, profile.id)}>
                  <div className="form-img">
                    <img
                      src={
                        profile && profile.profilePictureUrl
                          ? profile.profilePictureUrl
                          : null
                      }
                      alt={profile && profile.name}
                      onError={onImageError}
                    />
                  </div>
                  <div htmlFor="inputName" className="form-label">
                    Name
                  </div>
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="form-input"
                    id="name"
                    placeholder="Enter name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="no-input">{formik.errors.name}</div>
                  ) : null}

                  <div htmlFor="inputAge" className="form-label">
                    Email
                  </div>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="form-input"
                    id="email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="no-input">{formik.errors.email}</div>
                  ) : null}

                  <div className="form-label">
                    Upload Picture (JPG/PNG/JPEG)
                  </div>
                  {/* <AttachImage onChange={(value) => setSavePicture(value)} /> */}

                  <div htmlFor="inputAge" className="form-label">
                    Phone Number
                  </div>
                  <input
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="form-input"
                    id="phoneNumber"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="no-input">{formik.errors.phoneNumber}</div>
                  ) : null}

                  <div className="text-end user-buttons">
                    <Button className="save-button" type="submit">
                      Save Changes
                    </Button>
                    <Button
                      className="cancel-button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
