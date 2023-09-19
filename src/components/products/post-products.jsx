import React from 'react'
import './pp.css'
import {Link} from 'react-router-dom'


function PostProducts (){
    return(
        <>

            <section className='post-products'>

                <div className='post-products-inner'>

                    <div className='post-products-inner-headers'>
                        <div className='header-1'>

                            <Link to='/products' className="products-link yes"><h3>Create a Product</h3></Link>


                        </div>
                        <div className='header-1'>

                            <Link to='/view-proucts' className="products-link yes"><h3>View Your Products</h3></Link>


                        </div>


                    </div>

                    



                </div>


            </section>


        </>
    )
}

export default PostProducts