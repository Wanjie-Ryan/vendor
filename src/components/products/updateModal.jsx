import React from "react";
import "./updateModal.css";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

function UpdateModal({ isOpen, onClose, id }) {
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
        <main className="product">
          <nav className="product-nav">
            <div className="div-title">
              <h2>Update Product Details</h2>
            </div>

            <div className="modal-close">
              <AiOutlineClose className="close-icon" onClick={onClose} />
            </div>
          </nav>

          <div className="modal-main-container">
            <div className="name-container">
              <label>Product Image</label>
              <input type="file" id="imageFile" accept="image/*" />
            </div>
            <div className="name-container">
              <label>Product Name</label>
              <input type="text" placeholder='name of the product'  />
            </div><div className="name-container">
              <label>Product Price</label>
              <input type="text"  placeholder='price of the product in ksh.' />
            </div><div className="name-container">
              <label>Quantity</label>
              <input type="number" placeholder='number of items in the store' />
            </div>
          </div>
          <div className='btn-div'>
            <button className="okay-btn" onClick={onClose}>
            Okay
          </button>
          </div>
        </main>
      </Modal>
    </>
  );
}

export default UpdateModal;
