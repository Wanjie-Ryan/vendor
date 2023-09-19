import React, {useState} from "react";
import "./pp.css";
import { Link } from "react-router-dom";

function PostProducts() {

    const [showForm, setShowForm] = useState(true)
    const [showTable, setShowTable] = useState(false)

    const handleShowForm = ()=>{
        setShowForm(true);
        setShowTable(false);
    }

    const handleShowTable = () => {
        setShowForm(false);
        setShowTable(true);
      };
  return (
    <>
      <section className="post-products">
        <div className="post-products-inner">
          <div className="post-products-inner-headers">
            <div className="header-1">
                <h3 className='yes' onClick={handleShowForm}>Create a Product</h3>
            </div>
            <div className="header-1" onClick={handleShowTable}>
                <h3 className="yes">View Your Products</h3>
            </div>
          </div>

        <div className="content-container">
          {showForm &&(<form className="create-product-section">
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
          </form>)}

          {showTable &&(
          <table className='products-table'>

            <th>
                <td>Hey</td>
            </th>


          </table>)}
</div>
        </div>
      </section>
    </>
  );
}

export default PostProducts;
