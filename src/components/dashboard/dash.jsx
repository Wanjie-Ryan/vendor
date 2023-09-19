import React from "react";
import "./dash.css";
import {MdProductionQuantityLimits} from 'react-icons/md'
import {FaWallet} from 'react-icons/fa'
import {FcSalesPerformance} from 'react-icons/fc'
import {Link} from 'react-router-dom'
function Dashboard() {
  return (
    <>
      <section className="dashboard">
        <div className="dash">
          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <MdProductionQuantityLimits className="icon-products"/>
              </div>
              <div className="product-name">
                <h3>Check Products</h3>
              </div>
            </div>

            {/* <div className="product-detail"></div> */}
          </div>

          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <FaWallet className="icon-products"/>
              </div>
              <div className="product-name">
                <h3>Your Wallet</h3>
              </div>
            </div>

            {/* <div className="product-detail"></div> */}
          </div>

          <div className="products">
            <div className="product-cont">
              <div className="icon-product">
                <FcSalesPerformance className="icon-products"/>
              </div>
              <div className="product-name">
                <h3>Your Sales</h3>
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
