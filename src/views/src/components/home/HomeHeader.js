import { Flex, Image, Link, Heading } from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import SearchButton from "../../resources/home/header/Searchbutton.png";
import CartButton from "../../resources/home/header/Cart.png";
import UserButton from "../../resources/home/header/user.png";
import MenuButton from "../../resources/home/header/menu.png";
import Logout from '../../routes/user/auth/logout';
import { useState, useEffect } from 'react';


function HomeHeader({ activeCategory })  {
  const headerPadding = activeCategory === '홈' ? '0px' : '20px';
  const headerMt = activeCategory === '홈' ? '10px' : '0px';
  const headerMb = activeCategory === '홈' ? '10px' : '0px';
    const history = useHistory();
    // 장바구니: 로그인 안 했을 경우, 로그인 페이지로 이동
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
            console.log("권한 : " + role);
            setIsRole(role);
          } catch (error) {
            console.error('Admin check failed:', error);
          }
        };
    
        checkRoleAccess();
      }, []);

      return (
        <Flex className="home-header" align="center" justify="space-between" p={headerPadding} mt={headerMt}j mb={headerMb}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center">
            <Heading as="h1" my="auto" size="lg">BookFlow</Heading>
          </Link>
          <Flex id="icons" justify="space-around" align="center">
            <Link as={RouterLink} to="/search">
              <Image src={SearchButton} boxSize="30px" m="1" />
            </Link>
            <Image src={CartButton} boxSize="30px" m="1" onClick={cartClick} cursor="pointer" />
            {isRole !== "ROLE_ANONYMOUS" && (
              <Link as={RouterLink} to="/my">
                <Image src={UserButton} boxSize="30px" m="1" />
              </Link>
            )}
            <Logout />
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
