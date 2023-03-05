// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import "./register.css";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Must be 5 characters or more").max(15, "Must be less than 15 characters").required("Required"),
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
    }),

    onSubmit: (values) => {
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
        })
        .catch((error) => {
          console.error(error);
          alert("Registration failed. Please try again!");
        });
    },
  });

  return (
    <>
      <div className="row">
        <div className="column">
          <h2>Sign In</h2>
          <Form id="form" className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label>Full Name</label>
            <input type="text" placeholder="name" name="name" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name ? <div className="no-input">{formik.errors.name}</div> : null}

            <label>Email address</label>
            <input type="email" placeholder="email" name="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? <div className="no-input">{formik.errors.email}</div> : null}

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" name="password" placeholder="password" {...formik.getFieldProps("password")} autoComplete="off" />
            {formik.touched.password && formik.errors.password ? <div className="no-input">{formik.errors.password}</div> : null}

            <div>Confirm Password</div>
            <input type="password" name="passwordRepeat" placeholder="Confirm password" {...formik.getFieldProps("passwordRepeat")} />
            {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? <div className="no-input">{formik.errors.passwordRepeat}</div> : null}

            <div>Role</div>
            <select id="role" name="role" component="select" multiple={false} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.role}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div>Phone Number</div>
            <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Enter phone number" {...formik.getFieldProps("phoneNumber")} />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="no-input">{formik.errors.phoneNumber}</div> : null}

            <div>
              <label> Upload File</label>
              <input type="file" name="photo" accept="image/*" onChange={(e) => formik.setFieldValue("photo", e.currentTarget.files[0])} />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div className="no-input">{formik.errors.phoneNumber}</div> : null}

            <button className="btn btn-primary submit-btn">Sign In</button>
          </Form>
          <div className="bottom-container text-center">
            <p>
              Have an account? <p onClick={() => navigate("/login")}> Login</p>
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
