import CartBook from "./CartBook";


function CartBookList({userName, cart, setCart}){

    return (
        <div>
            <CartBook
                userName={userName}
                cart={cart}
                setCart={setCart}
            />
        </div>
    );
}

export default CartBookList;