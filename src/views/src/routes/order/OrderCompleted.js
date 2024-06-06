import HomeHeader from "../../components/home/HomeHeader";
import { Link } from "react-router-dom";
import './OrderCompleted.css';
import CheckMark from "../../resources/order/OrderCompletedCheckMark.png";
import OrderList from "./OrderList";
import Home from "../Home";

function OrderCompleted() {
    return (
        <div className="root">
            <HomeHeader />
            <div className="content">
                <div className="checkMarkContainer">
                    <img className="checkMark" src={CheckMark}/>
                </div>
                <div className="textContainer">
                    <h1>감사합니다. 결제가 완료되었어요.</h1>
                    <h2 className="h2">빠르게 배송해 드릴게요.</h2>
                    <h2>배송이 시작되면 결제 내역에서</h2>
                    <h2>확인 하실 수 있어요.</h2> 
                    <Link to='/orderList'><div className="link1">결제 내역을 확인해 볼까요?</div></Link><br />
                    <Link to='/'><div className="link2">메인 페이지로 갈까요?</div></Link>
                </div>
            </div>
        </div>
    );
}

export default OrderCompleted;
