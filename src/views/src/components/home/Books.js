import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/categories")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('백엔드 에러 11');
                }
                return response.json();
            })
            .then((json) => {
                setCategories(json);
                json.forEach((category) => {
                    fetch(`http://localhost:8080/api/books/category/${category.categoryId}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("백엔드 접속 에러2");
                            }
                            return response.json();
                        })
                        .then((books) => {
                            setBooks(prevBooks => ({
                                ...prevBooks,
                                [category.categoryId]: books.slice(0, 5)
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
                    <div key={category.categoryId}>
                        <h3>{category.categoryName}</h3>
                        <Link to={`/category/${category.categoryId}`}>더보기</Link>
                        <div>
                            {books[category.categoryId] && books[category.categoryId].length > 0 ? (
                                books[category.categoryId].map((book) => (
                                    <div key={book.id}>
                                        <img src={book.bookImgUrl} alt={book.bookName} />
                                        <div>{book.bookName}</div>
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

