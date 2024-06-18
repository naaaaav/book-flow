import { Input, Button, Container, FormControl,  FormLabel } from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../../../components/home/Footer';
import NotLoginHomeHeader from '../../../components/home/NotLoginHomeHeader';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()


  const LoginProcess = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.headers.get('access')
          localStorage.setItem('token', token)
          // cart
          localStorage.setItem('userName', username)
          let cart = JSON.parse(localStorage.getItem(`cart-${username}`)) || [];
          localStorage.setItem(`cart-${username}`, JSON.stringify(cart))
          alert('로그인 성공')
          history.push('/')
          return
        }
        return response.json()
      })
      .then((json)=>{
        //console.log(json);
        if (json.status === 400 || json.status === 401) {
          alert(json.message)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>
      <Container maxW='1500px'>
      <NotLoginHomeHeader />
        <form>
          <FormControl>
            <FormLabel>아이디 : </FormLabel>
            <Input 
              type='text' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>비밀번호 : </FormLabel>
            <Input 
              type='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme='blue' onClick={LoginProcess}>로그인</Button>
          <Button onClick={(e) => history.push('/join')}>회원가입</Button>
        </form>
        <Footer />
      </Container>
    </div>
  )
}

export default Login;