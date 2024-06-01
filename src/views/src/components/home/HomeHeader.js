import { Link } from 'react-router-dom';
import SearchButton from "../../resources/home/header/Searchbutton.png";
import MenuButton from "../../resources/home/header/menu.png";
import CartButton from "../../resources/home/header/Cart.png";
import UserButton from "../../resources/home/header/user.png";
import './HomeHeader.css';

function HomeHeader()  {
    return(
        <div className="home-header">
            <div id="title">
               <Link to="/"><h1>Book</h1></Link>
            </div>
            <div id="icons">
                <Link to="/search"><img src={SearchButton} /></Link>
                <Link to="/cart"><img src={CartButton} /></Link>
                <Link to="/user"><img src={UserButton} /></Link>
                <Link to="/menu"><img src={MenuButton} /></Link>
            </div>
        </div>
    );
}
export default HomeHeader;
