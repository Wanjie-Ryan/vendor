import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <section className="register">
        <div className="regsiter-container">
          <p className="home-link title">Superb Kitchen-Vendor</p>
          <p className="register-text">Login</p>

          <form className="form">
            <div className="form-container">
              <div className="name-label">
                <label>Email</label>
              </div>
              <div className="input-container">
                <input type="email" placeholder="enter your Email" />
              </div>
            </div>

            <div className="form-container">
              <div className="name-label">
                <label>Password</label>
              </div>
              <div className="input-container-pwd">
                <input type="password" placeholder="enter your Password" />
                <AiOutlineEye className="toggle-password" />
              </div>
            </div>

            <Link to="/dashboard">
              <button type="submit" className="submit-btn">
                Let's Go
              </button>
            </Link>
            <Link to="/login" className="login-p">
              <p>Not yet Registered? Register</p>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
