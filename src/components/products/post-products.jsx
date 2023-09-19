import React from "react";
import "./pp.css";
import { Link } from "react-router-dom";

function PostProducts() {
  return (
    <>
      <section className="post-products">
        <div className="post-products-inner">
          <div className="post-products-inner-headers">
            <div className="header-1">
              <Link to="/products" className="products-link yes">
                <h3>Create a Product</h3>
              </Link>
            </div>
            <div className="header-1">
              <Link to="/view-proucts" className="products-link yes">
                <h3>View Your Products</h3>
              </Link>
            </div>
          </div>

          <form className="create-product-section">
            <div className="product-name">
              <label>Product Image</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                required

                //   onChange={(e) => {
                //     setImage(e.target.files[0]);
                //   }}
              />
            </div>

            <div className="product-name">
              <label>Product Name</label>
              <input type="text" required placeholder="name of the product" />
            </div>

            <div className="product-name">
              <label>Product Price</label>
              <input
                type="text"
                required
                placeholder="price of the product in ksh."
              />
            </div>

            <div className="product-name">
              <label>Quantity</label>
              <input
                type="number"
                required
                placeholder="number of items in your store"
              />
            </div>

            <button className="create-product-btn">Create</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PostProducts;
