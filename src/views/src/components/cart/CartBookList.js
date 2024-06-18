import CartBook from "./CartBook";


function CartBookList({userName, cart, setCart}){

    return (
        <div>
            {/*
            {cart.map((book) => (
                <CartBook key={book.book_id} userName={userName} cart={cart} setCart={setCart} />
            ))}
            */}
            <CartBook userName={userName} cart={cart} setCart={setCart} />
        </div>
    );
}

export default CartBookList;