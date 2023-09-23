import React from 'react'
import './updateModal.css'
import Modal from 'react-modal'
import { AiOutlineClose } from "react-icons/ai";


function UpdateModal ({isOpen, onClose,id}){

    if (!isOpen) {
        return null; 
      }

    return(

        <>

            <Modal

                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel='update Product Modal'
                className="modal-contents "
                overlayClassName="modal-overlay"
             >

                <main className='product'>

                    <nav className='product-nav'>

                        <div className='div-title'>
                            <h2>Update Product Details</h2>

                        </div>

                        <div className='modal-close'>

                        <AiOutlineClose
                className="close-icon"
                onClick={onClose}
              />


                        </div>






                    </nav>


                </main>







            </Modal>
        
        
        
        </>


    )
}


export default UpdateModal