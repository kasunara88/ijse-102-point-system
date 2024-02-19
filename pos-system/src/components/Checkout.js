import axios from "axios";
import React, { useEffect, useState } from "react";
import NevBar from "./NevBar";

const Checkout = () => {
  const [items, setItems] = useState();
  const [orderProduct, setOrderProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const getItem = async () => {
    const response = await axios.get("http://localhost:8080/items");
    setItems(response.data);
  };

  const creatOrder = async () => {
    const productIDs = orderProduct.map((obj) => obj.id);
    const data = {
      products: productIDs,
    };

    const response = await axios.post("http://localhost:8080/orders", data);
    if (response.status === 201) {
      setOrderProduct([]);
      setTotal(0);
      setTax(0);
    } else {
      //show error msg∂
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    setTax((total / 100) * 15);
  }, [total]);

  return (
    <>
    <NevBar/>
      <div className="container-fluid">
        <h1>Checking Out</h1>
        <div className="col-md-6">
          <h2>Proucts</h2>
          {items &&
            items.map((item) => (
              <div className="product-box gap-3 d-flex justify-content" >
                {item.name} - {item.price}
                <button
                  className="btn btn-danger text-end mb-3"
                  
                  onClick={() => {
                    setOrderProduct([...orderProduct, item]);

                    let currentTotal = total;
                    currentTotal = currentTotal + item.price;
                    setTotal(currentTotal);
                  }}
                >
                  Add to Order
                </button>
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <h2>Order</h2>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderProduct &&
                orderProduct.map((product) => (
                  <tr>
                    <td>{product.itemId}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                  </tr>
                ))}
            </tbody>
            <thead>
              <tr>
                <th colSpan={2}>Total</th>
                <th>{total}</th>
              </tr>
              <tr>
                <th colSpan={2}>Tax</th>
                <th>{tax}</th>
              </tr>
            </thead>
          </table>
          <button className="btn btn-secondary" onClick={creatOrder}>
            Compete Order
          </button>
        </div>
      </div>
    </>
  );
};
export default Checkout;
