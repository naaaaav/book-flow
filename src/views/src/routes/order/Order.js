import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HomeHeader from "../../components/home/HomeHeader";
import "./Order.css";

// 테스트용 가상 방바구니
// const cartItems = [
//     {
//       name: "책1",
//       price: 15000,
//       quantity: 2,
//       bookId: 1
//     },
//     {
//       name: "책2",
//       price: 20000,
//       quantity: 1,
//       bookId: 2
//     }
//   ];


  
  // localStorage에 'cart' 키로 아이템 데이터 저장
  // localStorage.setItem('testCart', JSON.stringify(cartItems));
  
  // const cartName = `cart-${localStorage.getItem('userName')}`;
  // let cart = JSON.parse(localStorage.getItem(cartName));
  // console.log(cart);

const token = localStorage.getItem('access');

const Order = () => {
    
  const history = useHistory();  
  const [cartItems, setCartItems] = useState([]);
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

  const cartName = `cart-${localStorage.getItem('userName')}`;
  let cart = JSON.parse(localStorage.getItem(cartName));
  console.log(cart);

  // if (cart.length === 0) {
  //   alert("장바구니에 담긴 책이 없어요.");
  //   history.push("/cart/" + localStorage.getItem('userName'));
  // }
  useEffect(() => {
    if (cart.length === 0) {
      history.push("/cart/" + localStorage.getItem('userName'));
    }
  }, []);
  
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
        orderDeliveryAddress2: '' 
      }
    });
  };

  // api에 주문 생성 post 요청을 fetch로 함
  const handleOrder = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/user/order', {
      method: 'POST',
      headers: {
        'access': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...orderCreateDto,
        orderItemDtos: cart.map(item => ({
          orderItemQuantity: item.book_quantity,
          bookId: item.book_id
        }))
      })
    });

    if (response.ok) {
      // 주문이 성공적으로 생성되면 로컬 스토리지에서 장바구니를 비우고 사용자에게 알림
      // localStorage.removeItem(cartName);
      localStorage.setItem(`${cartName}`, JSON.stringify([]));

      alert('감사합니다! 주문이 완료되었어요.');
      history.push('/order-completed');
    } else {
      alert('주문에 실패했어요.');
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
    <div className='root'>
      <HomeHeader />
      <div className="order-container">
        <div className="order-details">
          <h1>결제를 시작할게요.</h1>
          {/* 장바구니 상품 정보 표시 */}
          <div>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="book-details">
                  <span>도서명: {item.book_name}</span>
                  <span>권당 가격: {item.book_price}원</span>
                  <span>수량: {item.book_quantity}개</span>
                </div>
              ))
            ) : (
              <p>장바구니에 담긴 상품이 없어요.</p>
            )}
          </div>
          
          <form onSubmit={handleOrder} className="order-form" id='orderForm'>
            {/* 받으시는 분 정보 입력 폼 */}
            <h2>받으시는 분을 알려주세요!</h2>
            <input type="text" name="orderDeliveryReceiverName" onChange={handleInputChange} placeholder="홍길동" required className="input-field" />
            <input type="text" name="orderDeliveryReceiverPhoneNumber" onChange={handleInputChange} placeholder="010-0000-0000" required className="input-field" />
            {/* 주소 입력 폼 */}
            <div>
              <button type="button" onClick={openPostcode} className="address-search-btn">주소 검색</button>
              <input type="text" name="orderDeliveryPostalCode" placeholder="우편번호" value={orderCreateDto.orderDeliveryDto.orderDeliveryPostalCode} readOnly className="input-field" />
              <input type="text" name="orderDeliveryAddress1" placeholder="도로명주소" value={orderCreateDto.orderDeliveryDto.orderDeliveryAddress1} readOnly className="input-field" />
              <input type="text" name="orderDeliveryAddress2" placeholder="상세주소" value={orderCreateDto.orderDeliveryDto.orderDeliveryAddress2} onChange={handleInputChange} className="input-field" />
            </div>
            {/* 배송 메모 입력 폼 */}
            <input type="text" name="orderRequest" onChange={handleInputChange} placeholder="내용을 입력해주세요." className="input-field" />
            
          </form>
        </div>
        <div className="payment-summary">
          {cartItems.length > 0 && (
            <div className="total-amount">
                <div>결제하실 금액이에요. <div />
                <div className='won'>{cart.reduce((acc, item) => acc + item.book_price * item.book_quantity, 0)}원</div></div>
            </div>
          )}
            <div className="action-buttons">
                <button type="submit" form="orderForm" className="payBtn">결제할게요!</button>
                <button type="button" onClick={handleCancel} className="payCancelBtn">다음에 할게요.</button>
            </div>
            </div>
      </div>
    </div>
  );
};

export default Order;
