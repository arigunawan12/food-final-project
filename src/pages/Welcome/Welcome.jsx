import React from "react";

import { useFormik } from "formik";
import { Navbar, Footer, Card } from "../../components";
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = () => {
  const formik = useFormik({});
  console.log(formik);
  return (
    <>
      <Navbar />
      <Card />
      <div className="container">
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
          <div style={{ width: "100%" }}>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Welcome</div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, repudiandae?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
