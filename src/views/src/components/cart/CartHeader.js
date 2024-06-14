import "./CartHeader.css";

function CartHeader({userName, cart, setCart}){
    const  cartName = `cart-${userName}`;

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem(cartName, JSON.stringify(newCart));
    };

    //전체선택
    const selectAllBooks = (event) => {
        const isChecked = event.target.checked;
        const newCart = (cart.map((book) => ({
                ...book, checked: isChecked
        })));
        updateCart(newCart);
    };

    //선택삭제
    const deleteCheckedBooks = () => {
        const newCart = cart.filter((book) => !book.checked);
        updateCart(newCart);
        alert("선택한 책이 삭제되었습니다.");
    };

    //전체삭제
    const deleteAllBooks = () => {
        // 삭제 코드
        setCart([]);
        localStorage.setItem(`cart-${userName}`,JSON.stringify([]));
        alert("모든 책이 삭제되었습니다.");
    };

    return (
        <div>
            <h2>장바구니</h2>
            <div className="check-delete">
                {/* 전체 선택 체크박스 */}
                <input
                    id="checkAll"
                    type="checkbox"
                    onChange={selectAllBooks}
                />
                <label htmlFor="checkAll"> 전체선택</label>
                <button
                    className="delete"
                    onClick={deleteCheckedBooks}
                >
                    선택삭제
                </button>
                <button
                    className="delete"
                    onClick={deleteAllBooks}
                >
                    전체삭제
                </button>
            </div>
        </div>
    );
}

export default CartHeader;