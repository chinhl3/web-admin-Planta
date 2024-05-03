import React, { useState } from 'react';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [origin, setOrigin] = useState("");
    const [inventory, setInventory] = useState("");
    const [type, setType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [imageLinks, setImageLinks] = useState([]);
    const [inputImageLink, setInputImageLink] = useState("");

    const handleImageLinkAdd = () => {
        if (inputImageLink.trim() !== "") {
            setImageLinks([...imageLinks, inputImageLink]);
            setInputImageLink("");
        }
    };

    const handleImageLinkDelete = (index) => {
        const newImageLinks = [...imageLinks];
        newImageLinks.splice(index, 1);
        setImageLinks(newImageLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            price,
            size,
            origin,
            inventory,
            type,
            categoryid: selectedCategory === "ưa sáng" ? 1 : 2, // Thay đổi giá trị dựa vào lựa chọn
            img: imageLinks
        };
        console.log("Dữ liệu sản phẩm mới: ", newProduct);
        // Gửi dữ liệu đến server hoặc xử lý theo yêu cầu của bạn
        try {
            const response = await fetch('http://localhost:6868/products/add_product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
    
            if (!response.ok) {
                throw new Error('Thêm sản phẩm thất bại.');
            }
    
            console.log("Thêm sản phẩm thành công.");
            // Thực hiện các hành động tiếp theo sau khi thêm thành công
            window.location.href=`/home`
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error.message);
            // Xử lý lỗi nếu cần thiết
        }
    };
    return (
        <div style={{ width: '100%' }}>
            <h2 className="text-center mb-4">Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit} style={{ width: '70%', marginLeft: '20%' }}>
                <div className="mb-1" style={{ width: '70%' }}>
                    <label htmlFor="productName" className="form-label">Tên sản phẩm:</label>
                    <input type="text" className="form-control" id="productName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productPrice" className="form-label">Giá:</label>
                    <input type="number" className="form-control" id="productPrice" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productSize" className="form-label">Kích thước:</label>
                    <input type="text" className="form-control" id="productSize" value={size} onChange={(e) => setSize(e.target.value)} />
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productOrigin" className="form-label">Xuất xứ:</label>
                    <input type="text" className="form-control" id="productOrigin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productInventory" className="form-label">Số lượng:</label>
                    <input type="number" className="form-control" id="productInventory" value={inventory} onChange={(e) => setInventory(Number(e.target.value))} />
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productType" className="form-label">Loại:</label>
                    <input type="text" className="form-control" id="productType" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productCategory" className="form-label">Danh mục:</label>
                    <select className="form-select" id="productCategory" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="ưa bóng">Ưa bóng</option>
                        <option value="ưa sáng">Ưa sáng</option>
                    </select>
                </div>
                <div className="mb-3" style={{ width: '70%' }}>
                    <label htmlFor="productImage" className="form-label">Liên kết ảnh:</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="text" className="form-control" value={inputImageLink} onChange={(e) => setInputImageLink(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={handleImageLinkAdd} style={{ marginLeft: '10px' }}>Thêm</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="currentImages" className="form-label">Các ảnh của sản phẩm:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {imageLinks && imageLinks.map((link, index) => (
                            <div key={index} style={{ position: 'relative', marginRight: '10px', marginBottom: '10px' }}>
                                <img src={link} alt={`Product Image ${index}`} style={{ width: '100px', height: '100px' }} />
                                <button type="button" onClick={() => handleImageLinkDelete(index)} className="btn btn-danger" style={{ position: 'absolute', top: '5px', right: '5px' }}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
            </form>
        </div>
    );
}

export default AddProduct;
