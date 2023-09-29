import React, { useState } from "react";
import "./wallet.css";
import { FaFileCsv } from "react-icons/fa";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

function Wallet() {
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
                {/* <th>Quantity</th> */}
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>image</td>
                <td>xxx</td>
                {/* <td>3</td> */}
                <td>Ksh. 10</td>
                <td className="paid">xxx</td>
                <td className="pending">yyyy</td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </section>
    </>
  );
}

export default Wallet;
