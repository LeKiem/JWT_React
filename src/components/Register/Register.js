import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Register.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [objCheckInput, setObjCheckInput] = useState({
  //   isValidEmail: true,
  //   isValidPhone: true,
  //   isValidPassword: true,
  //   isValidConfirmPassword: true,
  // });

  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);
    let re = /\S+@\S+\.\S+/;
    if (!email) {
      toast.error("Email is required!");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!re.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email addres!");
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required!");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required!");
      return false;
    }
    // eslint-disable-next-line eqeqeq
    if (password != confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false });
      toast.error("Your password is not the same!");
      return false;
    }

    return true;
  };
  const handleRegister = () => {
    // alert("me");
    // toast.error("Wow so easy !");
    let check = isValidInput();

    if (check === true) {
      axios.post("http://localhost:8080/api/v1/register", {
        email,
        phone,
        username,
        password,
      });
    }
  };
  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/test-api").then((data) => {
    //   console.log(data);
    // // });
    // axios.post("http://localhost:8080/api/v1/register", {
    //   email,
    //   phone,
    //   username,
    //   password,
    // });
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
                className={
                  objCheckInput.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                className={
                  objCheckInput.isValidPhone
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
                className={
                  objCheckInput.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Re_enter password</label>
              <input
                type="password"
                className={
                  objCheckInput.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
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
