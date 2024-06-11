import { Link, useHistory } from 'react-router-dom';
import SearchButton from "../../resources/home/header/Searchbutton.png";
import Logo from "../../resources/home/header/logo.jpg";
import MenuButton from "../../resources/home/header/menu.png";
import CartButton from "../../resources/home/header/Cart.png";
import UserButton from "../../resources/home/header/user.png";
import './HomeHeader.css';

function HomeHeader()  {
    // 장바구니: 로그인 안 했을 경우, 로그인 페이지로 이동
    const history = useHistory();
    console.log(localStorage.getItem('token'));
    const cartClick = () => {
        const token = localStorage.getItem('token');
        token ? history.push('/cart') : history.push('/loginTest');
    };

    return(
        <div className="home-header">
            <div id="title">
               <Link to="/"><h1>BookFlow</h1></Link>
            </div>
            <div id="icons">
                <Link to="/search"><img src={SearchButton} /></Link>
                <img src={CartButton} onClick={cartClick} />

                <Link to="/login-test"><img src={UserButton} /></Link>

                <Link to="/menu"><img src={MenuButton} /></Link>
            </div>
        </div>
    );
}
export default HomeHeader;
