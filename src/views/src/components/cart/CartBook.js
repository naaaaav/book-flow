import "./CartBook.css"
import {Link} from "react-router-dom";
import {ChakraProvider, Divider, Stack, Checkbox, CloseButton, Box, Image, Text, Button} from '@chakra-ui/react';

function CartBook({userName, cart, setCart}){
    const  cartName = `cart-${userName}`;

    console.log("장바구니: " + JSON.stringify(cart));
    console.log(`빈 장바구니: ${cart === null}`);

    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem(cartName, JSON.stringify(newCart));
    };

    // 책인덱스찾기
    const findIndexOfBook = (book) => {
        return cart.findIndex((index) => index.book_id === book.book_id);
    };

    // 수량
    const clickMinus = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && cart[i].book_quantity > 1 ){
            const newCart = [...cart];
            newCart[i].book_quantity -= 1;
            console.log("수정후: " + JSON.stringify(newCart));
            updateCart(newCart);
        }
        else {
            alert("수량은 한 권 이상이어야 합니다.");
        }
    };

    const clickPlus = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && cart[i].book_quantity < cart[i].book_stock ){
            const newCart = [...cart];
            newCart[i].book_quantity += 1;
            updateCart(newCart);
        }
        else {
            alert("재고가 부족합니다.");
        }
    };

    // 특정상품선택
    const checkEachBook = (event, book) => {
        const isChecked = event.target.checked;
        const newCart = cart.map((cartBook) =>
            cartBook.book_id === book.book_id ?
                {...cartBook, checked: isChecked}
                : cartBook
        );
        updateCart(newCart);
    };

    // 특정상품삭제
    const deleteBook = (book) => {
        const i = findIndexOfBook(book);
        if (i !== -1 && window.confirm(book.book_name + "을(를) 삭제하시겠습니까?")) {
            const userName = localStorage.getItem('userName');
            const newCart = [...cart];
            newCart.splice(i, 1);
            updateCart(newCart);
            alert(book.book_name + "이(가) 삭제되었습니다.");
        }
    };

    return (
        <ChakraProvider>
        <div>
            {cart.map((book) => (
                <div key={book.book_id} className="each-book">
                    <Stack spacing={5} direction='row'>
                        <Checkbox
                            size='md'
                            colorScheme='blue'
                            isChecked={book.checked}
                            onChange={(event) => checkEachBook(event, book)}
                            className={!book.checked ? 'ubCheckedCheckBox' : 'checkbox'}
                        >
                        </Checkbox>
                    </Stack>
                    <div className={book.checked ? 'checkedAboutBook' : 'aboutBook'}>
                        <Link to={`/bookDetail/${book.book_id}`}>
                            <Box
                                maxW='120px'
                                maxH='150px'
                                borderWidth='1px'
                                overflow='hidden'
                                boxShadow='lg'
                                mt={3}
                                mb={3}
                                mr={3}
                                ml={2}
                            >
                                <Image
                                    id="book-photo"
                                    w='120px'
                                    h='150px'
                                    objectFit='contain'
                                    src={book.img_url}
                                    alt={book.book_name}
                                />
                            </Box>
                        </Link>
                        <div id="title-price">
                            <Link to={`/bookDetail/${book.book_id}`}>
                                <Text as='b' id="book-title" fontSize='1xl'>
                                    {book.book_name}
                                </Text>
                            </Link>
                            <Text id="book-price" fontSize='lg' fontWeight='normal'>{book.book_price}원</Text>
                        </div>
                        <Stack direction='row' h='100px' p={0} mt={4}>
                            <Divider height='80px' orientation='vertical' />
                        </Stack>
                        <div id="quantity-edit">
                            <Stack spacing={0} direction='column'>
                                <Stack spacing={0} direction='row'>
                                    <Text id="total-price" fontSize='lg' fontWeight='bold' ml={3}>{book.book_price * book.book_quantity}</Text>
                                    <Text fontSize='lg' fontWeight='normal' ml={1}>원</Text>
                                </Stack>
                                <Stack spacing={0} direction='row'>
                                    <Button colorScheme='black' variant='link' onClick={() => clickMinus(book)}>-</Button>
                                    <Text id="total-quantity" fontSize='lg' fontWeight='normal'>{book.book_quantity}</Text>
                                    <Button colorScheme='black' variant='link' onClick={() => clickPlus(book)}>+</Button>
                                </Stack>
                            </Stack>
                        </div>
                        <div>
                            <Stack direction='row' spacing={6}>
                                <CloseButton
                                    size='md'
                                    onClick={() => deleteBook(book)}
                                    ml={5}
                                    mr={5}
                                    //mb={55}
                                />
                            </Stack>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </ChakraProvider>
    );
}

export default CartBook;