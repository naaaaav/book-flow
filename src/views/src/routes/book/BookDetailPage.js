import React, { useState, useEffect } from 'react';

const BookDetailPage = ({ match }) => {
  const [book, setBook] = useState(null);

  const fetchBookDetail = async (bookId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}`);
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
      <h2>카테고리 : {book.category.categoryName}</h2>
      <p>{book.bookDetail}</p>
      {book.bookImgDtoList[0].imgUrl ? (
      <img src={book.bookImgDtoList[0].imgUrl} alt="책 표지" />
    ) : (
      <div>표지가 없습니다</div>
    )}
      <div>
      {book.bookImgDtoList.length > 1 ? (
        book.bookImgDtoList.slice(1).map((img, index) => (
          img.imgUrl ? (
            <img key={index} src={img.imgUrl} alt={`상세 이미지 ${index + 1}`} />
          ) : (
            <div key={index}>상세 이미지가 없습니다</div>
          )
        ))
      ) : (
        <div>상세 이미지가 없습니다</div>
      )}
    </div>

      <p>가격: {book.bookPrice}원</p>
    </div>
  );
};

export default BookDetailPage;
