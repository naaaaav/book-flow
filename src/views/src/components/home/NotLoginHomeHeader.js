import { Link, useHistory } from 'react-router-dom';
import SearchButton from "../../resources/home/header/Searchbutton.png";
import MenuButton from "../../resources/home/header/menu.png";
import CartButton from "../../resources/home/header/Cart.png";
import UserButton from "../../resources/home/header/user.png";
import './NotLoginHomeHeader.css';
import Logout from '../../routes/user/auth/logout';


function NotLoginHomeHeader()  {
    const history = useHistory();
    return(
        <div className="home-header">
            <div id="title">
                <Link to="/"><h1>BookFlow</h1></Link>
            </div>
        </div>
    );
}
export default NotLoginHomeHeader;
