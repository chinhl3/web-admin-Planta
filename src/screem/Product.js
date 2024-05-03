import React, { useState, useEffect } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm khi component được tạo
    fetch('http://localhost:6868/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (productId) => {
    // Gọi API để xóa sản phẩm
    fetch(`http://localhost:6868/products/delete?id=${productId}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Cập nhật danh sách sản phẩm sau khi xóa
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    })
    .catch(error => console.error('Error deleting product:', error));
    // console.log(productId)
  }

  const handleEdit = (productId) => {
    // Điều hướng đến trang chỉnh sửa sản phẩm
    window.location.href = `/update_product?id=${productId}`;
    
  }

  return (
    <div className="container mt-4">
      <h1>Danh sách sản phẩm</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Size</th>
            <th>Origin</th>
            <th>Inventory</th>
            <th>Type</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <div>
                  {product.img.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '5px' }} />
                  ))}
                </div>
              </td>
              <td>{product.size}</td>
              <td>{product.origin}</td>
              <td>{product.inventory}</td>
              <td>{product.type}</td>
              <td>{product.type === 'chau cay' ? '' : product.category.like}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(product._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
