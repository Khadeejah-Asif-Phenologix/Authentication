import React, { useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(username, password));

    const token = Cookies.get("token") || localStorage.getItem("token");

    if (token) 
    {
      navigate("/dashboard");
    }
    
    if (rememberMe) {
      Cookies.set("token", "your-token-here", { expires: 7 });
    } else {
      Cookies.remove("token");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone illustration"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form1Example13"
                  className="form-control form-control-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example13">
                  Username
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="form1Example3"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Sign in
              </button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#3b5998" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
              </a>
              <a
                className="btn btn-primary btn-lg btn-block"
                style={{ backgroundColor: "#55acee" }}
                href="#!"
                role="button"
              >
                <i className="fab fa-twitter me-2"></i>Continue with Twitter
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;