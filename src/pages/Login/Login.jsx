// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./login.css";
import { Footer, Navbar } from "../../components/index";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
    }),

    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}api/v1/login`, values, {
          headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
          data: {
            email: values.email,
            password: values.password,
          },
        })
        .then((res) => {
          const token = res.data.token;
          console.log(token);
          localStorage.setItem("token", token);

          const role = res.data.user.role;
          localStorage.setItem("role", role);

          const name = res.data.user.name;
          localStorage.setItem("name", name);

          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid email and/or password.");
        });
    },
  });

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="column">
          <h2>Sign In</h2>
          <form id="form" className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label>Email address</label>
            <input type="email" placeholder="email" name="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? <div className="no-input">{formik.errors.email}</div> : null}

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" name="password" placeholder="password" {...formik.getFieldProps("password")} autoComplete="off" />
            {formik.touched.password && formik.errors.password ? <div className="no-input">{formik.errors.password}</div> : null}

            <button className="btn btn-primary submit-btn">Sign In</button>
          </form>
        </div>
        <div className="column">
          <h2>Column 2</h2>
          <p>Some text..</p>
        </div>
        <footer>
          <Footer />
        </footer>
        ;
      </div>
    </>
  );
};

export default Login;
