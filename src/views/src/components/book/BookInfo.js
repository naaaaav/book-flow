import { useState } from "react";
import { useHistory } from "react-router-dom";

function BookInfo({book}){
    const history = useHistory();

    // 책수량
    const [bookQuantity, setBookQuantity] = useState(1);
    const clickMinus = () => {
        setBookQuantity((prev) => prev === 1? prev : prev - 1);
    };
    const clickPlus = () => {
        setBookQuantity((prev) => prev === book.book_stock? prev : prev+1);
    };

    const clickBuyNow = () => {
        const orderData = {
            orderItemDtos: [
                {
                    orderItemQuantity: bookQuantity,
                    bookId: book.book_id
                },
            ],
        };
        try {
            const ifBuy = window.confirm("바로 구매하시겠습니까?");
            if(ifBuy) {
                history.push({
                    pathname: '/order',
                    state: {orderData}
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('주문 처리 중 오류가 발생했어요.');
        }
    };

    const clickAddCart = () => {
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
            <img src={book.img_url} alt="bookImg" />
            <div className="basic_info">
                <div>
                    {book.book_name}
                </div>
                <div>
                    {book.book_detail}
                </div>
                <div>
                    {book.book_price}
                </div>
            </div>
            <div className="to_order">
            <div className="book-quantity">
                    <button onClick={clickMinus}>-</button>
                    <input
                        type="number"
                        min="1"
                        max={book.book_stock}
                        value={bookQuantity}
                        onChange={(e) => setBookQuantity(parseInt(e.target.value))}
                    />
                    <button onClick={clickPlus}>+</button>
                </div>
                <div className="order-cart-button">
                    <button onClick={clickBuyNow}>바로구매</button>
                    <button onClick={clickAddCart}>장바구니</button>
                </div>
            </div>
        </div>
    );
}

export default BookInfo;