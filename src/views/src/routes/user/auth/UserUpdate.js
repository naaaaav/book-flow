import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const UserUpdate = () => {
  const initialUser = {
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
    address: ''
  };

  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams(); // userId

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('access');
        const response = await fetch(`/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error('사용자 데이터를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) { // id가 유효한 경우에만 데이터를 가져오도록 처리
      fetchUserData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accessToken = localStorage.getItem('access');
      const response = await fetch(`/user/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('사용자 정보가 업데이트 되었습니다.');
      } else {
        throw new Error('사용자 정보 업데이트 실패');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.goBack(); // 이전 페이지로 이동
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>유저 정보 수정</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
            readOnly // 수정 불가능하도록 설정
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            autoComplete="off" // 브라우저 저장 비활성화
          />
        </div>
        <div>
          <label>이름:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>전화번호:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            pattern="\d*"
            required
          />
        </div>
        <div>
          <label>주소:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">수정</button>
        <button type="button" onClick={handleCancel}>취소</button>
      </form>
    </div>
  );
};

export default UserUpdate;