import "./Login.scss";
const Login = (props) => {
  return (
    <div className="login-container mt-4">
      <div className="container">
        <div className="row">
          <div className="content-left col-7 ">
            <div className="brand">JWT App</div>
            <div className="tittle">Learn react with Eric</div>
          </div>
          <div className="content-right col-5  d-flex flex-column gap-3 py-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email address or  phone numbers"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Login</button>
            <span className="text-center"> Forgot your password</span>
            <hr />
            <div className="text-center">
              <button className="btn btn-success"> Create new account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
