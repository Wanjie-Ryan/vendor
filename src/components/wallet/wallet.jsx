import React, { useState, useEffect } from "react";
import "./wallet.css";
import { FaFileCsv } from "react-icons/fa";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
function Wallet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [buyerNames, setBuyerNames] = useState([]);
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

        const purchasedProducts = response.data.purchasedProducts;

        const uniqueBuyerIds = [
          ...new Set(purchasedProducts.flatMap((product) => product.boughtBy)),
        ];
        // console.log(uniqueBuyerIds)

        const queryParam = uniqueBuyerIds.join("&buyerIds=");
        const buyerDetailsResponse = await axios.get(
          `http://localhost:3005/api/chpter/getbuyers?buyerIds=${queryParam}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(buyerDetailsResponse.data.buyer)
        setBuyerNames(buyerDetailsResponse.data.buyer);
      } catch (err) {
        // console.log(err);
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

  const InitiatePayout = async()=>{

    const payOutData = {

      "client_details": {
        "full_name": "John Doe",
        "phone_number": "254700123123",
        "email": "johndoe@mail.com"
      },
      "destination_details": {
        "country_code": "KE",
        "mobile_number": "254700123123",
        "wallet_type": "mpesa"
      },
      "transfer_details": {
        "currency_code": "KES",
        "amount": 100.25
      },
      "callback_details": {
         "notify_customer": true,
        "payout_reference": "DEF456",
        "callback_url": "https://example.com/callback"
      }
      
    }





  }

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text("Purchased products List", 10, 10);

    // Loop through the products and add details to the PDF
    let yPos = 30; // Y position for the first detail
    products.forEach((item, index) => {
      doc.text(`No: ${index + 1}`, 10, yPos);
      doc.text(`Product Name: ${item.name}`, 10, yPos + 10);
      // doc.text(`Product Name: ${item.image}`, 10, yPos);
      // doc.text(`BoughtBy:${}`)
      doc.text(`Amount: Ksh. ${item.price}`, 10, yPos + 20);
      doc.text(`Payment Status: Paid`, 10, yPos + 30);

      yPos += 50; // Adjust Y position for the next detail
    });

    doc.save("bought_products.pdf");
  };

  const generateCSV = (data) => {
    if (data.length === 0) {
      return "No products purchased yet";
    }

    const csvData = [
      ["Product", "Amount", "Payment Status"],
      ...data.map((item, index) => [item.name, `Ksh. ${item.price}`, "paid"]),
    ];

    const csvBlob = new Blob([csvData.map((row) => row.join(",")).join("\n")], {
      type: "text/csv",
    });

    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "purchased_products.csv";
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(csvUrl);
  };
  return (
    <>
      <section className="records">
        <div className="table-container">
          <div className="table-btns">
            <button className="csv" onClick={() => generateCSV(products)}>
              <FaFileCsv /> Export as CSV
            </button>
            <button className="pdf" onClick={() => generatePDF(products)}>
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
                    <td>
                      {" "}
                      {buyerNames.map((buyer, buyerIndex) => (
                        <span key={buyer._id}>
                          <p className="buyers-names"> &bull; {buyer.name}</p>
                        </span>
                      ))}
                    </td>
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
