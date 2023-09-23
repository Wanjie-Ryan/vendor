import React, {useContext, useState} from "react";
import { AiOutlineEye,AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { LogContext } from "../../context/logContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Login() {

  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();
  const [load, setLoad] = useState();
  const [errMsg, seterrMsg] = useState();
  const [showPwd, setShowPwd] = useState(false);

  const { vendor, loading, error, dispatch } = useContext(LogContext);

  const togglePassword = () => {
    setShowPwd(!showPwd);
  };

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleLogin = async(e)=>{

    e.preventDefault();

    if (!email || !pwd) {
      toast.error("Please fill all the fields");
    }

    setLoad(true);

    dispatch({ type: "logStart" });


    try{

      const LoginData = {
        email: email,
        password: pwd,
      };

      const response = await axios.post(
        "http://localhost:3005/api/vendor/auth/login",
        LoginData
      );

      // console.log(response)

      const loginDetails = {
        id: response.data.UserLogin._id,
        name: response.data.UserLogin.name,
      };

      sessionStorage.setItem("VendorLoginDetails", JSON.stringify(loginDetails));
      const LoginToken = response.data.vendorToken;

      Cookies.set("vendorToken", LoginToken);

      dispatch({ type: "logComplete", payload: response.data });

      toast.success("Login Successful");

      setTimeout(()=>{

        navigate('/dashboard')

      },1000)

      setLoad(false)








    }
    catch(err){

      dispatch({ type: "logFail", payload: err });

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
        seterrMsg("Invalid Credetials!");

        toast.error(errMsg);
        setLoad(false);
      }


    }

    finally{

      setLoad(false);

    }


  }

  return (
    <>
      <section className="register">
        <div className="regsiter-container">
          <p className="home-link title">Superb Kitchen-Vendor</p>
          <p className="register-text">Login</p>

          <form className="form"  onSubmit={handleLogin}>
            <div className="form-container">
              <div className="name-label">
                <label>Email</label>
              </div>
              <div className="input-container">
                <input type="email" placeholder="enter your Email" required value={email}
                onChange={handleEmail}/>
              </div>
            </div>

            <div className="form-container">
              <div className="name-label">
                <label>Password</label>
              </div>
              <div className="input-container-pwd">
                <input  type={showPwd ? "text" : "password"} placeholder="enter your Password" required value={pwd}
                  onChange={handlePwd}/>
                <AiOutlineEye className="toggle-password"  onClick={togglePassword} />
              </div>
            </div>

            
              <button type="submit" className="submit-btn">
              {load ? (
                <AiOutlineLoading3Quarters className="loading-icon" />
              ) : (
                "Let's Go"
              )}
              </button>
            
            <Link to="/" className="login-p">
              <p>Not yet Registered? Register</p>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
