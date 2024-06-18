import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Withdrawal = () => {
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { id } = useParams(); // userId

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('access');
      const response = await fetch(`/user/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 204) {
        alert('회원 탈퇴가 성공적으로 처리되었습니다.');
        history.push('/'); // 회원 탈퇴 후 홈 페이지로 리디렉션
      } else {
        const data = await response.json();
        alert(`회원 탈퇴 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('회원 탈퇴 중 에러 발생:', error);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <h2>회원 탈퇴</h2>
      <form onSubmit={handleWithdrawal}>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleCancel}>취소</button>
        <button type="submit">회원탈퇴</button>
      </form>
    </div>
  );
};

export default Withdrawal;