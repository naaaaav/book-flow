import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Books.css';
import defaultBookCover from "../../resources/book/default book cover.png";

function Books() {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('백엔드 에러 11');
            }
            return response.json();
          })
          .then((json) => {
            setCategories(json);
            json.forEach((category) => {
              fetch(`${process.env.REACT_APP_API_URL}/api/books/category/${category.id}`)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("백엔드 접속 에러2");
                  }
                  return response.json(); // 여기를 수정했습니다.
                })
                .then((data) => {
                  setBooks(prevBooks => ({
                    ...prevBooks,
                    [category.id]: data.bookMainDtoList.slice(0, 5) // 여기를 수정했습니다.
                  }));
                })
                .catch((e) => {
                  console.log("백엔드 접속 에러3", e);
                });
            });
          })
          .catch((e) => {
            console.log("백엔드 접속 에러4", e);
          });
      }, []);
      

      return (
        <div>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id}>
                <h3>{category.categoryName}</h3>
                <Link to={`/category/${category.id}`}>더보기</Link>
                <div className="book-list">
                  {books[category.id] && books[category.id].length > 0 ? (
                    books[category.id].map((book) => (
                      <div key={book.id} className="book-item">
                        <Link to={`/bookDetail/${book.id}`}>
                          {book.bookImgDtoList && book.bookImgDtoList.length > 0 && book.bookImgDtoList[0].imgUrl ? (
                            <img src={book.bookImgDtoList[0].imgUrl} alt={book.bookName} />
                          ) : (
                            // <div>이미지가 없습니다</div>
                            <img src={defaultBookCover} alt={defaultBookCover} />
                          )}
                        </Link>
                        <div><Link to={`/bookDetail/${book.id}`}>{book.bookName}</Link></div>
                        <div>{book.bookAuthor}</div>
                      </div>
                    ))
                  ) : (
                    <h2>책이 없습니다.</h2>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h2>카테고리가 없습니다.</h2>
          )}
        </div>
      );
    }
    export default Books;

