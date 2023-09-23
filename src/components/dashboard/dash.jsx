import React, {useState, useEffect} from "react";
import "./dash.css";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!Cookies.get().vendorToken || Cookies.get().vendorToken === undefined) {
        navigate("/login");
      } else {
        const token = Cookies.get().vendorToken;

        const res = await axios({
          method: "get",
          url: "http://localhost:3005/api/vendor/auth/verify",
          headers: { Authorization: "Bearer " + token },
          data: {},
        });

        if (res.data.type !== "success") {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);


  return (
    <>
      <section className="dashboard">
        <div className="dash">
          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <MdProductionQuantityLimits className="icon-products" />
              </div>
              <div className="product-name">
                <Link to="/products" className="products-link">
                  <h3>Check Products</h3>
                </Link>
              </div>
            </div>

            {/* <div className="product-detail"></div> */}
          </div>

          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <FaWallet className="icon-products" />
              </div>
              <div className="product-name">
                <Link to="/wallet" className="products-link">
                  <h3>Your Wallet</h3>
                </Link>
              </div>
            </div>

            {/* <div className="product-detail"></div> */}
          </div>

          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <FcSalesPerformance className="icon-products" />
              </div>
              <div className="product-name">
                <Link to="/sales" className="products-link">
                  <h3>Your Sales</h3>
                </Link>
              </div>
            </div>

            {/* <div className="product-detail"></div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
