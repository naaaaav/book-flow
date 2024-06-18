import "./CartHeader.css";
import {ChakraProvider, Stack, Checkbox, Text, Button, Divider, Flex} from '@chakra-ui/react';

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
        <ChakraProvider>
            <div className="cartHeader">
                <Text as='b' fontSize='4xl'>장바구니</Text>
                <div className="check-delete">
                    <Flex
                        justifyContent="center" /* 가로 중앙 정렬 */
                    >
                        <Stack spacing={750} direction='row' alignItems='center'>
                            <Checkbox
                                colorScheme='blue'
                                isChecked={cart.every((book) => book.checked)}
                                onChange={selectAllBooks}
                                size='md'
                                fontWeight='normal'
                            >
                                <Text fontSize='lg'>전체선택</Text>
                            </Checkbox>
                            <Stack className="delete" direction='row' spacing={2} align='center' ml='auto'>
                                <Button colorScheme='black' fontWeight='normal' variant='link' size='lg' onClick={deleteCheckedBooks}>
                                    선택삭제
                                </Button>
                                <Divider width='2px' height='15px' borderColor='gray.600' orientation='vertical' />
                                <Button colorScheme='black' fontWeight='normal' variant='link' size='lg' onClick={deleteAllBooks}>
                                    전체삭제
                                </Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </div>
            </div>
        </ChakraProvider>
    );
}

export default CartHeader;