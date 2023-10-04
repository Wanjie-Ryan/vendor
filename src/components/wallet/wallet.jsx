import React, { useState, useEffect } from "react";
import "./wallet.css";
import { FaFileCsv } from "react-icons/fa";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Wallet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [buyerNames, setBuyerNames] = useState([])
  // console.log(products);

  useEffect(() => {
    const getPurchasedProducts = async () => {
      try {
        const token = Cookies.get().vendorToken;

        const response = await axios.get(
          "http://localhost:3005/api/vendor/products/purchasedproducts",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // console.log(response.data.purchasedProducts)

        setProducts(response.data.purchasedProducts);

        const purchasedProducts = response.data.purchasedProducts

        const uniqueBuyerIds = [...new Set(purchasedProducts.flatMap(product => product.boughtBy))];
        // console.log(uniqueBuyerIds)

      

      const queryParam = uniqueBuyerIds.join('&buyerIds=')
      const buyerDetailsResponse = await axios.get(`http://localhost:3005/api/chpter/getbuyers?buyerIds=${queryParam}`, {headers:{Authorization: `Bearer ${token}`}})
      // console.log(buyerDetailsResponse.data.buyer)
      setBuyerNames(buyerDetailsResponse.data.buyer)


      } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
          toast.error("Not Authorized");
          navigate("/login");
        } else if (err.response.status === 500) {
          toast.error("A problem with our servers, hang on");
        }
      }
    };

    getPurchasedProducts();
  }, []);
  return (
    <>
      <section className="records">
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

          <table className="products-table--">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Image</th>
                <th>Product</th>
                <th>Bought By</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Receive Payment</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <p>Your products have not yet been purchased</p>
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
                    <td> {item.boughtBy.map((userId, buyerIndex) => (
          <span key={userId}>
            {buyerNames[userId]}
            {buyerIndex < item.boughtBy.length - 1 && ', '}
          </span>
        ))}</td>
                    <td>{`ksh. ${item.price}`}</td>
                    <td className="paid">paid</td>
                    <td>
                      <button className="receive-payment">
                        Receive Payment
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Wallet;
