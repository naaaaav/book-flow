import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BooksByAdmin({ match }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage] = useState(10); // 한 페이지에 표시할 책의 수
  const [totalPages, setTotalPages] = useState(0);
  const categoryId = match.params.categoryId;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/books/category/${categoryId}?page=${currentPage}&size=${booksPerPage}`);
        const data = await response.json();
        setBooks(data.bookMainDtoList);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('책 목록을 가져오는 중 에러가 발생했습니다:', error);
      }
    };

    fetchBooks();
  }, [categoryId, currentPage, booksPerPage]);

  // 페이지네이션 컨트롤러
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2>책 목록</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/admin/book/${book.id}`}>{book.bookName}</Link>
            <img src={book.bookImgDtoList[0].imgUrl} alt={book.bookName}/>
          </li>
        ))}
      </ul>
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => setCurrentPage(number)} className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default BooksByAdmin;
