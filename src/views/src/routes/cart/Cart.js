import HomeHeader from "../../components/home/HomeHeader";
import CartBookList from "../../components/cart/CartBookList";
import CartHeader from "../../components/cart/CartHeader";
import CartPriceInfo from "../../components/cart/CartPriceInfo";
import "./Cart.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Cart(){
    const {userName} = useParams();
    const cartName = `cart-${userName}`;
    const storageCart = localStorage.getItem(cartName);
    const initialCart = storageCart ? JSON.parse(storageCart) : [];
    const [cart,setCart] = useState(initialCart);

    // 체크여부확인용속성추가
    const addChecked = () => {
        if (cart.length !== 0){
            setCart((prev)=>{
                return prev.map(book => ({ ...book, checked: book.checked || false }));
            });
        }
    };

    useEffect(addChecked, []);
    useEffect(() => {
        localStorage.setItem(cartName, JSON.stringify(cart));
    }, [cart]);

    console.log("장바구니: " + JSON.stringify(cart));
    console.log(`빈 장바구니?: ${cart === null}`);

    return (
        <div>
            {cart.length === 0 ?
                <div>
                    {/* 장바구니없을때 */}
                    <h2>장바구니</h2>
                    <div>
                        {/* 적절한이미지*/}
                        장바구니에 담긴 책이 없습니다.
                    </div>
                    <Link to="/">
                        <button>책 담으러 가기</button>
                    </Link>
                </div>
            :
                <div>
                    {/* 장바구니에상품있을 때 */}
                    <div>
                        <HomeHeader/>
                    </div>
                    <hr/>
                    <div>
                        <CartHeader userName={userName} cart={cart} setCart={setCart} />
                        <div id="Book-Price">
                            <CartBookList userName={userName} cart={cart} setCart={setCart} />
                            <CartPriceInfo cart={cart} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;