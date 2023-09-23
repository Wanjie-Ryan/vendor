import React, { useState, useContext } from "react";
import "./reg-log.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { AiOutlineEye, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RegContext } from "../../context/regContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState("+254");
  const [pwd, setPwd] = useState();
  const [checkpwd, setCheckpwd] = useState(false);
  const [load, setLoad] = useState(false);
  const [errormsg, setErrormsg] = useState();

  const { vendor, loading, error, dispatch } = useContext(RegContext);

  const TogglePwd = () => {
    setCheckpwd(!checkpwd);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleContact = (phoneNumber) => {
    setContact(phoneNumber);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !pwd) {
      toast.error("Please fill in all the fields");
      return;
    }

    setLoad(true);

    dispatch({ type: "regStart" });

    try {
      const registrationData = {
        name: name,
        email: email,
        contact: contact,
        password: pwd,
      };

      const response = await axios.post(
        "http://localhost:3005/api/vendor/auth/register",
        registrationData
      );

      // console.log(response)

      dispatch({ type: "regComplete", payload: response.data });

      toast.success("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      setLoad(false);
    } catch (err) {
      dispatch({ type: "regFail", payload: err });
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (pwd.length < 5) {
        toast.error(
          "Password is too short. Please enter at least 5 characters."
        );
        setLoad(false);

        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Invalid email address. Please enter a valid email.");
        setLoad(false);

        return;
      } else {
        setErrormsg(
          "There seems to be an error, refresh the page and try again!"
        );

        toast.error(errormsg);
        setLoad(false);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <section className="register">
        <div className="regsiter-container">
          <p className="home-link title">Superb Kitchen-Vendor</p>
          <p className="register-text">Register</p>

          <form className="form" onSubmit={handleRegistration}>
            <div className="form-container">
              <div className="name-label">
                <label>Name</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="enter your name"
                  required
                  value={name}
                  onChange={handleName}
                />
              </div>
            </div>

            <div className="form-container">
              <div className="name-label">
                <label>Email</label>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="enter your Email"
                  required
                  value={email}
                  onChange={handleEmail}
                />
              </div>
            </div>

            <div className="form-container">
              <div className="input-container">
                <PhoneInput
                  placeholder="Your Phone Number"
                  className="pwd-input"
                  required
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
                <input
                  type={checkpwd ? "text" : "password"}
                  placeholder="enter your Password"
                  required
                  value={pwd}
                  onChange={handlePwd}
                />
                <AiOutlineEye className="toggle-password" onClick={TogglePwd} />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              {load ? (
                <AiOutlineLoading3Quarters className="loading-icon" />
              ) : (
                "Let's Go"
              )}
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
