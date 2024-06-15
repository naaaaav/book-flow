import { Box, Button, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import HomeHeader from "../../components/home/HomeHeader";
import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import PaginationComponent from "../../components/order/PaginationComponent";

function OrderList() {

    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        fetch(`http://localhost:8080/api/user/order/${selectedOrderId}`, {
            method: 'delete',
            headers: {
                'access': token,
              }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('주문 취소 실패');
            }
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
        .catch((e) => (
            console.log('주문 취소 실패', e)
        ));
    }

    const [dto, setDto] = useState({
        ordersResponseDto: { orderList: [] },
        totalPages: 0
      });

    function fetchDto() {

        fetch(`http://localhost:8080/api/user/orders?page=${currentPage}&size=${itemsPerPage}`, {
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
        fetch(`http://localhost:8080/api/user/orders?page=${currentPage}&size=${itemsPerPage}`, {
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
            <div className="container">
              <HomeHeader />
              <h2>주문하신 내역이 없어요.</h2>  
            </div>
            
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
        <Box className="container">
          <HomeHeader />
          <Heading as="h1" size="xl" mb="8">결제하신 내역이에요.</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>주문일</Th>
                <Th>주문정보</Th>
                <Th>결제 금액</Th>
                <Th>상태</Th>
                <Th>주문취소</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dto.ordersResponseDto.orderList.map((list) => (
                <Tr key={list.order.orderId}>
                  <Td>{formatDate(list.order.createdAt)}</Td>
                    <Td>
                    <Link to={`order-details/${list.order.orderId}`}>
                        {list.order.orderSummaryTitle}
                    </Link>
                    </Td>
                  <Td>{list.order.orderTotalPrice}</Td>
                  <Td>{orderStatusKorean[list.order.orderStatus]}</Td>
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
    
    export default OrderList;