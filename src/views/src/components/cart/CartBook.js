import "./CartBook.css"
import bookPhoto from "../../resources/cart/forDesign.png";
import {Link} from "react-router-dom";

function CartBook({userName, cart, setCart}){
    const  cartName = `cart-${userName}`;

    console.log("장바구니: " + JSON.stringify(cart));
    console.log(`빈 장바구니: ${cart === null}`);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem(cartName, JSON.stringify(newCart));
    };

    // 책인덱스찾기
    const findIndexOfBook = (book) => {
        return cart.findIndex((index) => index.book_id === book.book_id);
    };

    // 수량
    const clickMinus = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && cart[i].book_quantity > 1 ){
            const newCart = [...cart];
            newCart[i].book_quantity -= 1;
            console.log("수정후: " + JSON.stringify(newCart));
            updateCart(newCart);
        }
        else {
            alert("수량은 한 권 이상이어야 합니다.");
        }
    };

    const clickPlus = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && cart[i].book_quantity < cart[i].book_stock ){
            const newCart = [...cart];
            newCart[i].book_quantity += 1;
            updateCart(newCart);
        }
        else {
            alert("재고가 부족합니다.");
        }
    };

    // 특정상품선택
    const checkEachBook = (event) => {
        const isChecked = event.target.checked;
        const newCart = cart.map((book) => ({
                ...book, checked: isChecked
            }));
        updateCart(newCart);
    };

    // 특정상품삭제
    const deleteBook = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && window.confirm(book.book_name + "을(를) 삭제하시겠습니까?")) {
            const userName = localStorage.getItem('userName');
            const newCart = [...cart];
            newCart.splice(i, 1);
            updateCart(newCart);
            alert(book.book_name + "이(가) 삭제되었습니다.");
        }
    };

    return (
        <div>
            {cart.map((book) => (
                <div key={book.book_id} className="each-book">
                    <input
                        id="checkEach"
                        type="checkbox"
                        checked={book.checked}
                        onChange={checkEachBook}
                    />
                    <div className="about-book">
                        <Link to="/bookDetailTest">
                            <img id="book-photo" src={book.img_url} alt={bookPhoto} />
                        </Link>
                        <div id="title-price">
                            <Link to="/bookDetailTest">
                                <div id="book-title">{book.book_name}</div>
                            </Link>
                            <div id="book-price">{book.book_price}원</div>
                        </div>
                        <div className="separator"></div>
                        <div id="quantity-edit">
                            <div id="total-price"> {book.book_price * book.book_quantity}원</div>
                            <button onClick={() => clickMinus(book)}>-</button>
                            <span id="total-quantity"> {book.book_quantity} </span>
                            <button onClick={() => clickPlus(book)}>+</button>
                        </div>
                        <div>
                            <button onClick={() => deleteBook(book)}> x</button>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>
    );
}

export default CartBook;