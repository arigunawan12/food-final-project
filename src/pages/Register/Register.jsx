import { useNavigate } from "react-router-dom";
import { useFormik, Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import "./register.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(5, "Too Short!").max(15, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match")
    .required("Required"),
  role: Yup.string().oneOf(["admin", "user"], "Select Role").required("Required"),
  phoneNumber: Yup.string()
    .min(10, "Must be 10 characters or more")
    .max(12, "Must be 12 characters or less")
    .matches(/^[0-9]{10,12}$/, "Must be in digit")
    .required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    handleSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/register`, values, {
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
          data: {
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            role: values.role,
            profilePictureUrl: values.profilePictureUrl,
            phoneNumber: values.phoneNumber,
          },
        })
        .then(() => {
          alert("Your account has been succesfully register");
          navigate("/login");
        });
    },
  });

  return (
    <>
      <div className="row">
        <div className="column">
          <h2>Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordRepeat: "",
              role: "",
              phoneNumber: "",
            }}
            validationSchema={SignupSchema}
          >
            {({ errors, touched }) => (
              <Form onSubmit={formik.handleSubmit}>
                <label>Full Name</label>
                <Field type="text" placeholder="name" name="name" {...formik.getFieldProps("name")} />
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
                <ErrorMessage name="name" />

                <label>Email address</label>
                <Field type="email" placeholder="email" name="email" {...formik.getFieldProps("email")} />
                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                <ErrorMessage name="email" />

                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field type="password" name="password" placeholder="password" {...formik.getFieldProps("password")} autoComplete="off" />
                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                <ErrorMessage name="password" />

                <div>Confirm Password</div>
                <Field type="password" name="passwordRepeat" placeholder="Confirm password" {...formik.getFieldProps("passwordRepeat")} />
                {errors.passwordRepeat && touched.passwordRepeat ? <div>{errors.passwordRepeat}</div> : null}
                <ErrorMessage name="passwordRepeat" />

                <div>Role</div>
                <Field as="select" name="role" multiple={false}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Field>

                <div>Phone Number</div>
                <Field id="phoneNumber" name="phoneNumber" type="text" placeholder="Enter phone number" {...formik.getFieldProps("phoneNumber")} />
                {/* {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="no-input">{formik.errors.phoneNumber}</div> : null} */}

                <div>
                  <label> Upload File</label>
                  <input type="file" name="photo" accept="image/*" onChange={(e) => formik.setFieldValue("photo", e.currentTarget.files[0])} />
                </div>
                {/* {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="no-input">{formik.errors.phoneNumber}</div> : null} */}

                <button className="btn btn-primary submit-btn">Sign In</button>
              </Form>
            )}
          </Formik>
          <div className="bottom-container text-center">
            <p>
              Have an account? <button onClick={() => navigate("/login")}> Login</button>
            </p>
          </div>
        </div>
        {/* <div className="column">
          <h2>Column 2</h2>
          <p>Some text..</p>
        </div> */}
      </div>
    </>
  );
};

export default Login;
