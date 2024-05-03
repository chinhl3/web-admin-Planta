import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const Home = () => {
    const chartRef = useRef(null);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]); // State để lưu tổng doanh thu hàng tháng

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const response = await fetch('http://localhost:6868/history');
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy dữ liệu');
                }
                const data = await response.json();
                // Xử lý dữ liệu từ API để tính tổng doanh thu hàng tháng
                const monthlyRevenue = calculateMonthlyRevenue(data.data);
                setMonthlyRevenue(monthlyRevenue); // Cập nhật state với tổng doanh thu hàng tháng
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchMonthlyRevenue();
    }, []);

    useEffect(() => {
        // Tạo biểu đồ cột
        const ctx = chartRef.current.getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
                datasets: [{
                    label: 'Doanh thu',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                    hoverBorderColor: 'rgba(75, 192, 192, 1)',
                    data: monthlyRevenue
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                layout: {
                    padding: {
                        right: 20
                    }
                }
            }
        });

        return () => {
            chartInstance.destroy(); // Hủy biểu đồ khi component unmount
        };

    }, [monthlyRevenue]);

    // Hàm tính tổng doanh thu hàng tháng từ dữ liệu đơn hàng
    const calculateMonthlyRevenue = (orders) => {
        const monthlyRevenue = [0, 0, 0, 0, 0, 0, 0]; // Mảng lưu tổng doanh thu hàng tháng

        orders.forEach(order => {
            const month = new Date(order.date).getMonth(); // Lấy tháng từ ngày đặt hàng
            monthlyRevenue[month] += order.tong; // Cộng tổng tiền của đơn hàng vào tháng tương ứng
        });

        return monthlyRevenue;
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '30%', padding: '10px' }}>
                    <h3>Menu</h3>
                    <ul>
                        <li><Link to="/product">Danh sách các sản phẩm đang bán</Link></li>
                        <li><Link to="/add_product">Thêm sản phẩm mới</Link></li>
                        <li><Link to="/history">Danh sách các đơn hàng</Link></li>
                    </ul>
                </div>
                <div style={{ flex: '70%', padding: '10px' }}>
                    <h3 style={{ textAlign: 'center' }}>Biểu đồ doanh thu các tháng</h3>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
}

export default Home;
