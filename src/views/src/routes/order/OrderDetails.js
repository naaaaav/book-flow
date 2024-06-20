import { Box, Text, Image, Input, Button, Link, useToast, Stack, VStack, HStack, FormControl, FormLabel, Heading, Divider, Flex, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import HomeHeader from "../../components/home/HomeHeader";
import DefaultCover from "../../resources/book/default book cover.png";

const orderStatusKorean = {
  PAYMENT_COMPLETED: '결제 완료',
  SHIPPING: '배송 중',
  DELIVERED: '배송 완료',
  PREPARING_PRODUCT: '상품 준비 중'
};

function OrderDetails() {
  const token = localStorage.getItem('token');
  const toast = useToast(); 
  const [orderDetails, setOrderDetails] = useState();
  const { orderId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    orderRequest: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/order/${orderId}`, {
      headers: {
        'access': token,
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Details 조회 에러");
      }
      return response.json();
    })
    .then((json) => {
      setOrderDetails(json);
      setFormData((prev) => ({
        ...prev,
        name: json.orderDelivery.orderDeliveryReceiverName,
        phoneNumber: json.orderDelivery.orderDeliveryReceiverPhoneNumber,
        address1: json.orderDelivery.orderDeliveryAddress1,
        address2: json.orderDelivery.orderDeliveryAddress2,
        orderRequest: json.order.orderRequest
      }));
    })
    .catch((e) => {
      console.log("OrderDetails 조회에러", e);
    });
  }, [orderId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'access': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('배송지 수정에 실패하였습니다.');
      }
  
      const data = await response.json();
      console.log('배송지 수정 성공', data);
      toast({
        title: '배송정보를 잘 변경했어요.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      console.log('성공 토스트 호출 후');
    } catch (error) {
      console.error('배송지 수정 실패', error);
      toast({
        title: '배송정보변경을 실패했어요. 다시 시도해 주세요.',
        description: error.toString(),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!orderDetails) {
    return (
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading mb={4}>주문 상세정보를 찾을수 없어요.</Heading>
        <Link color="teal.500" to={"/order-list"}>주문내역을 찾으시나요?</Link>
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <HomeHeader />
      <VStack spacing={4} align="stretch">
        <Heading my={5}>주문 상세정보</Heading>
        <Divider />
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
          {orderDetails.orderItems && orderDetails.orderItems.map((item) => (
            <HStack key={item.id} spacing={4} align="center">
              <Image
              width="100px"
              height="300%"
              objectFit="contain"
              src={item.book.bookImgList[0]?.imgUrl || DefaultCover}
              alt={item.book.name}
              borderRadius="md"
            />
              <VStack align="stretch" spacing={1}>
                <Text fontWeight="bold">{item.book.name}</Text>
                <Text color="gray.600">{item.orderItemPrice}원</Text>
                <Text color="gray.500">{item.orderItemQuantity}권</Text>
              </VStack>
            </HStack>
          ))}
        </Box>
        {orderDetails.order && (
          <Box p="4" shadow="lg" borderWidth="1px" borderRadius="lg" bg="gray.50">
          <VStack spacing="2" align="stretch">
            <Text fontSize="lg" fontWeight="semibold" color="teal.600">상태: {orderStatusKorean[orderDetails.order.orderStatus]}</Text>
            <Text fontSize="lg" fontWeight="semibold" color="teal.600">상품 금액: {orderDetails.order.bookTotalPrice.toLocaleString()}원</Text>
            <Text fontSize="lg" fontWeight="semibold" color="teal.600">배송비: {orderDetails.order.shippingPrice.toLocaleString()}원</Text>
            <Text fontSize="lg" fontWeight="semibold" color="teal.600">합계: {orderDetails.order.orderTotalPrice.toLocaleString()}원</Text>
          </VStack>
        </Box>        
        )}
        {orderDetails.order && (orderDetails.order.orderStatus === 'PAYMENT_COMPLETED' || orderDetails.order.orderStatus === 'PREPARING_PRODUCT') ? (
          <Box as="form" onSubmit={(event) => {
            event.preventDefault();
            handleUpdate();
          }}>
            <FormControl id="name" isRequired>
              <FormLabel>성함</FormLabel>
              <Input
                mb={5}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="성함을 입력해주세요"
              />
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>연락처</FormLabel>
              <Input
                mb={5}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="연락처를 입력해주세요"
              />
            </FormControl>
            <FormControl id="address1" isRequired>
              <FormLabel>주소</FormLabel>
              <Input
                mb={5}
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                placeholder="주소를 입력해주세요"
              />
            </FormControl>
            <FormControl id="address2">
              <FormLabel>상세 주소</FormLabel>
              <Input
                mb={5}
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                placeholder="상세 주소를 입력해주세요"
              />
            </FormControl>
            <FormControl id="orderRequest">
              <FormLabel>배송 메모</FormLabel>
              <Input
                mb={5}
                type="text"
                name="orderRequest"
                value={formData.orderRequest}
                onChange={handleInputChange}
                placeholder="배송 메모를 입력해주세요"
              />
            </FormControl>
            <Button colorScheme="blue" type='submit'>배송 정보 수정</Button>
          </Box>
        ) : orderDetails.order.orderStatus === 'SHIPPING' ? (
          <Box>
            <Text>배송이 시작되었어요.</Text>
            <Text>배송정보를 수정할 수 없어요.</Text>
          </Box>
        ) : orderDetails.order.orderStatus === 'DELIVERED' && (
          <Box>
            <Text>배송이 완료되었어요.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default OrderDetails;
