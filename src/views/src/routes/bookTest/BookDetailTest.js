import {useEffect, useState} from "react";
import bookData from "./testBookData.json";
import {useHistory, useParams} from "react-router-dom";

function BookDetailTest(){
    const {bookId} = useParams();
    const history = useHistory();

    // 책데이터
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const thisBook = bookData.find((book) => book.id === parseInt(bookId));
        if (thisBook) {
            setBooks([
                {
                book_id: thisBook.id,
                    book_name: thisBook.bookName,
                    book_price: thisBook.bookPrice,
                    book_stock: thisBook.stock,
                    book_detail: thisBook.bookDetail,
                    category_id: thisBook.categoryId,
                    category_name: thisBook.categoryName,
                    img_url: thisBook.bookImgUrl,
                }
            ]);
        } else {
            throw new Error("해당 책 정보를 찾을 수 없습니다.");
        }
    }, [bookId]);

    /*
    useEffect(() => {
        const transformBook = bookData.map((item) => ({
            book_id: item.id,
            book_name: item.bookName,
            book_price: item.bookPrice,
            book_stock: item.stock,
            book_detail: item.bookDetail,
            category_id: item.categoryId,
            category_name: item.categoryName,
            img_url: item.bookImgUrl
        }));
        setBooks(transformBook);
    } , []);
    */

    // 책수량
    const [bookQuantity, setBookQuantity] = useState(1);
    const clickMinus = () => {
        setBookQuantity((prev) => prev === 1? prev : prev - 1);
    };
    const clickPlus = (book_stock) => {
        setBookQuantity((prev) => prev === book_stock? prev : prev+1);
    };

    // 장바구니: 상품추가
    const clickAddCart = (book) => {
        const token = localStorage.getItem('token');
        if (token === null){
            alert("로그인 후 이용 가능합니다.");
        } else {
            // 사용자카트가져오기
            const cartName = `cart-${localStorage.getItem('userName')}`;
            let cart = JSON.parse(localStorage.getItem(cartName));

            // 빈카트이면빈배열로 초기화
            if (cart === null) {
                cart = [];
                console.log("빈 장바구니: " + cart);
            }

            // 카트에 상품 존재하면 위치, 없으면-1
            const existingBookIndex = cart.findIndex((index) => index.book_id === book.book_id);
            console.log("위치인덱스: " + existingBookIndex);

            const ifAdd = window.confirm("해당 상품을 장바구니에 추가하시겠습니까?");
            if(ifAdd){
                // 카트에 상품 존재&(현재수량+추가수량>재고):
                if (existingBookIndex !== -1) {
                    const currentQuantity = cart[existingBookIndex].book_quantity;
                    const availableQuantity = book.book_stock - currentQuantity;
                    if (currentQuantity+bookQuantity > book.book_stock){
                        alert(`재고가 부족하여 추가할 수 없습니다. (추가가능수량: ${availableQuantity})`)
                        return;
                    }
                }

                // 카트에 상품 없으면 추가, 있으면 수량 수정
                if (existingBookIndex === -1) {
                    cart.push({...book, book_quantity: bookQuantity});
                } else {
                    cart[existingBookIndex].book_quantity += bookQuantity;
                }
                localStorage.setItem(cartName, JSON.stringify(cart));
                console.log("장바구니: " + JSON.stringify(cart));
                alert("장바구니에 상품이 추가되었습니다!");
                if (window.confirm("장바구니로 이동하시겠습니까?")) {
                    const userName = localStorage.getItem('userName');
                    history.push(`/cart/${userName}`);
                }
            }
        }
    };

    return (
        <div>
            <ul>
                {books.map((book) => (
                    <ul key={book.book_id}>
                        <img src={book.img_url}/>
                        <p>{book.book_name}</p>
                        <p>{book.book_price}</p>
                        <button onClick={clickMinus}>-</button>
                        <span> {bookQuantity} </span>
                        <button onClick={() => clickPlus(book.book_stock)}> +</button>
                        <p>
                            <button onClick={() => clickAddCart(book)}> 장바구니담기</button>
                        </p>
                    </ul>
                ))}
            </ul>
        </div>
    );
}

export default BookDetailTest;