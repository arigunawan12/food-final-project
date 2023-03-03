import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePictureUrl, setprofilePictureUrl] = useState("");

  // validation
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordRepeat", passwordRepeat);
    formData.append("role", role);
    formData.append("phoneNumber", phoneNumber);
    formData.append("profilePictureUrl", profilePictureUrl);

    await axios
      .post(`${process.env.REACT_APP_BASEURL}api/v1/register`, formData, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        setValidation(error.response.data);
      });
  };
  return (
    <>
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
          <span>register and enjoy the service</span>

          <form id="form" className="flex flex-col" onSubmit={registerHandler}>
            <input type="text" placeholder="Nama Lengkap" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {validation.name && <small className="text-danger">{validation.name[0]}</small>}

            <input type="email" placeholder="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {validation.email && <small className="text-danger">{validation.email[0]}</small>}

            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {validation.password && <small className="text-danger">{validation.password[0]}</small>}

            <input type="password" placeholder="confirm password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
            <input type="number" placeholder="mobile number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <select>
              <option value={role} onChange={(e) => setRole(e.target.value)}>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <input type="file" placeholder="upload image" value={profilePictureUrl} onChange={(e) => setprofilePictureUrl(e.target.value)} />
            <button className="btn">Sign In</button>
          </form>
        </div>
        <div className="col-2">
          <img src="" alt="" />
        </div>
      </div>
    </>
  );
};

export default Register;
