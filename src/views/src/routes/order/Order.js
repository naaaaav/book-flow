import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeHeader from "../../components/home/HomeHeader";
// import "./Order.css";
import {
  Box, Flex, Text, Button, Input, Image, VStack, FormControl, FormLabel, useToast, HStack,
} from '@chakra-ui/react';
import DefaultCover from '../../resources/book/default book cover.png';
import withLoginCheck from '../../components/loginCheck/withLoginCheck';

const Order = () => {
  const location = useLocation();
  const orderData = location.state?.orderData?.orderItemDtos;
  const [bookDetails, setBookDetails] = useState({}); 
  const toast = useToast()
  const history = useHistory();  
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const totalAmount = orderData.reduce((acc, item) => acc + (bookDetails[item.bookId]?.bookPrice || 0) * item.orderItemQuantity, 0);
  const shippingFee = totalAmount <= 50000 ? 3000 : 0;
  const amountToPay = totalAmount + shippingFee;

  const [orderCreateDto, setOrderCreateDto] = useState({
    orderDto: {
      orderRequest: ''
    },
    orderDeliveryDto: {
      orderDeliveryReceiverName: '',
      orderDeliveryReceiverPhoneNumber: '',
      orderDeliveryPostalCode: '',
      orderDeliveryAddress1: '',
      orderDeliveryAddress2: ''
    },
    orderItemDtos: []
  });

//사용자 정보 불러와서 채워주기
useEffect(() => {
  const token = localStorage.getItem('token');
  fetchUserData(token);
}, []);

async function fetchUserData(token) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/member`, {
      method: 'GET',
      headers: {
        'access': token
      }
    });
    if (!response.ok) {
      throw new Error('유저정보 조회 에러');
    }
    const user = await response.json();
    setUserData(user); 
    setOrderCreateDto(prevDto => ({
      ...prevDto,
      orderDeliveryDto: {
        ...prevDto.orderDeliveryDto,
        orderDeliveryReceiverName: user.name || '',
        orderDeliveryReceiverPhoneNumber: user.phoneNumber || '',
        orderDeliveryAddress2: user.address || '',
      }
    }));
  } catch (error) {
    console.error('유저정보 조회 실패', error);
  }
}




  useEffect(() => {
    
    // 서버에 책 정보를 요청하는 함수
    const fetchBookDetails = async () => {
      try {
        // orderData에서 책 ID들을 추출합니다.
        const bookIds = orderData.map(item => item.bookId);

        // 책 ID들을 사용하여 서버에 책 정보를 요청합니다.
        const responses = await Promise.all(
          bookIds.map(bookId =>
            fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}`)
          )
        );

        // 모든 응답을 확인하고 JSON으로 변환합니다.
        const booksData = await Promise.all(
          responses.map(response => response.json())
        );

        // 책 ID를 키로 하고 책 정보를 값으로 하는 객체를 생성합니다.
        const details = {};
        booksData.forEach((book, index) => {
          details[bookIds[index]] = book;
        });

        setBookDetails(details); // 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [orderData]);

  
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {  };
    document.head.appendChild(script);
  
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  

  // 다음 주소 api 검색후 실행
  const handleAddress = (data) => {
    // api로 찾은 주소를 셋팅
    setOrderCreateDto({
      ...orderCreateDto,
      orderDeliveryDto: {
        ...orderCreateDto.orderDeliveryDto,
        orderDeliveryPostalCode: data.zonecode,
        orderDeliveryAddress1: data.roadAddress, 
      }
    });
  };

  if (!orderData) {
    console.error("주문 정보가 올바르지 않아요.");
    return <Box textAlign="center" my="6">
      <Text fontSize="xl" fontWeight="bold">주문정보가 올바르지 않아요.</Text>
    </Box>;
  }

  // api에 주문 생성 post 요청을 fetch로 함
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!orderCreateDto.orderDeliveryDto.orderDeliveryPostalCode ||
      !orderCreateDto.orderDeliveryDto.orderDeliveryAddress1 ||
      !orderCreateDto.orderDeliveryDto.orderDeliveryAddress2 ||
      !orderCreateDto.orderDeliveryDto.orderDeliveryReceiverPhoneNumber) {
        toast({
          title: '주문 실패',
          description: '주문에 실패했어요. 모든 정보를 입력해주세요. ',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
    return; 
  }
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/order`, {
      method: 'POST',
      headers: {
        'access': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...orderCreateDto,
        orderItemDtos: orderData.map(item => ({
          orderItemQuantity: item.orderItemQuantity,
          bookId: item.bookId
        }))
      })
    });

    if (response.ok) {
      // 주문이 성공적으로 생성되면 로컬 스토리지에서 장바구니를 비우고 사용자에게 알림
      // localStorage.removeItem(cartName);
      const cartName = `cart-${localStorage.getItem('userName')}`;
      let cart = JSON.parse(localStorage.getItem(cartName));
      localStorage.setItem(`${cartName}`, JSON.stringify([]));

      toast({
        title: '주문 완료',
        description: '감사합니다. 주문을 완료 했어요.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      history.push('/order-completed');
    } else {
      toast({
        title: '주문 실패',
        description: '주문에 실패했어요. 책의 재고가 부족하거나, 일시적인 에러일 수 있어요. ',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // 사용자의 입력을 감지해서 변경되면 변경함
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력 변경 로직
    if (name === 'orderRequest') {
      setOrderCreateDto({
        ...orderCreateDto,
        orderDto: { ...orderCreateDto.orderDto, orderRequest: value }
      });
    } else {
      setOrderCreateDto({
        ...orderCreateDto,
        orderDeliveryDto: {
          ...orderCreateDto.orderDeliveryDto,
          [name]: value
        }
      });
    }
  };

  // 주문 취소버튼 누르면 장바구니로 리다이렉트
  const handleCancel = () => {
    history.push('/cart');
  };

  // 다음 주소 검색 API 누를때
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: handleAddress
    }).open();
  };

  return (
    <Flex direction="column" align="center" m="4">
      <Box className='homeHeader' w="100%">
        <HomeHeader/>
      </Box>
      
      <VStack spacing="4" align="stretch">
        <Box p="6" shadow="md" borderWidth="1px">
          <Text fontSize="2xl" mb="4">결제를 시작할게요.</Text>
          {/* 장바구니 상품 정보 표시 */}
          {orderData.map((item, index) => (
            <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
              <HStack spacing="4">
                <Image boxSize="100px" src={bookDetails[item.bookId]?.bookImgDtoList[0]?.imgUrl || DefaultCover} alt="Book cover" />
                <VStack align="left">
                  <Text fontWeight="bold">도서명: {bookDetails[item.bookId]?.bookName || '책 이름 조회 중...'}</Text>
                  <Text>권당 가격: {bookDetails[item.bookId]?.bookPrice || '책 가격 조회 중...'}원</Text>
                  <Text>수량: {item.orderItemQuantity}개</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleOrder(e);
        }}>
            {/* 받으시는 분 정보 입력 폼 */}
            <FormControl id="name" isRequired>
              <FormLabel>받으시는 분</FormLabel>
              <Input 
              name="orderDeliveryReceiverName" 
              onChange={handleInputChange} 
              placeholder="홍길동" 
              value={orderCreateDto.orderDeliveryDto.orderDeliveryReceiverName}
              />
            </FormControl>
            <FormControl isRequired>
            <FormLabel>전화번호</FormLabel>
            <Input
              type="text"
              name="orderDeliveryReceiverPhoneNumber"
              onChange={handleInputChange}
              value={orderCreateDto.orderDeliveryDto.orderDeliveryReceiverPhoneNumber}
              placeholder="전화번호를 입력해주세요"
            />
          </FormControl>

          <Button mt="10px" mb="10px" type="button" onClick={openPostcode} className="address-search-btn">
                주소 검색
          </Button><br />
          <FormControl isRequired>
            <FormLabel>우편번호</FormLabel>
            <Input
              type="text"
              name="orderDeliveryPostalCode"
              value={orderCreateDto.orderDeliveryDto.orderDeliveryPostalCode}
              placeholder="주소검색 버튼을 눌러주세요"
              readOnly
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>도로명주소</FormLabel>
            <Input
              type="text"
              name="orderDeliveryAddress1"
              value={orderCreateDto.orderDeliveryDto.orderDeliveryAddress1}
              placeholder="주소검색 버튼을 눌러주세요"
              readOnly
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>상세주소</FormLabel>
            <Input
              type="text"
              name="orderDeliveryAddress2"
              onChange={handleInputChange}
              value={orderCreateDto.orderDeliveryDto.orderDeliveryAddress2}
              placeholder="상세주소"
            />
          </FormControl>

          <FormControl>
            <FormLabel>배송 요청사항</FormLabel>
            <Input
              type="text"
              name="orderRequest"
              onChange={handleInputChange}
              value={orderCreateDto.orderDto.orderRequest}
              placeholder="배송 요청사항을 적어주세요."
            />
          </FormControl>  
            
          </form>
        </Box>
      {/* 결제 요약 및 버튼 */}
      <Flex
      justify="space-between"
      align="center"
      mt="8"
      p="4"
      shadow="md"
      borderWidth="1px"
    >
      <VStack align="left">
        <Text fontSize="xl">총 주문 금액: {totalAmount.toLocaleString()}원</Text>
        <Text fontSize="xl">배송비: {shippingFee.toLocaleString()}원</Text>
        <Text fontSize="xl" fontWeight="bold">
          총 결제 금액: {amountToPay.toLocaleString()}원 을 결제할까요?
        </Text>
      </VStack>
      <Button ml="20px" mr="20px" colorScheme="teal" onClick={handleOrder}>
        결제할게요!
      </Button>
      <Button colorScheme="yellow" onClick={handleCancel}>
        다음에 할게요.
      </Button>
    </Flex>
    </VStack>
  </Flex>
  );
};

export default withLoginCheck(Order);
