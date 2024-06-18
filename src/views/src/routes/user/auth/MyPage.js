import React from 'react';
import { useHistory } from 'react-router-dom';

const MyPage = () => {
  const history = useHistory();
  const userId = localStorage.getItem('userId'); // 로그인 상태 확인

  const handleUpdateClick = () => {
    if (userId) {
      history.push(`/user/${userId}/update`);
    } else {
      history.push('/login');
    }
  };

  const handleDeleteClick = () => {
    if (userId) {
      history.push(`/user/${userId}/delete`);
    } else {
      history.push('/login');
    }
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <button onClick={handleUpdateClick}>회원정보 수정</button>
      <button onClick={handleDeleteClick}>회원 탈퇴</button>
    </div>
  );
};

export default MyPage;