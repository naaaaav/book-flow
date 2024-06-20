import "./CartPriceInfo.css"
import {Link, useHistory} from "react-router-dom";
import {ChakraProvider, Divider, Stack, Text, Button, Flex} from '@chakra-ui/react';

function CartPriceInfo({cart}){
    const history = useHistory();
    const checkedCart = cart.filter((book) => book.checked);
    const token = localStorage.getItem('token');

    // 체크된 책 총 가격, 총 수량
    const { totalBookPrice, checkedQuantity } = checkedCart.reduce((acc, book) => {
        acc.totalBookPrice += book.book_price * book.book_quantity;
        acc.checkedQuantity += book.book_quantity;
        return acc;
    }, { totalBookPrice: 0, checkedQuantity: 0 });

    // 배송비, 최종금액, 안내문구
    const deliveryPrice = (totalBookPrice >= 50000)? 0 : 3000;
    const totalPrice = totalBookPrice + deliveryPrice;
    const deliveryMessage = (totalBookPrice >= 50000)? null : "(50,000원 이상 주문시 무료배송)";

    // 주문하기 클릭시
    const clickOrder = async () => {
        if(checkedQuantity === 0){
            alert("책을 선택해 주세요.");
            return;
        }

        if(token === null){
            alert("로그인 후 이용 가능합니다.");
            history.push('/login');
            return;
        }
        const orderData = {
            orderItemDtos: checkedCart.map(book => ({
                orderItemQuantity: book.book_quantity,
                bookId: book.book_id
            }))
        };
        try {
            history.push({
                pathname: '/order',
                state: {orderData}
            });
        } catch (error) {
            console.error('Error:', error);
            alert('주문 처리 중 오류가 발생했어요.');
        }
    };

    return (
        <ChakraProvider>
            <div>
                {/*{checkedCart.length > 0 && (*/}
                    <div className="price-info">
                        <Stack spacing={0} direction='column'>
                            <Text as='b' id="but-info" fontSize='2xl'>결제정보</Text>
                            <div className="each-price">
                                <Stack spacing={0} direction='column' mt={15}>
                                    <Stack id="book-price" spacing={2} direction='row' ml={1} mr={1} justifyContent="space-between">
                                        <Text fontSize='lg' fontWeight='normal'>상품금액: </Text>
                                        <Text fontSize='lg' fontWeight='normal' textAlign="right">{totalBookPrice}원</Text>
                                    </Stack>
                                    <Stack id="delivery-price" spacing={2} direction='row' ml={1} mr={1} justifyContent="space-between">
                                        <Text fontSize='lg' fontWeight='normal'>배송비: </Text>
                                        <Text fontSize='lg' fontWeight='normal' textAlign="right">+ {deliveryPrice}원</Text>
                                    </Stack>
                                    <Text fontSize='xs' color='dodgerblue' fontWeight='normal' textAlign="right">{deliveryMessage}</Text>
                                </Stack>
                                <Stack direction='row' p={1} mt={2}>
                                    <Divider width='230px' borderColor='lightgray' />
                                </Stack>
                                <Stack id="total-price" spacing={0} direction='row' mt={2} ml={1} mr={1} justifyContent="space-between">
                                    <Text fontSize='lg' fontWeight='normal'>총 결제금액: </Text>
                                    <Text fontSize='lg' fontWeight='normal' textAlign="right">{totalPrice}원</Text>
                                </Stack>
                            </div>
                            <div className="each-button">
                                <Stack spacing={2} direction='column' mt={6} ml={1} justifyContent="space-between">
                                    <Button id="go-to-buy" colorScheme='blue' variant='solid' onClick={clickOrder} width={220}>
                                        구매하기 ({checkedQuantity})
                                    </Button>
                                    <Link to="/">
                                        <Button id="more-book" colorScheme='blue' variant='outline' width={220} mb={5}>
                                            더 담으러 가기
                                        </Button>
                                    </Link>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                {/*)}*/}
            </div>
        </ChakraProvider>
    );
}

export default CartPriceInfo;