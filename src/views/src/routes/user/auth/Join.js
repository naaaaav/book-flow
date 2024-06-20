import { 
  Input, Button, Container, FormControl, FormLabel,
  FormErrorMessage, FormHelperText, Box, VStack, Image
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Bookflow from '../../../resources/home/header/bookflow.png';

const Join = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username : '',
    password : '',
    name : '',
    phoneNumber : '',
    valiedPassword : '',
    isNotJoin : true
  })

  const initValied = {isError : true, message : ''}
  const [valiedData, setValiedData] = useState({
    username : initValied,
    password : initValied,
    name : initValied,
    phoneNumber : initValied,
    valiedPassword : initValied,
  })

  const valiedCheckter = () => {
    //username
    if (formData.username === "") {
      const valied = {isError : true, message : '아이디를 입력해주세요'}
      setValiedData(prev => ({...prev, username : valied}))
    } else if (/^[a-z][a-z0-9]{5,19}$/g.test(formData.username)) {
      const valied = {isError : false, message : '아이디가 옳바른 형식입니다'}
      setValiedData(prev => ({...prev, username : valied}))
    } else {
      const valied = {isError : true, message : '6자리 이상의 영문 소문자 또는 숫자를 입력해주세요'}
      setValiedData(prev => ({...prev, username : valied}))
    }

    //password
    if (formData.password === "") {
      const valied = {isError : true, message : '영문(a-z,A-Z)과 숫자를 조합해 비밀번호를 입력해주세요'}
      setValiedData(prev => ({...prev, password : valied}))
    } else if (/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/.test(formData.password)) {
      const valied = {isError : false, message : '비밀번호가 옳바른 형식입니다'}
      setValiedData(prev => ({...prev, password : valied}))
    } else {
      const valied = {isError : true, message : '비밀번호가 옳바른 형식이 아닙니다'}
      setValiedData(prev => ({...prev, password : valied}))
    }

    //name
    if (formData.name === "") {
      const valied = {isError : true, message : '이름를 입력해주세요'}
      setValiedData(prev => ({...prev, name : valied}))
    } else if (/^[가-힣]{2,4}$/.test(formData.name)) {
      const valied = {isError : false, message : '옳바른 이름 형식입니다'}
      setValiedData(prev => ({...prev, name : valied}))
    } else {
      const valied = {isError : true, message : '옳바른 이름 형식이 아닙니다'}
      setValiedData(prev => ({...prev, name : valied}))
    }

    //phoneNumber
    if (formData.phoneNumber === "") {
      const valied = {isError : true, message : '전화번호를 입력해주세요'}
      setValiedData(prev => ({...prev, phoneNumber : valied}))
    } else if (/^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/.test(formData.phoneNumber)) {
      const valied = {isError : false, message : '옳바른 전화번호 형식입니다'}
      setValiedData(prev => ({...prev, phoneNumber : valied}))
    } else {
      const valied = {isError : true, message : '옳바른 전화번호 형식이 아닙니다'}
      setValiedData(prev => ({...prev, phoneNumber : valied}))
    }

    //valiedPassword
    if (formData.valiedPassword === "") {
      const valied = {isError : true, message : '비밀번호를 다시 한 번 입력해주세요'}
      setValiedData(prev => ({...prev, valiedPassword : valied}))
    } else if (formData.password === formData.valiedPassword) {
      const valied = {isError : false, message : '비밀번호가 일치합니다'}
      setValiedData(prev => ({...prev, valiedPassword : valied}))
    } else {
      const valied = {isError : true, message : '비빌번호가 일치하지 않습니다'}
      setValiedData(prev => ({...prev, valiedPassword : valied}))
    }

      if (!valiedData.username.isError && !valiedData.password.isError
      && !valiedData.name.isError && !valiedData.phoneNumber.isError
      && !valiedData.valiedPassword.isError) {
        setFormData(prev => ({...prev, isNotJoin : false}))
        return true;
      }
      setFormData(prev => ({...prev, isNotJoin : true}))
      return false;
  }

  useEffect(()=>{
    valiedCheckter()
  }, [formData])

  const onChangeForm = (e) => {
    setFormData(prev => ({...formData, [e.target.name] : e.target.value}))
  }

  const joinProccess = (e) => {
    if (!valiedCheckter()) {
      alert("모든 값을 입력하세요")
      e.preventDefault();
      return;
    }
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
          <form onSubmit={joinProccess}>
            <Box p={5} maxW="md" mx="auto" mt="1%">
              <VStack spacing={4} align="stretch">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Image
                    src={Bookflow}
                    alt="Bookflow"
                    maxH="200px"
                    objectFit="contain"
                  />
                </Box>
                <FormControl isInvalid={valiedData.username.isError}>
                  <FormLabel>아이디 :</FormLabel>
                  <Input
                    name='username'
                    type="text"
                    value={formData.username}
                    onChange={onChangeForm}
                  />
                  {!valiedData.username.isError ? (
                    <FormHelperText>{valiedData.username.message}</FormHelperText>
                  ) : (
                    <FormErrorMessage>{valiedData.username.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={valiedData.password.isError}>
                  <FormLabel>비밀번호 :</FormLabel>
                  <Input
                    name='password'
                    type="password"
                    value={formData.password}
                    onChange={onChangeForm}
                  />
                  {!valiedData.password.isError ? (
                    <FormHelperText>{valiedData.password.message}</FormHelperText>
                  ) : (
                    <FormErrorMessage>{valiedData.password.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={valiedData.valiedPassword.isError}>
                  <FormLabel>비밀번호 재확인 :</FormLabel>
                  <Input
                    name='valiedPassword'
                    type="password"
                    value={formData.valiedPassword}
                    onChange={onChangeForm}
                  />
                  {!valiedData.valiedPassword.isError ? (
                    <FormHelperText>{valiedData.valiedPassword.message}</FormHelperText>
                  ) : (
                    <FormErrorMessage>{valiedData.valiedPassword.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={valiedData.name.isError}>
                  <FormLabel>이름 :</FormLabel>
                  <Input
                    name='name'
                    type="text"
                    value={formData.name}
                    onChange={onChangeForm}
                  />
                  {!valiedData.name.isError ? (
                    <FormHelperText>{valiedData.name.message}</FormHelperText>
                  ) : (
                    <FormErrorMessage>{valiedData.name.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mb={3} isInvalid={valiedData.phoneNumber.isError}>
                  <FormLabel>전화번호 :</FormLabel>
                  <Input
                    name='phoneNumber'
                    type="number"
                    value={formData.phoneNumber}
                    onChange={onChangeForm}
                  />
                  {!valiedData.phoneNumber.isError ? (
                    <FormHelperText>{valiedData.phoneNumber.message}</FormHelperText>
                  ) : (
                    <FormErrorMessage>{valiedData.phoneNumber.message}</FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  colorScheme='blue'
                  onClick={joinProccess}
                  isDisabled={formData.isNotJoin}
                  width="full"
                >
                  회원가입
                </Button>
                <br />
              </VStack>
            </Box>
          </form>
        </Container>
      </div>
    );
}

export default Join;
