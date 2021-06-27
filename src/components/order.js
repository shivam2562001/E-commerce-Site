import React from "react";
import CartColumns from "./cart/CartColumns";
import moment from "moment";
function Order({ order, id }) {
  const { products, amount, date } = order;

  return (
    <div className="card">
      <div className="card-header">
        Orders {id}
        <div>Amount : {amount}</div>
        <div>Date : {moment(date).format("DD MM YYYY hh:mm:ss A")}</div>
        <div
          className="float-right badge badge-info"
          style={{ cursor: "pointer" }}
          data-toggle="collapse"
          href={`#collapseExample${id}`}
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          show
        </div>
      </div>

      <div className="collapse" id={`collapseExample${id}`}>
        <div class="card-body">
          <CartColumns show={false} />
          {products && products.length > 0 ? (
            products.map((prod, ind) => {
              return (
                <div key={ind} className="row my-2 text-capitalize text-center">
                  <div className="col-10 mx-auto col-lg-2">
                    <img
                      src={prod.image}
                      style={{ width: "5rem", height: "5rem" }}
                      className="img-fluid"
                      alt="product"
                    />
                  </div>
                  <div className="col-10 mx-auto col-lg-2">{prod.title}</div>
                  <div className="col-10 mx-auto col-lg-2">{prod.price}</div>
                  <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                      <div>
                        <span className="btn btn-black mx-1">{prod.count}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-10 mx-auto col-lg-2">
                    &#8377;&nbsp;{prod.total}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
