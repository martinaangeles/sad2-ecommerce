import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function Modal({ so_id, onClose }) {
  const [modal, setModal] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (so_id) {
      fetchOrderDetails();
    }
  }, [so_id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/orders/${so_id}`);
      const data = await response.json();
      setOrderDetails(data[0]);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const closeModal = () => {
    setModal(false);
    onClose && onClose();
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <h2> Order Details </h2>
            {orderDetails ? (
              <div>
                <p> Order #: {orderDetails.so_id} </p>
                <p> Order Date: {orderDetails.so_orderDate} </p>
                <p> Payment Status: {orderDetails.so_paymentStatus} </p>
                <p> Order Status: {orderDetails.so_orderStatus} </p>

                {orderDetails.so_item_id ? (
  <>
    <h3>Product Details</h3>
    <table className="modal-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="product-cell">
            <div className="product-info">
              <img
                src={orderDetails.product_image}
                alt="Product"
                className="product-image"
              />
              <div>
                <p>{orderDetails.product_name}</p>
                <p>{orderDetails.so_item_jewelryLength}</p>
                <p>{orderDetails.so_item_jewelryTextFront}</p>
                <p>{orderDetails.so_item_jewelryTextBack}</p>
                <p>{orderDetails.so_item_jewelryFont}</p>
              </div>
            </div>
          </td>
          <td>{orderDetails.so_item_quantity}</td>
          <td>{orderDetails.so_item_unitPrice}</td>
        </tr>
        <tr>
          <td className="total-cell" colSpan="2">
            Total: {orderDetails.so_totalAmount}
          </td>
        </tr>
      </tbody>
    </table>
  </>
) : (
  <p>No items found for this order.</p>
)}

                <p>
                  Delivery To: {orderDetails.shipping_address_firstName}{" "}
                  {orderDetails.shipping_address_lastName}
                </p>
                <p>
                  Address:{" "}
                  {`${orderDetails.shipping_address_streetOne}, ${orderDetails.shipping_address_streetTwo}, ${orderDetails.shipping_address_city}, ${orderDetails.shipping_address_province}, ${orderDetails.shipping_address_zipCode}`}
                </p>
                <p>
                  Contact:{" "}
                  {`${orderDetails.shipping_address_emailAddress}, ${orderDetails.shipping_address_contactNum}`}
                </p>
              </div>
            ) : (
              <p>Loading order details...</p>
            )}
            <button className="close-modal" onClick={closeModal}>
              {" "}
              CLOSE{" "}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
