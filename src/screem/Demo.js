
import React, { useState } from 'react'
import '../../src/App.css'

const Demo = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email)
      console.log(password)
      // Gọi API đăng nhập bằng fetch
      const response = await fetch('http://localhost:6868/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập thất bại');
      }

      // Xử lý kết quả ở đây, ví dụ chuyển hướng sau khi đăng nhập thành công
      console.log('Đăng nhập thành công');
      const userInfo = { email }; // Thông tin người dùng có thể được mở rộng
      localStorage.setItem('user', JSON.stringify(userInfo));
      // chuyển sang trang home
      window.location.href = 'http://localhost:3000/home';


      // Đặt lại trạng thái của form sau khi xử lý
      setemail('');
      setPassword('');
    } catch (error) {
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo lỗi
      console.error('Đăng nhập thất bại:', error.message);
    }
  };

  return (
    <div className="App">
    <h1>Đăng nhập</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Tên đăng nhập:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
  )
}

export default Demo