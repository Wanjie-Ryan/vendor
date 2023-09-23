import React, { useState } from "react";
import "./pp.css";
import { AiOutlineEye, AiOutlineLoading3Quarters } from "react-icons/ai";
import pic1 from "../../images/kitchen-1.jpg";
import { FaFileCsv } from "react-icons/fa";
import axios from "axios";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function PostProducts() {
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
    setShowTable(false);
  };

  const handleShowTable = () => {
    setShowForm(false);
    setShowTable(true);
  };

  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()


  const handleName =(e)=>{
    setName(e.target.value)
  }

  const handlePrice =(e)=>{
    setPrice(e.target.value)
  }

  const handleQuantity = (e)=>{
    setQuantity(e.target.value)
  }

  const CreateProduct = async(e)=>{

    e.preventDefault()

    if(!image || !name || !price|| !quantity){
       toast.error('All fields are reuired!')
       return
    }

    try{

      


    }

    catch(err){


    }

    finally{


    }








  }
  return (
    <>
      <section className="post-products">
        <div className="post-products-inner">
          <div className="post-products-inner-headers">
            <div className="header-1">
              <h3 className="yes" onClick={handleShowForm}>
                Create a Product
              </h3>
            </div>
            <div className="header-1" onClick={handleShowTable}>
              <h3 className="yes">View Your Products</h3>
            </div>
          </div>

          <div className="content-container">
            {showForm && (
              <form className="create-product-section" onSubmit={CreateProduct}>
                <div className="product-name">
                  <label>Product Image</label>
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    required
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                  />
                </div>

                <div className="product-name">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="name of the product"
                    value={name}
                    onChange={handleName}
                  />
                </div>

                <div className="product-name">
                  <label>Product Price</label>
                  <input
                    type="text"
                    required
                    placeholder="price of the product in ksh."
                    value={price}
                    onChange={handlePrice}
                  />
                </div>

                <div className="product-name">
                  <label>Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="number of items in your store"
                    value={quantity}
                    onChange={handleQuantity}
                  />
                </div>

                <button className="create-product-btn">Create</button>
              </form>
            )}

            {showTable && (
              <div className="table-container">
                <div className="table-btns">
                  <button className="csv">
                    <FaFileCsv /> Export as CSV
                  </button>
                  <button className="pdf">
                    <BsFillFileEarmarkPdfFill />
                    Export as PDF
                  </button>
                </div>
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <img src={pic1} alt="image" className="product-image" />
                      </td>
                      <td>Product-1</td>
                      <td>ksh.10</td>
                      <td>40</td>
                      <td>
                        <button className="edit">Edit</button>
                      </td>
                      <td>
                        <button className="delete">Delete</button>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>
                        <img src={pic1} alt="image" className="product-image" />
                      </td>
                      <td>Product-2</td>
                      <td>ksh.10</td>
                      <td>40</td>
                      <td>
                        <button className="edit">Edit</button>
                      </td>
                      <td>
                        <button className="delete">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PostProducts;
