import { Flex, Image, Link, Heading, Badge } from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchButton from "../../resources/home/header/Searchbutton.png";
import CartButton from "../../resources/home/header/Cart.png";
import UserButton from "../../resources/home/header/user.png";
import MenuButton from "../../resources/home/header/menu.png";
import Logout from '../../routes/user/auth/logout';
import { useState, useEffect } from 'react';
import Logo from '../../resources/home/header/bookflow.png';

function HomeHeader({ activeCategory, cart })  {
  const headerPadding = activeCategory === '홈' ? '0px' : '20px';
  const headerMt = activeCategory === '홈' ? '20px' : '0px';
  const headerMb = activeCategory === '홈' ? '10px' : '0px';
  
  const [logoutRender, setLogoutRender] = useState(false);
  const handleLogoutRender = () => {
    setLogoutRender(!logoutRender)
  }
    
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);
    
    // 장바구니: 로그인 안 했을 경우, 게스트 장바구니 생성
    const cartClick = () => {
        let userName = 'guest';
        const token = localStorage.getItem('token');
        if (token !== null){
            userName = localStorage.getItem('userName');
        }else{
            if(!localStorage.getItem('cart-guest')){
                localStorage.setItem(`cart-guest`, JSON.stringify([]));
            }
        }
        history.push(`/cart/${userName}`)
    };

    useEffect( () => {
        const getCartItems = () => {
            const cartName = localStorage.getItem('userName') ? `cart-${localStorage.getItem('userName')}` : `cart-guest`;
            const items = JSON.parse(localStorage.getItem(cartName)) || [];
            setCartItems(items);
        };
        getCartItems();
    }, [cart]);
    const totalQuantity = cartItems.reduce((total, item) => total + item.book_quantity, 0);

    const [isRole, setIsRole] = useState();
    useEffect(() => {
        const checkRoleAccess = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/check`, {
              headers: {
                'access': token,
              }
            });
            const json = await response.json();
            const role = json.role;
            setIsRole(role);
          } catch (error) {
            console.error('Admin check failed:', error);
          }
        };
    
        checkRoleAccess();
      }, [logoutRender]);

      return (
        <Flex className="home-header" align="center" justify="space-between" p={headerPadding} mt={headerMt} mb={headerMb}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center">
            <Image src={Logo} objectFit="cover" h="50px" />
            {/* <Heading as="h1" my="auto" size="lg">BookFlow</Heading> */}
          </Link>
          <Flex id="icons" justify="space-around" align="center">
            <Link as={RouterLink} to="/search">
              <Image src={SearchButton} boxSize="30px" m="1" />
            </Link>
              <Flex alignItems="center"  mr='2' position="relative">
                  <Image src={CartButton} boxSize="30px" onClick={cartClick} cursor="pointer" />
                  {totalQuantity === 0? null :
                      <Badge colorScheme="blue" borderRadius="full" ml="2" position="absolute" top="-1px" right="-5px">
                          {totalQuantity}
                      </Badge>
                  }
              </Flex>
            {isRole !== "ROLE_ANONYMOUS" && (
              <Link as={RouterLink} to="/my">
                <Image src={UserButton} boxSize="30px" m="1" />
              </Link>
            )}
            <Logout handleLogoutRender = {handleLogoutRender} />
            {isRole === "ROLE_ADMIN" && (
              <Link as={RouterLink} to="/admin/menu">
                <Image src={MenuButton} boxSize="30px" m="1" />
              </Link>
            )}
          </Flex>
        </Flex>
      );
    }
    
    export default HomeHeader;
