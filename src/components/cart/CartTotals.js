import React from 'react';
import {Link} from 'react-router-dom';


export default function CartTotals({cartTotal,onClearCart,onPlaceOrder}) {
  return (
   <>
   <div className="container"> 
    <div className="row">
      <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
        <Link to="/">
          <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button"
          onClick={()=>onClearCart()}>
           clear cart
          </button>
        </Link>
         
        
        <button className="btn btn-outline-success text-uppercase mb-3 ml-3 px-5" type="button"
          onClick={()=>onPlaceOrder()}>
           place order
          </button>
        <h5>
          <span className="text-title">
            tax:
          </span>
  <strong>0</strong>
        </h5>
        <h5>
          <span className="text-title">
            total:
          </span>
  <strong>&#8377;&nbsp;{cartTotal}</strong>
        </h5>
      </div>
    </div>
   </div>
   </>
  )
}
