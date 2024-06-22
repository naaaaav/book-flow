import { Box, Image, Text, VStack, Input, Link, Flex, Heading, Divider, HStack } from '@chakra-ui/react';
import HomeHeader from "../../components/home/HomeHeader";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';
import DefaultCover from "../../resources/book/default book cover.png";

function OrderDetailsByadmin() {
  const token = localStorage.getItem('token');
  const [orderDetails, setOrderDetails] = useState();
  const { orderId } = useParams();
  const orderStatusKorean = {
    PAYMENT_COMPLETED: '결제 완료',
    SHIPPING: '배송 중',
    DELIVERED: '배송 완료',
    PREPARING_PRODUCT: '상품 준비 중'
  };

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    orderRequest: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/order/${orderId}`, {
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
        postalCode: json.orderDelivery.orderDeliveryPostalCode,
        address1: json.orderDelivery.orderDeliveryAddress1,
        address2: json.orderDelivery.orderDeliveryAddress2,
        orderRequest: json.order.orderRequest
      }));
    })
    .catch((e) => {
      console.log("OrderDetails 조회에러", e);
    });
  }, [orderId]);

  if (!orderDetails) {
    return (
      <Box textAlign="center" my="6">
        <Heading as="h1">주문 상세정보를 찾을수 없어요.</Heading>
        <Text fontSize="xl" mt="4">
          <Link to={"/admin/orders"} color="teal.500">주문내역을 찾으시나요?</Link>
        </Text>
      </Box>
    );
  }

  return (
    // <VStack spacing={4} align="stretch">
    //   <HomeHeader />
    //   <Heading as="h2" size="lg">주문 상세정보</Heading>
    //   <VStack spacing={4}>
    //     {orderDetails.orderItems && orderDetails.orderItems.map((item, index) => (
    //       <Flex key={index} p={4} borderWidth="1px" borderRadius="lg" align="center">
    //         <Image boxSize="100px" src={item.book?.bookImgList[0]?.imgUrl || '책 표지 조회 중...'} alt="Book cover" />
    //         <Box ml={6}>
    //           <Text fontWeight="bold">{item.book?.name || '책 이름이 없어요.'}</Text>
    //           <Text>{item.orderItemPrice}원</Text>
    //           <Text>{item.orderItemQuantity}권</Text>
    //         </Box>
    //       </Flex>
    //     ))}
    //   </VStack>
    <Box p={5}>
      <HomeHeader />
      <VStack spacing={4} align="stretch" mx="auto" maxW="80%">
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
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Box p="4" shadow="lg" borderWidth="1px" borderRadius="lg" bg="gray.50">
            <VStack spacing="2" align="stretch">
              <Text fontSize="lg" fontWeight="semibold" color="teal.600">상태: {orderStatusKorean[orderDetails.order.orderStatus]}</Text>
              <Text fontSize="lg" fontWeight="semibold" color="teal.600">상품 금액: {orderDetails.order.bookTotalPrice.toLocaleString()}원</Text>
              <Text fontSize="lg" fontWeight="semibold" color="teal.600">배송비: {orderDetails.order.shippingPrice.toLocaleString()}원</Text>
              <Text fontSize="lg" fontWeight="semibold" color="teal.600">합계: {orderDetails.order.orderTotalPrice.toLocaleString()}원</Text>
            </VStack>
          </Box>
          <Text fontSize="lg" mt={4}>고객님의 배송 정보에요.</Text>
          <VStack spacing={2}>
            <Input type="text" placeholder={formData.name} isReadOnly />
            <Input type="text" placeholder={formData.phoneNumber} isReadOnly />
            <Input type="text" placeholder={formData.postalCode} isReadOnly />
            <Input type="text" placeholder={formData.address1} isReadOnly />
            <Input type="text" placeholder={formData.address2} isReadOnly />
            <Input type="text" placeholder={formData.orderRequest} isReadOnly />
          </VStack>
        </Box>
      )}
    </VStack>
    </Box>
  );
}

export default withAdminCheck(OrderDetailsByadmin);
