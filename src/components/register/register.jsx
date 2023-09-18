import React, { useState, useEffect } from "react";
import "./reg-log.css";
import pic5 from "../../images/kitchen-5.jpg";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
function Register() {
  const [contact, setContact] = useState("+254");
  const handleContact = (phoneNumber) => {
    setContact(phoneNumber);
  };

  return (
    <>
      <section className="register">
        <div className="regsiter-container">
          <p className="home-link title">Superb Kitchen-Vendor</p>
          <p className="register-text">Register</p>

          <form className="form">
            <div className="form-container">
              <div className="name-label">
                <label>Name</label>
              </div>
              <div className="input-container">
                <input type="text" placeholder="enter your name" />
              </div>
            </div>

            <div className="form-container">
              <div className="name-label">
                <label>Email</label>
              </div>
              <div className="input-container">
                <input type="email" placeholder="enter your Email" />
              </div>
            </div>

            <div className="form-container">
              
              <div className="input-container">
                <PhoneInput
                  placeholder="Your Phone Number"
                  className="pwd-input"
                  onChange={handleContact}
                  value={contact}
                />
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

            <button type="submit" className="submit-btn">
              Let's Go
            </button>
            <Link to="/login" className="login-p">
              <p>Already Registered? Sign-In</p>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
