import React, {useState} from 'react'
import './wallet.css'
import {FaFileCsv} from 'react-icons/fa'
import {BsFillFileEarmarkPdfFill} from 'react-icons/bs'

function Wallet(){


    return(

        <>

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
                      <th>Bought By</th>
                      <th>Amount</th>
                      <th>Receive Payment</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    
                        <tr >
                          <td>1</td>
                          <td>
                            <img
                              src=''
                              alt="image"
                              className="product-image"
                            />
                          </td>
                          <td>xxxxx</td>
                          <td>ksh 20</td>
                          <td>40</td>
                          <td>
                            <button
                              className="edit"
                              
                            >
                              Receive Payment
                            </button>
                          </td>
                          
                        </tr>
                     
                  </tbody>
                </table>
              </div>
        
        
        
        </>
    )
}


export default Wallet