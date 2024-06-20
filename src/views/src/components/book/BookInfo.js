import { useState } from "react";
import { useHistory } from "react-router-dom";
import {ChakraProvider, Stack, Text, Button, Image, Box, Input} from '@chakra-ui/react';
import defaultImage from '../../resources/book/default book cover.png';

function BookInfo({book, images}){
    const history = useHistory();
    const token = localStorage.getItem('token');

    // 책수량
    const [bookQuantity, setBookQuantity] = useState(1);
    const clickMinus = () => {
        setBookQuantity((prev) => prev === 1? prev : prev - 1);
    };
    const clickPlus = () => {
        setBookQuantity((prev) => prev === book.book_stock? prev : prev+1);
    };

    const clickBuyNow = () => {
        if(token === null){
            alert("로그인 후 이용 가능합니다.");
            history.push('/login');
         }else {
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
                if (ifBuy) {
                    history.push({
                        pathname: '/order',
                        state: {orderData}
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                alert('주문 처리 중 오류가 발생했어요.');
            }
        }
    };

    const clickAddCart = () => {
            const userName = localStorage.getItem('userName') || 'guest';
            const cartName = `cart-${userName}`;
            console.log(userName);
            let cart = JSON.parse(localStorage.getItem(cartName)) || [];

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
                    history.push(`/cart/${userName}`);
                }
            }
    };

    return (
        <ChakraProvider>
            <div>
                <Stack spacing={5} direction='row' mt={30} ml={20} mb={50} mr={20}>
                    <Stack>
                        <Box
                            maxW='350px'
                            maxH='400px'
                            borderWidth='1px'
                            overflow='hidden'
                            boxShadow='lg'
                            mr={3}
                            ml={1}
                        >
                            <Image
                                id="book-photo"
                                w='350px'
                                h='400px'
                                objectFit='contain'
                                src={images && images.length > 0 ? images[0] : defaultImage}
                                alt={book.book_name}
                            />
                        </Box>
                    </Stack>
                    <Stack spacing={105} direction='column' mt={1}>
                        <Stack spacing={5} direction='column'>
                            <Stack spacing={1} direction='column'>
                                <Text fontSize='3xl'>{book.book_name}</Text>
                                <Stack spacing={1} direction='row'>
                                    <Text fontSize='xs' textColor='darkgray'>분야 : </Text>
                                    <Text fontSize='xs' textColor='darkgray'>{book.book_category}</Text>
                                </Stack>
                                <Stack spacing={1} direction='row'>
                                    <Text fontSize='xs' textColor='darkgray'>출판사 : </Text>
                                    <Text fontSize='xs' textColor='darkgray'>{book.book_publisher}</Text>
                                </Stack>
                                <Text fontSize='xl' color='dodgerblue'>{book.book_author}</Text>
                            </Stack>
                            <Text fontSize='xl' color='dodgerblue' alignSelf='flex-end'>{book.book_price}원</Text>
                        </Stack>
                        <Stack className="to_order" spacing={5}>
                            <Stack className="book-quantity" spacing={1} direction='row'>
                                <Button colorScheme='black' variant='link' onClick={clickMinus} mr={2} size='lg' color="dimgray">
                                    -
                                </Button>
                                <Input
                                    size='md'
                                    type="number"
                                    min="1"
                                    max={book.book_stock}
                                    value={bookQuantity}
                                    onChange={(e) => setBookQuantity(parseInt(e.target.value))}
                                    css={{textAlign: 'center'}}
                                />
                                <Button colorScheme='black' variant='link' onClick={clickPlus} size='lg' color="dimgray">
                                    +
                                </Button>
                            </Stack>
                            <Stack className="order-cart-button" direction='row' spacing={2} align='center'>
                                <Button colorScheme='blue' variant='outline' size='lg' onClick={clickAddCart}>
                                    장바구니
                                </Button>
                                <Button colorScheme='blue' onClick={clickBuyNow} size='lg'>
                                    바로구매
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        </ChakraProvider>
    );
}

export default BookInfo;