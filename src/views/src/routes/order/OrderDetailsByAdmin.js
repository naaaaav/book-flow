import HomeHeader from "../../components/home/HomeHeader";
import { useEffect, useState } from "react";
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import './OrderDetails.css';
function OrderDetailsByadmin() {

    const token = localStorage.getItem('access');


    const [orderDetails, setOrderDetails] = useState();
    const {orderId} = useParams();
    const orderStatusKorean = {
        PAYMENT_COMPLETED: '결제 완료',
        SHIPPING: '배송 중',
        DELIVERED: '배송 완료',
        PREPARING_PRODUCT: '상품 준비 중'
      };

    // const [name, setName] = useState("");
    // const [phoneNumber, setPhonenumber] = useState("");
    // const [address1, setAddress1] = useState("");
    // const [address2, setAddress2] = useState("");
    // const [orderRequest, setOrderRequest] = useState("");

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        orderRequest: ''
      });

    //   const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prevState => ({
    //       ...prevState,
    //       [name]: value
    //     }));
    //   };


    useEffect(() => {
        fetch(`http://localhost:8080/api/admin/order/${orderId}`, {
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
            // setName(json.orderDelivery.orderDeliveryReceiverName);
            // setPhonenumber(json.orderDelivery.orderDeliveryReceiverPhoneNumber);
            // setAddress1(json.orderDelivery.orderDeliveryAddress1);
            // setAddress2(json.orderDelivery.orderDeliveryAddress2);
            // setOrderRequest(json.order.orderRequest);
            setFormData((prev) => (
                {
                    ...prev,
                    name : json.orderDelivery.orderDeliveryReceiverName,
                    phoneNumber : json.orderDelivery.orderDeliveryReceiverPhoneNumber,
                    address1 : json.orderDelivery.orderDeliveryAddress1,
                    address2 : json.orderDelivery.orderDeliveryAddress2,
                    orderRequest : json.order.orderRequest
                }
            ))

        })
        .catch((e) => (
            console.log("OrderDetails 조회에러", e)
        ))
    }, [orderId]);

    // const handleUpdate = () => {
    //     // const updatedDetails = {
    //     //     ...orderDetails,
    //     //     orderDto: {
    //     //         ...orderDetails.order,
    //     //         orderRequest: orderRequest
    //     //     },
    //     //     orderDeliveryDto: {
    //     //         ...orderDetails.orderDelivery,
    //     //         orderDeliveryReceiverName: name,
    //     //         orderDeliveryReceiverPhoneNumber: phoneNumber,
    //     //         orderDeliveryAddress1: address1,
    //     //         orderDeliveryAddress2: address2
    //     //     },
    //     //     orderItemDtos: [
    //     //         ...orderDetails.orderItems
    //     //     ]
    //     // };
    
    //     fetch(`http://localhost:8080/api/user/order/${orderId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'access': token,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('배송지 수정에 실패하였습니다.');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('배송지 수정 성공', data);
    //     })
    //     .catch(error => {
    //         console.error('배송지 수정 실패', error);
    //     });
    // };


    if (!orderDetails) {
        return (
            <div>
                <h1>주문 상세정보를 찾을수 없어요.</h1>
                <h2><Link to={"/order-list-by-admin"}>주문내역을 찾으시나요?</Link></h2>
            </div>
            
        );
    }

    return (

        <div className="root">
            <div>
                <HomeHeader />
            </div>
            <h2>주문 상세정보</h2>
            <div className="order-item-container">
                {orderDetails.orderItems && orderDetails.orderItems.map((item) => (
                                <div className="order-item">
                                    {item.book ? (
                                            <div>
                                            <img src={item.book.img}></img>
                                            <span>{item.book.name}</span>
                                            <span>{item.orderItemPrice}원</span>
                                            <span>{item.orderItemQuantity}권</span>
                                            </div>
                                        )
                                        : (
                                            <div>
                                            <span>책 표지가 없어요.</span>
                                            <span>책 이름이 없어요.</span>
                                            <span>{item.orderItemPrice}원</span>
                                            <span>{item.orderItemQuantity}권</span>
                                            </div>
                                        )
                                    }
                                </div>
                    ))}
            </div>
            <div>
                
            </div>
            {orderDetails.order && ( orderDetails.order.orderStatus === 'PAYMENT_COMPLETED' || orderDetails.order.orderStatus === 'PREPARING_PRODUCT') ? (
                <div className="formRootDiv">
                    <div className="orderStatusDiv">
                    <h3>상태: {orderStatusKorean[orderDetails.order.orderStatus]}</h3>
                    <h3 className="totalH3">합계: {orderDetails.order.orderTotalPrice}원</h3>
                    </div>
                    <h3 className="editH3">고객님의 배송 정보에요.</h3>
                    <form className="form">
                        <h4>고객님의 성함이에요.</h4>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder={formData.name}
                            readOnly
                        />
                        <h4>고객님의 연락처에요.</h4>
                        <input 
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            placeholder={formData.phoneNumber}
                            readOnly
                        />
                        <h4>고객님의 받으실 주소에요.</h4>
                        <input 
                            type="text"
                            name="address1"
                            value={formData.address1}
                            placeholder={formData.address1}
                            readOnly
                        /><br />
                        <input 
                            type="text"
                            name="address2"
                            value={formData.address2}
                            placeholder={formData.address2}
                            readOnly
                        />
                        <h4>고객님의 배송 요청 사항이에요.</h4>
                        <input 
                            type="text"
                            name="orderRequest"
                            value={formData.orderRequest}
                            placeholder={formData.orderRequest}
                            readOnly
                        /><br />
                        {/* <button type="submit">배송 정보 수정</button> */}
                    </form>
                </div>
                ) : orderDetails.order.orderStatus === 'SHIPPING' ? (
                        <div>
                            <h3>배송이 시작되었어요.</h3>
                            <h4>배송정보를 수정할 수 없어요.</h4>
                        </div>
                    ) : orderDetails.order.orderStatus === 'DELIVERED' && (
                        <div>
                            <h3>배송이 완료되었어요.</h3>
                        </div>
                )
            } 
        </div>
    );

}
export default OrderDetailsByadmin;