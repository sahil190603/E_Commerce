// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchOrders, fetchProductById, submitOrderRating } from '../../services/api';
// import { AuthContext } from '../../Context/AuthProvider';
// import { Rate } from 'antd';

// const OrderHistoryPage = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [ratingValue, setRatingValue] = useState(0);

//   useEffect(() => {
//     fetchOrdersFromAPI();
//   }, []);

//   const fetchOrdersFromAPI = async () => {
//     const userId = user?.user_id;
//     if (!userId) {
//       alert('User not logged in');
//       return;
//     }

//     try {
//       const response = await fetchOrders(userId);
//       const ordersWithProductDetails = await Promise.all(
//         response.data
//           .filter(order => order.user === userId)
//           .map(async order => {
//             const productResponse = await fetchProductById(order.product);
//             return { ...order, productDetails: productResponse.data };
//           })
//       );
//       setOrders(ordersWithProductDetails);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const handleRatingChange = async (orderId, value) => {
//     setSelectedOrderId(orderId);
//     setRatingValue(value);

//     try {
//       const userId = user.user_id;
//       const selectedOrder = orders.find(order => order.id === orderId);
//       const product_Id = selectedOrder.productDetails.id;

//       // // Check if rating already exists
//       // if (selectedOrder.rating) {
//       //   alert('Rating already exists for this order');
//       //   return;
//       // }

//       await submitOrderRating(userId, orderId, product_Id, value);
//       alert('Rating submitted successfully');

//       // Update the order rating in the state
//       const updatedOrders = orders.map(order =>
//         order.id === orderId ? { ...order, rating: value } : order
//       );
//       setOrders(updatedOrders);

//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       alert('Failed to submit rating');
//     }
//   };

//   return (
//     <div className="container mt-3">
//       <button className="btn btn-secondary mb-3" onClick={() => navigate('/home')}>
//         Back to Home
//       </button>
//       <h3>Order History</h3>
//       <div className="row">
//         <div className="col-md-12">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Product Name</th>
//                 <th>Quantity</th>
//                 <th>Order Date</th>
//                 <th>Rate Order</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.length > 0 ? (
//                 orders.map(order => (
//                   <tr key={order.id}>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <img
//                           src={order.productDetails.photo ? order.productDetails.photo : "/static/default_product_image.jpg"}
//                           alt={order.productDetails.name}
//                           className="img-fluid rounded-start small-card-img"
//                           style={{ width: '170px', height: '50px', marginRight: '10px' }}
//                         />
//                       </div>
//                     </td>
//                     <td>{order.productDetails.name}</td>
//                     <td>{order.quantity}</td>
//                     <td>{new Date(order.order_date).toLocaleString()}</td>
//                     <td>
//                       <Rate
//                         allowHalf
//                         value={order.rating || 0}
//                         onChange={value => handleRatingChange(order.id, value)}
//                         disabled={order.rating}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">No orders found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderHistoryPage;


//with paggination


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, fetchProductById, submitOrderRating } from '../../services/api';
import { AuthContext } from '../../Context/AuthProvider';
import { Rate, Pagination } from 'antd';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    fetchOrdersFromAPI();
  }, []);

  const fetchOrdersFromAPI = async () => {
    const userId = user?.user_id;
    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await fetchOrders(userId);
      const ordersWithProductDetails = await Promise.all(
        response.data
          .filter(order => order.user === userId)
          .map(async order => {
            const productResponse = await fetchProductById(order.product);
            return { ...order, productDetails: productResponse.data };
          })
      );
      setOrders(ordersWithProductDetails);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleRatingChange = async (orderId, value) => {
    setSelectedOrderId(orderId);
    setRatingValue(value);

    try {
      const userId = user.user_id;
      const selectedOrder = orders.find(order => order.id === orderId);
      const product_Id = selectedOrder.productDetails.id;

      await submitOrderRating(userId, orderId, product_Id, value);
      alert('Rating submitted successfully');

      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, rating: value } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
      <button className="btn btn-secondary mb-3" onClick={() => navigate('/home')}>
        Back to Home
      </button>
      <h3>Order History</h3>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Rate Order</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={order.productDetails.photo ? order.productDetails.photo : "/static/default_product_image.jpg"}
                          alt={order.productDetails.name}
                          className="img-fluid rounded-start small-card-img"
                          style={{ width: '170px', height: '50px', marginRight: '10px' }}
                        />
                      </div>
                    </td>
                    <td>{order.productDetails.name}</td>
                    <td>{order.quantity}</td>
                    <td>{new Date(order.order_date).toLocaleString()}</td>
                    <td>
                      <Rate
                        allowHalf
                        value={order.rating || 0}
                        onChange={value => handleRatingChange(order.id, value)}
                        disabled={order.rating}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            pageSize={ordersPerPage}
            total={orders.length}
            onChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
