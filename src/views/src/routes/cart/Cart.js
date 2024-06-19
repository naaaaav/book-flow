import HomeHeader from "../../components/home/HomeHeader";
import Footer from "../../components/home/Footer";
import CartBookList from "../../components/cart/CartBookList";
import CartHeader from "../../components/cart/CartHeader";
import CartPriceInfo from "../../components/cart/CartPriceInfo";
import "./Cart.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChakraProvider, Divider, Text, Button, Stack, Flex, Image} from '@chakra-ui/react';
import EmptyCart from "../../resources/cart/emptyCart.png";

function Cart(){
    const {userName} = useParams();
    const cartName = `cart-${userName}`;
    const storageCart = localStorage.getItem(`${cartName}`);
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
    console.log(`빈 장바구니?: ${cart.length === 0}`);

    return (
        <ChakraProvider>
            <div>
                <div>
                    <HomeHeader cart={cart} />
                </div>
                <Divider orientation='horizontal' color='rgb(239, 239, 239)'/>
                {cart.length === 0 ?
                    <div className="main cartHeader">
                        {/* 장바구니없을때 */}
                        <Text as='b' fontSize='4xl'>장바구니</Text>
                        <Divider orientation='horizontal' color='rgb(239, 239, 239)' mt={5} mb={20}/>
                        <Flex
                            height="100vh" /* 화면의 전체 높이를 차지하도록 설정 */
                            justifyContent="center" /* 가로 중앙 정렬 */
                        >
                            <Stack spacing={5} direction="column" ml={20} textAlign="center">
                                <Stack spacing={1} direction="column" textAlign="center">
                                    <Text as='b' fontSize='2xl' color='darkslategray'> 장바구니에 담긴 책이 없습니다. </Text>
                                    <Image src={EmptyCart} transform="scale(0.7)" />
                                </Stack>
                                <Link to="/">
                                    <Button colorScheme="blue" variant="solid" size='lg' width={195}>
                                        책 담으러 가기
                                    </Button>
                                </Link>
                            </Stack>
                        </Flex>
                    </div>
                    :
                    <div>
                    {/* 장바구니에상품있을 때 */}
                    <div className="main">
                        <CartHeader userName={userName} cart={cart} setCart={setCart}/>
                        <Flex
                            height="100vh"
                            justifyContent="center" /* 가로 중앙 정렬 */
                            background='rgb(248, 248, 248)'
                        >
                            <div id="Book-Price">
                                <CartBookList userName={userName} cart={cart} setCart={setCart}/>
                                <CartPriceInfo cart={cart}/>
                            </div>
                        </Flex>
                    </div>
                </div>
                }
                <Footer />
            </div>
        </ChakraProvider>
    );
}

export default Cart;