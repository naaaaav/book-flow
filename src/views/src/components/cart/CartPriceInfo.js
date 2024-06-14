import "./CartPriceInfo.css"
import {Link, useHistory} from "react-router-dom";

function CartPriceInfo({cart}){
    const history = useHistory();
    const checkedCart = cart.filter((book) => book.checked);
    const token = localStorage.getItem('token');

    // 체크된 책 총 가격, 총 수량
    let totalBookPrice = 0;
    let checkedQuantity = 0;
    checkedCart.forEach((book) => {
        const bookPrice = book.book_price;
        const bookQuantity = book.book_quantity;
        totalBookPrice += bookPrice * bookQuantity;
        checkedQuantity += bookQuantity;
    });

    // 배송비, 최종 금액
    const deliveryPrice = (totalBookPrice >= 50000)? 0 : 3000;
    const totalPrice = totalBookPrice + deliveryPrice;

    // 주문하기 클릭시
    const clickOrder = async () => {
        const orderData = {
            orderItemDtos: checkedCart.map(book => ({
                orderItemQuantity: book.book_quantity,
                bookId: book.book_id
            }))
        };
        try {
            history.push({
                pathname: '/order',
                state: { orderData }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('주문 처리 중 오류가 발생했어요.');
        }
    };

    return (
        <div>
            {checkedCart.length > 0 && (
                <div className="price-info">
                    <h3>결제정보</h3>
                    <div className="each-price">
                        <div id="book-price">
                            상품금액: {totalBookPrice}원
                        </div>
                        <div id="delivery-price">
                            배송비: + {deliveryPrice}원
                        </div>
                        <hr/>
                        <div id="total-price">
                            총 결제금액: {totalPrice}원
                        </div>
                    </div>
                    <div className="each-button">
                        <button id="go-to-buy" onClick={clickOrder}>구매하기 ({checkedQuantity})</button>
                        <Link to="/">
                            <button id="more-book">더 담으러 가기</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPriceInfo;