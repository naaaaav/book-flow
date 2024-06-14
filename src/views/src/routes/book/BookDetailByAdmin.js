import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function BookDetailByAdmin({ match }) {
  const [book, setBook] = useState(null);
  const bookId = match.params.bookId;
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8080/api/book/${bookId}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('책 상세 정보를 가져오는 중 에러가 발생했습니다:', error));
  }, [bookId]);

  const handleEdit = () => {
    history.push(`/admin/book/edit/${bookId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'access': localStorage.getItem('access'),
        }
      });

      if (!response.ok) {
        throw new Error('책을 삭제하는데 문제가 발생했습니다.');
      }
      console.log('책이 삭제되었습니다.');
      history.push('/admin/books'); // 삭제 후 책 목록 페이지로 이동
    } catch (error) {
      console.error('책 삭제에 실패했습니다:', error);
    }
  };

  if (!book) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{book.bookName}</h1>
      <img src={book?.bookImgDtoList?.[0]?.imgUrl} alt="책 표지" />
      {/* ... 다른 책 상세 정보 ... */}
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default BookDetailByAdmin;
