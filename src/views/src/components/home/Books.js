import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books() {
    const [categorys, setCategorys] = useState([]);
    const [books, setBooks] = useState([]);

    
    useEffect(() => {
        fetch("http://localhost:8080/api/category")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('백엔드 에러 11');
                }
                return response.json();
            })
            .then((json) => {
                setCategorys(json);
                json.forEach((category) => {
                    fetch(`http://localhost:8080/api/category/${category.category_id}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("백엔드 접속 에러2");
                            }
                            return response.json();
                        })
                        .then((books) => {
                            setBooks(prevBooks => ({
                                ...prevBooks,
                                [category.category_id] : books.slice(0, 5)
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
            {
                categorys.length > 0 ? (

                    categorys.map((category) => (
                        <div>
                            <h3>{category.category_name}</h3>
                            <Link to={`/category/${category.category_id}`}>더보기</Link>
                            <div>
                                {
                                    books.length > 0 ? (

                                        books[category.category_id].map((book) => (
                                            <div>
                                              <div>book.book_img</div>
                                              <div>book.book_name</div>  
                                              <div>book.book_author</div>
                                            </div>
                                            
                                        ))
                                    ) :
                                    <h2>책이 없습니다.</h2>
                                }
                            </div> 
                        </div>
                        
                    ))
                ) : <h2>카테고리가 없습니다.</h2>
            }
        </div>
    );
}
export default Books;
