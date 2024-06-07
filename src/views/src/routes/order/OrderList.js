import HomeHeader from "../../components/home/HomeHeader";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";
import './OrderList.css';

function OrderList() {

    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'))

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
    
    ReactModal.setAppElement('#root');

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
            setOrderList((list) => list.filter((order) => order.orderId !== selectedOrderId), () => {
                closeModal();
                fetchOrderList();
            });
            closeModal();
            fetchOrderList();
        })
        .catch((e) => (
            console.log('주문 취소 실패', e)
        ));
    }

    const [orderList, setOrderList] = useState();

    function fetchOrderList() {

        fetch("http://localhost:8080/api/user/orders", {
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
        .then((json) => setOrderList(json.orderList))
        .catch((e) => console.log("orderList 조회에러1", e));
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/user/orders", {
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
        .then((json) => (setOrderList(json.orderList)))
        .catch((e) => (
            console.log("orderList 조회에러2", e)
        ))
    }, [modalIsOpen]);

    if (!orderList || orderList.length == 0) {
        return (
            <div className="container">
              <HomeHeader />
              <h2>주문하신 내역이 없어요.</h2>  
            </div>
            
        )
    }

    return (
        <div className="container">
           <HomeHeader/> 

           <h1>결제하신 내역이에요.</h1>
            <div>
            <table>
                <thead className="thead">
                    <tr>
                        <th>주문일</th>
                        <th>주문정보</th>
                        <th>결제 금액</th>
                        <th>상태</th>
                        <th>주문취소</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((list) => (
                        <tr>
                            <td>{formatDate(list.order.createdAt)}</td>
                            <td><Link className = 'link' to = {`orderDetails/${list.order.orderId}`}>{list.order.orderSummaryTitle}</Link></td>
                            <td>{list.order.orderTotalPrice}</td>
                            <td>{orderStatusKorean[list.order.orderStatus]}</td>
                            <td> { list.order.orderStatus !== 'SHIPPING' && list.order.orderStatus !== 'DELIVERED' && (
                                <button className="cancelBtn" onClick={() => openModal(list.order.orderId)}>주문취소</button>
                            )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            
            
            <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="주문 취소 확인"
            >
            <h2>주문을 취소하실건가요?</h2>
            <button className="yesBtn" onClick={cancelOrder}>네, 취소할게요.</button><br />
            <button className="noBtn" onClick={closeModal}>아니요, 다시생각해 볼게요.</button>
            </ReactModal>
        </div>
        
    );
}
export default OrderList;