import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import queryString from 'query-string';

const SearchResult = (props) => {

  const location = useLocation();
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { keyword = '', page = 0 } = queryString.parse(location.search);

  useEffect(() => {
    if (keyword) {
      fetchBooks(page, keyword);
    }
  }, [page, keyword]);
  

  const fetchBooks = (page, searchKeyword) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/books/search?keyword=${encodeURIComponent(searchKeyword)}&page=${page}&size=10`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.bookMainDtoList || []);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setBooks([]);
      });
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    history.push(`/search?keyword=${keyword}&page=${newPage}`);
  };

  return (
    <div>
      <h1>책 제목으로 검색할수 있어요.</h1>
      {books.length ? (
        <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/bookDetail/${book.id}`}><h2>{book.bookName}</h2></Link>
            <p>{book.bookDetail}</p>
            {book.bookImgDtoList[0]? (
              <img src={book?.bookImgDtoList[0]?.imgUrl} />
            ) : (<span>책 표지가 없어요.</span>)}
            
          </li>
          
        ))}
      </ul>
      ) : (
        <h2>검색 결과가 없어요.</h2>
      )
      }
       <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
    </div>
  );
};

export default SearchResult;
