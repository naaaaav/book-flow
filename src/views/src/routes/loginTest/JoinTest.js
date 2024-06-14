import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 


function JoinTest() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phoneNumber: ''
  });
  const history = useHistory(); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
          /* 회원가입 완료시, 사용자별 장바구니 생성
          const userName = formData.username;
          localStorage.setItem('userName',userName);
          localStorage.setItem(`cart-${userName}`, JSON.stringify([]));
           */
          history.push('/loginTest');
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error('API 요청 중 에러 발생:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="아이디"
      />
      <input
        type="text"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="비밀번호"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        placeholder="전화번호"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="이름"
      />
      <button type="submit">회원가입</button>
    </form>
  );
}


export default JoinTest;