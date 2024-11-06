import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/product.css';
import { fetchProducts, fetchCategories, deleteProduct } from '../../services/api';
import { IoIosAdd  } from "react-icons/io";
import { MdOutlineModeEdit , MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';




const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
 

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const productsResponse = await fetchProducts();
      console.log('data',productsResponse)
      const categoriesResponse = await fetchCategories();
      console.log("cat",categoriesResponse)

      const productsWithData = productsResponse.data.map(product => ({
        ...product,
        categories: findCategories(product.categories, categoriesResponse.data),
      }));
      console.log(productsWithData);

      setProducts(productsWithData);
      setFilteredProducts(productsWithData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const findCategories = (categoryIds, categoriesData) => {
    return categoriesData.filter(category => categoryIds.includes(category.id));
  };

  const handleEditBtn = (row) => {
    debugger
    navigate(`/edit/${row.id}`, {
      state: {
        defaultProduct: row,
      },
    });
  };

  const handleDeleteBtn = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        setFilteredProducts(filteredProducts.filter(product => product.id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.categories.some(category => category.name.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredProducts(filtered);
  }, [search, products]);



  return (
    <div className="mx-auto p-4">
      <div className="row ">
        <div className="col-10">
          <div><h1>Product</h1></div>
        </div>
        <div className="col-2 btn-right" >
          <div className='ml-auto'><Link to="/add"><button type="button" className="btn btn-dark"><IoIosAdd />Add Product</button></Link></div>
        </div>
      </div>
      
      <div className="row ser-right mb-3">
        <div className='col-2 '>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
       </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="table-secondary" >
            <tr>
              <th>Name</th>
              <th>Photo</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Categories</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} class="table-light">
                <td>{product.name}</td>
                <td><img src={product.photo} alt={product.name} style={{ width: 90, height: 50 }} /></td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.categories.map(category => category.name).join(', ')}</td>
                <td> 
                  <button  type="button" class="btn btn-success " onClick={() => handleEditBtn(product)}><MdOutlineModeEdit /></button> &nbsp;
                  <button type="button" class="btn btn-danger" onClick={() => handleDeleteBtn(product.id)}><MdDelete /></button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
