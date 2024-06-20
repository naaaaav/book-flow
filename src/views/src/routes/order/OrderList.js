import { Box, Button, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast, Badge } from '@chakra-ui/react';
import HomeHeader from "../../components/home/HomeHeader";
import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import PaginationComponent from "../../components/order/PaginationComponent";
import withLoginCheck from '../../components/loginCheck/withLoginCheck';

function OrderList() {

    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const handlePageChange = (page) => {
        setCurrentPage(page -1);
      };


    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
        }
    };
    

    const orderStatusKorean = {
        PAYMENT_COMPLETED: '결제 완료',
        SHIPPING: '배송 중',
        DELIVERED: '배송 완료',
        PREPARING_PRODUCT: '상품 준비 중'
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    function openModal(orderId) {
      setSelectedOrderId(orderId);
      setModalIsOpen(true);
    }
  
    function closeModal() {
      setModalIsOpen(false);
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('ko-KR', options).replace(/\./g, ' -').slice(0, -1);
    }

    function cancelOrder() {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/order/${selectedOrderId}`, {
            method: 'delete',
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
              closeModal();
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
    }

    const [dto, setDto] = useState({
        ordersResponseDto: { orderList: [] },
        totalPages: 0
      });

    function fetchDto() {

        fetch(`${process.env.REACT_APP_API_URL}/api/user/orders?page=${currentPage}&size=${itemsPerPage}`, {
            headers: {
                'access': token,
              }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("ordereList 조회 에러1");
          }
          return response.json();
        })
        .then((json) => setDto(json))
        .catch((e) => console.log("orderList 조회에러1", e));
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/orders?page=${currentPage}&size=${itemsPerPage}`, {
            headers: {
                'access': token,
              }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("ordereList 조회 에러2");
            }
            return response.json();
        })
        .then((json) => (setDto(json)))
        .catch((e) => (
            console.log("orderList 조회에러2", e)
        ))
    }, [currentPage, itemsPerPage]);


    if (!dto.ordersResponseDto.orderList || dto.ordersResponseDto.orderList.length === 0) {
        return (
          <Box className="container" w="100vw" textAlign="center">
          <Box><HomeHeader /></Box>
          <Heading as="h1" size="xl" mb="8">결제하신 내역이에요.</Heading>
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
          <Flex display="flex" alignItems="center" justifyContent="center" w="100%">
          <Box width="100%" mx="auto">
            <Table variant="simple" textAlign="center">
            <Thead>
              <Tr>
                <Th textAlign="center">주문일</Th>
                <Th textAlign="center">주문정보</Th>
                <Th textAlign="center">결제 금액</Th>
                <Th textAlign="center">상태</Th>
                <Th textAlign="center">주문취소</Th>
              </Tr>
            </Thead>
            <Tbody>
                <Tr>
                  <Td colSpan="5" textAlign="center">주문하신 내역이 없어요.</Td>
                </Tr>
            </Tbody>
          </Table>
          </Box>
          </Flex>
          </Box>
            
        )
    }

    function openModal(orderId) {
        setSelectedOrderId(orderId);
        onOpen();
      }
    
      function closeModal() {
        onClose();
      }

      return (
        <Box className="container" w="100vw" textAlign="center">
          <Box><HomeHeader /></Box>
          <Heading as="h1" size="xl" mb="8">결제하신 내역이에요.</Heading>
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
          <Flex display="flex" alignItems="center" justifyContent="center" w="100%">
          <Box width="100%" mx="auto">
            <Table variant="simple" textAlign="center">
            <Thead>
              <Tr>
                <Th textAlign="center">주문일</Th>
                <Th textAlign="center">주문정보</Th>
                <Th textAlign="center">결제 금액</Th>
                <Th textAlign="center">상태</Th>
                <Th textAlign="center">주문취소</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dto.ordersResponseDto.orderList.map((list) => (
                <Tr key={list.order.orderId}>
                  <Td textAlign="center">{formatDate(list.order.createdAt)}</Td>
                    <Td textAlign="center">
                    <Link to={`order-details/${list.order.orderId}`}>
                        {list.order.orderSummaryTitle}
                    </Link>
                    </Td>
                  <Td textAlign="center">{list.order.orderTotalPrice.toLocaleString()}원</Td>
                  <Td textAlign="center">{orderStatusKorean[list.order.orderStatus]}</Td>
                  <Td textAlign="center">
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
          </Box>
          </Flex>
          
          <Flex justifyContent="center" mt="8">
            <PaginationComponent totalPages={dto.totalPages} onPageChange={handlePageChange} />
          </Flex>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>주문을 취소하실건가요?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>주문을 취소하시면 되돌릴 수 없습니다. 계속하시겠습니까?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={closeModal}>
                  아니요, 다시생각해 볼게요.
                </Button>
                <Button colorScheme="red" onClick={cancelOrder}>
                  네, 취소할게요.
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      );
    }
    
    export default withLoginCheck(OrderList);