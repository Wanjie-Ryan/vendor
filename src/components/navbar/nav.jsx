import React, { useState, useEffect } from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";

function Navbar() {
  const [asideOpen, setAsideOpen] = useState(false);
  const toggleAside = () => {
    setAsideOpen(!asideOpen);
  };

  const LogDetails = JSON.parse(sessionStorage.getItem("VendorLoginDetails"));

  let username;

  if (LogDetails) {
    username = LogDetails.name;
  }

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("vendorToken");

    navigate("/login");
  };

  return (
    <>
      <nav className="nav-main">
        <div className="nav-main__nav-inner">
          <div className="nav-main__left">
            <Link to="/dashboard" className="home-link">
              <h2>Superb Kitchen-Vendor</h2>
            </Link>
          </div>

          <div className="nav-main__right">
            <div className="nav-main__right__dashboard">
              <Link to="/products" className="link-dashboard">
                <p>Products</p>
              </Link>
            </div>

            <div className="nav-main__right__dashboard">
              <Link to="/wallet" className="link-dashboard">
                <p>Wallet</p>
              </Link>
            </div>

            <div className="nav-main__right__dashboard">
              <Link to="/sales" title="chats" className="link-dashboard">
                <p>Sales</p>
              </Link>
            </div>

            <div className="nav-main__right__logout">
              <p onClick={handleLogout}>Logout</p>
            </div>

            <div className="nav-main__right__profile">
              <Link to="/profile" className="link-profile">
                {Image ? (
                  <img src={Image} className="image" />
                ) : (
                  <BsPersonCircle />
                )}
              </Link>
              <p>
                {greeting} {username}
              </p>
            </div>

            <div className="nav-main__right__dashboard-menu">
              <BiMenu className="menu-icon" onClick={toggleAside} />
            </div>
          </div>
        </div>
      </nav>

      <aside className={`main-aside ${asideOpen ? "active" : ""}`}>
        <div className="main-aside__inner">
          <div className="main-aside__inner__top">
            <div className="main-aside__inner__top__title">
              <Link to="/" className="home-link">
                <h2>Superb Kitchen-Vendor</h2>
              </Link>
            </div>

            <div className="main-aside__inner__top__close">
              <AiOutlineCloseCircle
                className="main-aside__inner__top-close"
                onClick={toggleAside}
              />
            </div>
          </div>

          <div className="main-aside__inner__botom">
            <div className="main-aside__inner__top__dashboard">
              <Link to="/wallet" className="link-dashboard">
                <p>Wallet</p>
              </Link>
            </div>

            <div className="main-aside__inner__top__dashboard">
              <Link to="/sales" title="chats" className="link-dashboard">
                <p>Sales</p>
              </Link>
            </div>

            <div className="main-aside__inner__top__dashboard">
              <Link to="/profile" className="link-profile">
                {Image ? (
                  <img src={Image} className="image" />
                ) : (
                  <BsPersonCircle />
                )}
              </Link>
              <p>
                {" "}
                {greeting} {username}
              </p>
            </div>

            <div className="main-aside__inner__top__logout">
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
