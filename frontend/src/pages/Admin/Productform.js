import React, { useState, useEffect } from 'react';
import { fetchCategories, createProduct, updateProduct } from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../Style/product.css'
import { Link } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { defaultProduct } = location.state || {};

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: defaultProduct?.name || '',
    photo: null,
    quantity: defaultProduct?.quantity || '',
    price: defaultProduct?.price || '',
    categories: defaultProduct?.categories.map(category => category.id) || [],
  });

  const [photoURL, setPhotoURL] = useState(defaultProduct ? defaultProduct.photo : null);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const categoryId = parseInt(value);
    setForm((prevForm) => {
      if (checked) {
        return { ...prevForm, categories: [...prevForm.categories, categoryId] };
      } else {
        return { ...prevForm, categories: prevForm.categories.filter((category) => category !== categoryId) };
      }
    });
  };



  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPhotoURL(URL.createObjectURL(file));  
    } else {
      setForm({ ...form, photo: null });
      setPhotoURL(null); 
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('quantity', form.quantity);
    formData.append('price', form.price);
    form.categories.forEach((categoryId) => formData.append('categories', categoryId));
  
    if (form.photo) {
      formData.append('photo', form.photo);
    }
  
    try {
      if (defaultProduct) {
        await updateProduct(defaultProduct.id,formData);
        alert('Product updated successfully!');
      } else {
        await createProduct(formData);
        alert('Product added successfully!');
      }
      navigate('/list');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = (row) => {
      // navigate(-1);
      window.location.reload();
  };

  return (
    <div className="container mt-3">
     <Link to="/list"><button type="button" className="btn btn-secondary">Back</button></Link>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">{defaultProduct ? 'Edit Product' : 'Add Product'}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="productName" className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="productName"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="productPhoto" className="form-label">Photo:</label>
                  <input
                    type="file"
                    name="photo"
                    id="productPhoto"
                    onChange={handlePhotoChange}
                    className="form-control"
                    required={!defaultProduct}
                  />
                  {photoURL && (
                    <div>
                      <img src={photoURL} alt="Product" style={{ width: '150px', marginTop: '10px' }} />
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label htmlFor="productQuantity" className="form-label">Quantity:</label>
                  <select
                    name="quantity"
                    id="productQuantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select</option>
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label htmlFor="productPrice" className="form-label">Price:</label>
                  <input
                    type="number"
                    name="price"
                    id="productPrice"
                    value={form.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                    min="1"
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Categories:</label>
                  {categories.map((category) => (
                    <div key={category.id} className="form-check">
                      <input
                        type="checkbox"
                        name="categories"
                        value={category.id}
                        checked={form.categories.includes(category.id)}
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                      />
                      <label className="form-check-label">{category.name}</label>
                    </div>
                  ))}
                </div>
                <div className="d-grid gap-2">
                < div class="row">
                   <div class="col"><button  type="submit" className="btn btn-primary">submit</button> &nbsp;
                   <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button></div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
