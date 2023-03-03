import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post(`${process.env.REACT_APP_BASEURL}api/v1/login`, formData, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        setValidation(error.response.data);
      });
  };

  return (
    <>
      <div className="login">
        <div className="col-1">
          <h2>Sign In</h2>
          <span>register and enjoy the service</span>

          <form id="form" className="flex flex-col" onSubmit={loginHandler}>
            <input type="email" placeholder="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {validation.email && <small className="text-danger">{validation.email[0]}</small>}

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {validation.password && <small className="text-danger">{validation.password[0]}</small>}
            <button className="btn">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
