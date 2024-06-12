import React, { useState, useEffect } from 'react';

const BookDetailPage = ({ match }) => {
  const [book, setBook] = useState(null);

  const fetchBookDetail = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/book/${bookId}`);
      if (!response.ok) {
        throw new Error('서버에서 책 정보를 가져오는데 문제가 발생했습니다.');
      }
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('책 정보를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    const bookId = match.params.bookId;
    fetchBookDetail(bookId);
  }, [match.params.bookId]);

  if (!book) {
    return <div>책 정보를 가져오고 있습니다...</div>;
  }

  return (
    <div>
      <h1>{book.bookName}</h1>
      <p>{book.bookDetail}</p>
      <img src={book.bookImgDtoList[0].imgUrl} alt="책 표지" />
      <div>
        {book.bookImgDtoList.slice(1).map((img, index) => (
          <img key={index} src={img.imgUrl} alt={`상세 이미지 ${index + 1}`} />
        ))}
      </div>
      <p>가격: {book.bookPrice}원</p>
    </div>
  );
};

export default BookDetailPage;
