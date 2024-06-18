import {
    Box,
    Button,
    Flex,
    Heading,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Badge,
    useToast
  } from '@chakra-ui/react';
  import HomeHeader from "../../components/home/HomeHeader";
  import { useEffect, useState } from "react";
  import { useParams } from 'react-router-dom';
  import PaginationComponent from "../../components/order/PaginationComponent";
  import withAdminCheck from '../../components/adminCheck/withAdminCheck';
  import { Link as RouterLink } from "react-router-dom";
  import "./OrderListByAdmin.css";

  function OrderListByAdmin() {
    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const toast = useToast();

    const [dto, setDto] = useState({
      ordersResponseDto: { orderList: [] },
      totalPages: 0
    });
  
    const orderStatusKorean = {
      PAYMENT_COMPLETED: '결제 완료',
      SHIPPING: '배송 중',
      DELIVERED: '배송 완료',
      PREPARING_PRODUCT: '상품 준비 중'
    };
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/orders?page=${currentPage}&size=${itemsPerPage}`, {
        headers: {
          'access': token,
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Order list 조회 에러");
        }
        return response.json();
      })
      .then((json) => setDto(json))
      .catch((e) => console.log("Order list 조회 에러", e));
    }, [currentPage, itemsPerPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page - 1);
    };
  
    const updateOrderStatus = (orderId, newStatus) => {
      const orderStatusDto = { orderStatus: newStatus };
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access': token,
        },
        body: JSON.stringify(orderStatusDto)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('주문 상태 업데이트 실패');
        }
        return response;
      })
      .then(() => {
        fetchDto();
      })
      .catch((e) => console.log('주문 상태 업데이트 에러', e));
    };
  
    const fetchDto = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/orders?page=${currentPage}&size=${itemsPerPage}`, {
        headers: {
          'access': token,
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Order list 조회 에러");
        }
        return response.json();
      })
      .then((json) => setDto(json))
      .catch((e) => console.log("Order list 조회 에러", e));
    };
  
    const openModal = (orderId) => {
      setSelectedOrderId(orderId);
      onOpen();
    };
  
    const cancelOrder = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/admin/order/${selectedOrderId}`, {
        method: 'DELETE',
        headers: {
          'access': token,
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('주문 취소 실패');
        }
        toast({
          title: '취소 완료',
          description: '주문을 취소했어요.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setDto(prevDto => ({
          ...prevDto,
          ordersResponseDto: {
            ...prevDto.ordersResponseDto,
            orderList: prevDto.ordersResponseDto.orderList.filter(orderInfo => orderInfo.order.orderId !== selectedOrderId)
          }
        }));
        onClose();
        fetchDto();
      })
      .catch((error) => {
        toast({
          title: '취소 실패',
          description: '주문을 취소하지 못했어요.: ' + error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      })
    };
  
    const formatDate = (date) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('ko-KR', options).replace(/\./g, ' -').slice(0, -1);
    };
  
    if (!dto.ordersResponseDto.orderList || dto.ordersResponseDto.orderList.length === 0) {
      return (
        <Box textAlign="center" my="6">
          <HomeHeader />
          <Heading as="h1">아직 주문하신 고객님이 없어요.</Heading>
        </Box>
      );
    }
  
    return (
      <Box className="container">
        <HomeHeader />
        <Heading as="h2" size="xl" my="4">주문관리 (관리자)</Heading>
         <Flex justify="space-around" p="4" mb="4">
      <Box className="status-summary" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">총 주문</Text>
        <Badge colorScheme="purple" p="2" borderRadius="lg">
          {dto.ordersResponseDto.orderList.length}건
        </Badge>
      </Box>
      <Box className="status-summary" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">상품 준비중</Text>
        <Badge colorScheme="orange" p="2" borderRadius="lg">
          {dto.ordersResponseDto.orderList.filter(order => order.order.orderStatus === 'PREPARING_PRODUCT').length}건
        </Badge>
      </Box>
      <Box className="status-summary" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">배송중</Text>
        <Badge colorScheme="blue" p="2" borderRadius="lg">
          {dto.ordersResponseDto.orderList.filter(order => order.order.orderStatus === 'SHIPPING').length}건
        </Badge>
      </Box>
      <Box className="status-summary" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">배송완료</Text>
        <Badge colorScheme="green" p="2" borderRadius="lg">
          {dto.ordersResponseDto.orderList.filter(order => order.order.orderStatus === 'DELIVERED').length}건
        </Badge>
      </Box>
    </Flex>
        <Table className='table' variant="simple">
          <Thead>
            <Tr>
              <Th>주문일</Th>
              <Th>주문정보</Th>
              <Th>결제 금액</Th>
              <Th>상태 관리</Th>
              <Th>판매자 취소</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dto.ordersResponseDto.orderList.map((list) => (
              <Tr key={list.order.orderId}>
                <Td>{formatDate(list.order.createdAt)}</Td>
                <Td>
                  <Link as={RouterLink} color="teal.500" to={`order-details-by-admin/${list.order.orderId}`}>
                    {list.order.orderSummaryTitle}
                  </Link>
                </Td>
                <Td>{list.order.orderTotalPrice}</Td>
                <Td>
                  <Select
                    value={list.order.orderStatus}
                    onChange={(e) => updateOrderStatus(list.order.orderId, e.target.value)}
                  >
                    {Object.entries(orderStatusKorean).map(([statusKey, statusValue]) => (
                      <option key={statusKey} value={statusKey}>{statusValue}</option>
                    ))}
                  </Select>
                </Td>
                <Td>
                  {list.order.orderStatus !== 'SHIPPING' && list.order.orderStatus !== 'DELIVERED' && (
                    <Button colorScheme="red" onClick={() => openModal(list.order.orderId)}>
                      주문취소
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box className="page">
          <PaginationComponent totalPages={dto.totalPages} onPageChange={handlePageChange} />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>주문을 취소하실건가요?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>주문 취소를 확인해주세요.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={cancelOrder}>
                네, 취소할게요.
              </Button>
              <Button variant="ghost" onClick={onClose}>아니요, 다시생각해 볼게요.</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
  
  export default withAdminCheck(OrderListByAdmin);
  