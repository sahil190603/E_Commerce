// import React, { useState, useEffect, useContext } from 'react';
// import { fetchProducts, addToCart, fetchCartItems , createOrder } from '../../services/api';
// import '../../Style/product.css';
// import { AuthContext } from '../../Context/AuthProvider';
// import { FaStar } from "react-icons/fa";

// const HomePage = () => {
//   const { user } = useContext(AuthContext) ?? {};
//   const [products, setProducts] = useState([]);


//   useEffect(() => {
//     fetchProductsData();
//   }, []);

//   const fetchProductsData = async () => {
//     try {
//       const response = await fetchProducts(); 
//       setProducts(response.data);
      
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleAddToCart = async (productId) => { 
//     const userId = user.user_id;
//     if (!userId) {
//       alert('User not logged in');
//       return;
//     }

//     try {
//       const cartResponse = await fetchCartItems(userId);
//       const cartItems = cartResponse.data;

//       const existingItem = cartItems.find(item => item.product === productId);

//       if (existingItem) {
//         alert('This product is already in your cart.');
//         return;
//       }

//       await addToCart(productId, userId); 
//       alert('Product added to cart!');
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add product to cart.');
//     }
//   };

//   const handleBuy =async (product) => {
//     debugger
//     try {
//        await createOrder({
//         user: user.user_id,
//         product: product.id,
//         quantity: 1
//       });
//       alert('Product purchased successfully!');
//       window.location.reload();
//     } catch (error) {
//       console.error('Error purchasing product:', error);
//       alert('Failed to purchase product.');
//     }

//    };

//   return (
//     <div className='p-4'>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-3 mb-3">
//             <div className={`card ${product.quantity === 0 ? 'bg-light text-muted' : ''}`}>
//               <img src={product.photo ? product.photo : "/static/default_product_image.jpg"} className="card-img-top" alt={product.name} height={80} width={120}/>
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">Price: ${product.price}</p>
//                 <p className="card-text">Available Quantity: {product.quantity}</p>
//                 <p className='card-text'>Count of sold: {product.sold_count}</p>
//                 <p className='card-text bg-success mb-2 Rating-text'>{(product.ratings).toFixed(1)}<FaStar className='Ratingstar'/></p>
//                 {product.quantity > 0 ? (
//                   <>
//                     <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
//                     <button className="btn btn-success ml-2" onClick={() => handleBuy(product)}>Buy</button>
//                   </>
//                 ) : (
//                  <p className="text-danger sold-out-text">Sold Out</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
























//   // const handleBuy = async (product) => {
//   //   try {
//   //     const quantity = parseInt(window.prompt('Enter quantity:', '1'), 10);

//   //     if (!quantity || quantity <= 0) {
//   //       alert('Invalid quantity');
//   //       return;
//   //     }

//   //     await createOrder({
//   //       user: user.user_id,
//   //       product: product.id,
//   //       quantity: quantity
//   //     });
//   //     alert('Product purchased successfully!');
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error('Error purchasing product:', error);
//   //     alert('Failed to purchase product.');
//   //   }
//   // };




import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts, addToCart, fetchCartItems, createOrder } from '../../services/api';
import '../../Style/product.css';
import { AuthContext } from '../../Context/AuthProvider';
import { FaStar } from "react-icons/fa";

const HomePage = () => {
  const { user } = useContext(AuthContext) ?? {};
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    male: false,
    female: false,
    kids: false,
    others: false,
  });

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const response = await fetchProducts(); 
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => { 
    const userId = user.user_id;
    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      const cartResponse = await fetchCartItems(userId);
      const cartItems = cartResponse.data;

      const existingItem = cartItems.find(item => item.product === productId);

      if (existingItem) {
        alert('This product is already in your cart.');
        return;
      }

      await addToCart(productId, userId); 
      alert('Product added to cart!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const handleBuy = async (product) => {
    try {
      await createOrder({
        user: user.user_id,
        product: product.id,
        quantity: 1
      });
      alert('Product purchased successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert('Failed to purchase product.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [name]: checked,
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      (selectedCategories.male && product.categories.includes('Male')) ||
      (selectedCategories.female && product.categories.includes('Female')) ||
      (selectedCategories.kids && product.categories.includes("Kid's")) ||
      (selectedCategories.others && product.categories.includes('Others')) ||
      (!selectedCategories.male && !selectedCategories.female && !selectedCategories.kids && !selectedCategories.others);
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className='p-4'>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <div className={`card ${product.quantity === 0 ? 'bg-light text-muted' : ''}`}>
              <img src={product.photo ? product.photo : "/static/default_product_image.jpg"} className="card-img-top" alt={product.name} height={80} width={120} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Available Quantity: {product.quantity}</p>
                <p className='card-text'>Count of sold: {product.sold_count}</p>
                <p className='card-text bg-success mb-2 Rating-text'>{(product.ratings).toFixed(1)}<FaStar className='Ratingstar' /></p>
                {product.quantity > 0 ? (
                  <>
                    <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                    <button className="btn btn-success ml-2" onClick={() => handleBuy(product)}>Buy</button>
                  </>
                ) : (
                  <p className="text-danger sold-out-text">Sold Out</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
