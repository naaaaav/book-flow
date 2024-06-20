import { Box, Button, HStack, Image, Input, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Bookflow from '../../../resources/home/header/bookflow.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const toast = useToast();

  const LoginProcess = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.headers.get('access');
          localStorage.setItem('token', token);
          localStorage.setItem('userName', username);
          let cart = JSON.parse(localStorage.getItem(`cart-${username}`)) || [];

          // 게스트용 장바구니 상품 이동
          const guestCart = localStorage.getItem('cart-guest');
          if (guestCart) {
            const guestCartBooks = JSON.parse(guestCart);

            // 게스트 장바구니 상품 + 기존 사용자 장바구니 상품 (동일 상품 존재시 수량 수정)
            guestCartBooks.forEach(guestBook => {
              const existingBook = cart.find(cartBook => cartBook.book_id === guestBook.book_id);
              if (existingBook) {
                existingBook.book_quantity += guestBook.book_quantity;
              } else {
                cart.push(guestBook);
              }
            });

            localStorage.setItem(`cart-${username}`, JSON.stringify(cart));
            localStorage.removeItem('cart-guest');
          } else {
            localStorage.setItem(`cart-${username}`, JSON.stringify(cart));
          }

          toast({
            title: '로그인 성공',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          history.push('/');
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json && (json.status === 400 || json.status === 401)) {
          toast({
            title: '로그인 실패',
            description: json.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: '로그인 중 에러 발생',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };  

  return (
    <Box p={5} maxW="md" mx="auto" mt="5%">
      <VStack spacing={4} align="stretch">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={Bookflow}
            alt="Bookflow"
            maxH="200px"
            objectFit="contain"
          />
        </Box>
        <br />
        <form onSubmit={LoginProcess}>
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            <HStack w="full" justifyContent="center" alignItems="center"></HStack>
            <Button type="submit" colorScheme="green" width="full">
              로그인
            </Button>
          </VStack>
        </form>
        <br />
        <Text textAlign="center">
          Bookflow와 함께 하세요!
          <br />
          <Button as={Link} to="/join" colorScheme="blue" width="full">
            회원가입
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};
//ui
export default Login;
