import React, { useState, useEffect } from "react";
import "./pp.css";
import { AiOutlineEye, AiOutlineLoading3Quarters } from "react-icons/ai";
import pic1 from "../../images/kitchen-1.jpg";
import { FaFileCsv } from "react-icons/fa";
import axios from "axios";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UpdateProductModal from "./updateModal";
import jsPDF from "jspdf";

function PostProducts() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (
        !Cookies.get().vendorToken ||
        Cookies.get().vendorToken === undefined
      ) {
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

  const [image, setImage] = useState();
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

  const VendorDetails = JSON.parse(
    sessionStorage.getItem("VendorLoginDetails")
  );
  let id;

  id = VendorDetails.id;

  const CreateProduct = async (e) => {
    e.preventDefault();

    if (!image || !name || !price || !quantity) {
      toast.error("All fields are reuired!");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get().vendorToken;
      const formData = new FormData();
      formData.append("file", image);

      formData.append("upload_preset", "pq4z6rjr");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
        formData
      );

      // console.log(imageData)

      const productData = {
        createdBy: id,
        image: imageData.data.secure_url,
        name: name,
        price: price,
        quantity: quantity,
      };

      const response = await axios.post(
        "http://localhost:3005/api/vendor/products/createproduct",
        { productData: productData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(response)

      toast.success("Product Created Successfully");

      setLoading(false);

      window.location.reload();
    } catch (err) {
      // console.log(err)

      if (err.response.status === 401) {
        toast.error("Not Authorized");
        navigate("/login");
      } else if (err.response.status === 404) {
        toast.error("User cannot be found");
      } else if (err.response.status === 500) {
        toast.error("A problem with our servers, hang on");
      }
    } finally {
      setLoading(false);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const UserProducts = async () => {
      try {
        const token = Cookies.get().vendorToken;

        const getProducts = await axios.get(
          "http://localhost:3005/api/vendor/products/getproducts",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(getProducts.data.AllProducts)

        setProducts(getProducts.data.AllProducts);
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Not Authorized");
          navigate("/login");
        } else if (err.response.status === 500) {
          toast.error("A problem with our servers, hang on");
        }
      }
    };

    UserProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = Cookies.get().vendorToken;

      const deleteProduct = await axios.delete(
        `http://localhost:3005/api/vendor/products/deleteproduct/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(deleteProduct)

      if (deleteProduct.status === 200) {
        toast.success("Product was deleted successfully");
      }

      window.location.reload();
    } catch (err) {
      // console.log(err)

      if (err.response.status === 401) {
        toast.error("Not Authorized");
        navigate("/login");
      } else if (err.response.status === 500) {
        toast.error("A problem with our servers, hang on");
      } else if (err.response.status === 404) {
        toast.error("The product cannot seem to be found");
      } else {
        toast.error("Check your network connection");
      }
    }
  };

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setShowUpdateModal(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    //respresents the pdf document

    doc.text("Product List", 10, 10);
    //adds the title 'product list at coordinates 10,10'

    let y = 20;
    //initialize vertical position y

    products.forEach((product, index) => {
      y += 10;
      doc.text(`Product ${index + 1}:`, 10, y);
      y += 5;
      doc.text(`Name: ${product.name}`, 15, y);
      y += 5;
      doc.text(`Price: ksh ${product.price}`, 15, y);
      y += 5;
      doc.text(`Quantity: ${product.quantity}`, 15, y);
      y += 10;
    });

    //the above part iterates through each product in the products array
    // for each product, it pperforms the following function:
    // increases y coordinate by 10 units to move down to the next position
    //Adds product number eg. product 1 at coordinates (10,y)
    // increases y coordinate by 5 units to create space between lines
    // adds product name at coordinates (15,y)
    //repeats process for price and quantity
    // adds additional 10 units to y coordinate to create space between products

    doc.save("your_product_list.pdf");
  };

  const GenerateCSV = () =>{
    const csvData = products.map((item)=>{
      return `${item.name}, ${item.price}, ${item.quantity}`
    })

    const csv = ['Name, Price, Quantity', ...csvData].join('\n')

    const blob = new Blob([csv],{type:'text/csv'})

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'your_product_list.csv'

    document.body.appendChild(a)
    a.click()

    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
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

                <button className="create-product-btn">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="loading-icon" />
                  ) : (
                    "Create"
                  )}
                </button>
              </form>
            )}

            {showTable && (
              <div className="table-container">
                <div className="table-btns">
                  <button className="csv" onClick={GenerateCSV}>
                    <FaFileCsv /> Export as CSV
                  </button>
                  <button className="pdf" onClick={generatePDF}>
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
                    {products.length === 0 ? (
                      <p>You have not yet created a product</p>
                    ) : (
                      products.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={item.image}
                              alt="image"
                              className="product-image"
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>ksh {item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <button
                              className="edit"
                              onClick={() => {
                                openModal(item._id);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="delete"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      <UpdateProductModal
        isOpen={showUpdateModal}
        onClose={closeModal}
        id={selectedProductId}
      />
    </>
  );
}

export default PostProducts;
