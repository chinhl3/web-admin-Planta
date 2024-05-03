import React, { useEffect, useState } from 'react';

const History = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:6868/history');
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy dữ liệu đơn hàng');
                }
                const data = await response.json();
                console.log("Dữ liệu đã lấy:", data); // Ghi log dữ liệu đã lấy
                setOrders(data.data); // Lưu data vào state
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            }
        };
    
        fetchOrders();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Danh sách đơn hàng</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Ngày đặt hàng</th>
                        <th scope="col">Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.name}</td>
                            <td>{order.address}</td>
                            <td>{order.phone}</td>
                            <td>{order.tong}</td>
                            <td>{order.date}</td>
                            <td>
                                {order.selected_product[0].img.length > 0 ? (
                                    <img src={order.selected_product[0].img[0]} alt="Product" className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                                ) : (
                                    <span>No image available</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
