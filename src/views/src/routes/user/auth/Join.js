import { Input, Button, Container, FormControl,  FormLabel } from '@chakra-ui/react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../../../components/home/Footer';
import NotLoginHomeHeader from '../../../components/home/NotLoginHomeHeader';

const Join = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username : '',
    password : '',
    name : '',
    phoneNumber : ''
  })

  const onChangeForm = (e) => {
    setFormData(prev => ({...formData, [e.target.name] : e.target.value}))
  }

  const joinProccess = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    fetch(`${process.env.REACT_APP_API_URL}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 201) {
          // 장바구니생성
          const userName = formData.username;
          localStorage.setItem('userName',userName);
          localStorage.setItem(`cart-${userName}`, JSON.stringify([]));

          alert('회원가입 성공')
          history.push('/login')
          return
        }
        return response.json();
      })
      .then((json)=>{
        if (json.status === 400) {
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
                name='username'
                type={"text"}
                value={formData.username}
                onChange={onChangeForm}
              />
            </FormControl>
            <FormControl>
              <FormLabel>비밀번호 : </FormLabel>
              <Input
                name='password'
                type={"password"}
                value={formData.password}
                onChange={onChangeForm}
              />
          </FormControl>
          <FormControl>
            <FormLabel>이름 : </FormLabel>
            <Input
              name='name'
              type={"text"}
              value={formData.name}
              onChange={onChangeForm}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>전화번호 : </FormLabel>
            <Input
              name='phoneNumber'
              type={"number"}
              value={formData.phoneNumber}
              onChange={onChangeForm}
            />
          </FormControl>
          <FormControl>
            <Button colorScheme='blue' onClick={joinProccess}>회원가입</Button>
            <Button onClick={(e) => history.push('/login')}>뒤로</Button>
          </FormControl>
        </form>
        <Footer />
      </Container>
    </div>
  )
}

export default Join;