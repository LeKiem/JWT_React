import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  const handleRegister = () => {
    // alert("me");
    let userData = { email, phone, username, password };
    console.log("data", userData);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/api/test-api").then((data) => {
      // console.log(data);
    });
  }, []);
  return (
    <div className="register-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">JWT App</div>
            <div className="tittle">
              App giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của
              bạn.
            </div>
          </div>

          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">JWT App</div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="User Name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re_enter password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re_enter password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already's an account . Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
