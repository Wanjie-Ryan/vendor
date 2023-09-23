import React, { useState } from "react";
import "./updateModal.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
function UpdateModal({ isOpen, onClose, id }) {
//   const [image, setImage] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const navigate = useNavigate();

  const handleProductUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = Cookies.get().vendorToken;
    //   const formData = new FormData();
    //   formData.append("file", image);

    //   formData.append("upload_preset", "pq4z6rjr");

    //   const imageData = await axios.post(
    //     "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
    //     formData
    //   );

      const productUpdateData = {
        // image: imageData.data.secure_url,
        name: name,
        price: price,
        quantity: quantity,
      };

      const response = await axios.patch(
        `http://localhost:3005/api/vendor/products/updateproduct/${id}`,
        { productData: productUpdateData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

    //   console.log(response)

      toast.success("Product was updated successfully");

      setLoading(false);

      window.location.reload();
    } catch (err) {
    //   console.log(err);
      if (err.response.status === 401) {
        toast.error("Not Authorized");
        navigate("/login");
      } else if (err.response.status === 404) {
        toast.error("Product cannot be found");
      } else if (err.response.status === 500) {
        toast.error("A problem with our servers, hang on");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="update Product Modal"
        className="modal-contents "
        overlayClassName="modal-overlay"
      >
        <div className="product">
          <nav className="product-nav">
            <div className="div-title">
              <h2>Update Product Details</h2>
            </div>

            <div className="modal-close">
              <AiOutlineClose className="close-icon" onClick={onClose} />
            </div>
          </nav>

          <form className="modal-main-container" onSubmit={handleProductUpdate}>
            {/* <div className="name-container">
              <label>Product Image</label>
              <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
            </div> */}
            <div className="name-container">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="name of the product"
                value={name}
                onChange={handleName}
              />
            </div>
            <div className="name-container">
              <label>Product Price</label>
              <input
                type="text"
                placeholder="price of the product in ksh."
                value={price}
                onChange={handlePrice}
              />
            </div>
            <div className="name-container">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="number of items in the store"
                value={quantity}
                onChange={handleQuantity}
              />
            </div>
            <div className="btn-div">
              <button className="okay-btn">
                {loading ? (
                  <AiOutlineLoading3Quarters className="loading-icon" />
                ) : (
                  "Okay"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default UpdateModal;
