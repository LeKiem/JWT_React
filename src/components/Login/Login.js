import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Login.scss";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../../context/UserContex";
// import { Link } from "react-router-dom";
const Login = (props) => {
  const { loginContext } = React.useContext(UserContext);
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultObjValidInout = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInout);

  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInout);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInout, isValidValueLogin: false });

      toast.error("Please enter your email address or phone number");
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInout, isValidPassword: false });
      toast.error("Please enter your epassword");
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;
      let data = {
        isAuthnticated: true,
        token: token,
        account: { groupWithRoles, email, username },
      };
      loginContext(data);
      history.push("/users");
      // window.location.reload();
    }
    if (response && response.EC !== 0) {
      toast.error(response.EM);
    }
    // alert("me");
  };

  const handlePresEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
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

            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? "form-control"
                  : " is-invalid form-control"
              }
              placeholder="Email address or  phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? "form-control"
                  : " is-invalid form-control"
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={(event) => handlePresEnter(event)}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
            <span className="text-center">
              {" "}
              <a className="forgot-password" href="#">
                Forgot your password
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
