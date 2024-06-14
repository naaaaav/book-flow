import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    .then(response => {
      const token = response.headers.get('access'); 
      console.log(response.headers.get('access'));
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));

      // (test) 더미 계정으로 로그인시 장바구니 생성
      localStorage.setItem('userName',username);
      localStorage.setItem(`cart-${username}`, JSON.stringify([]));

      history.push('/home');
    })
    .catch(error => {
      console.error('로그인 실패:', error);
    });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">로그인</button>
      </form>
      <button onClick={() => history.push('/join-test')}>회원가입</button> {/* 회원가입 버튼 */}
    </div>
  );
}

export default LoginTest;
