import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Box, 
    VStack,
    Button,
    HStack, 
    Icon, 
    useToast
  } from '@chakra-ui/react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import withLoginCheck from '../../components/loginCheck/withLoginCheck';
import HomeHeader from '../../components/home/HomeHeader';

const MyPage = () => {

    const token = localStorage.getItem('token');

    const toast = useToast();
    const history = useHistory();

    const handleMyInfo = () => {

        history.push('/my-info');
    };

    const handleOrderList = () => {

        history.push('/order-list');
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [password, setPassword] = useState('');
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSignOutClick = () => {
        onOpen();
    }

    const handleSignOut = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/member`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'access': token
              },
              body: JSON.stringify({ password })
            });
    
          if (!response.ok) {
            throw new Error('탈퇴 실패');
          }
    
          toast({
            title: '회원 탈퇴 성공',
            description: '그동안 함께해서 즐거웠어요. 다시 함께할날을 기다리고 있을게요.\n10초후 메인페이지로 이동해요.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          
          setTimeout(() => {
            history.push('/');
          }, 10000)
          
        } catch (error) {
          toast({
            title: '회원 탈퇴 처리 중 문제가 발생했어요.',
            description: '회원 탈퇴 처리 중 문제가 발생했어요.\n비밀번호를 확인해 주세요.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      };

    return (
        <>
        <Box p={5}>
        <HomeHeader />
        <Box mt="5%">
            <VStack spacing={4} align="center">
            <HStack w="full" justifyContent="center" alignItems="center">
            <Icon as={FaUser} boxSize="11%" />
            <Button w="33%" colorScheme="blue" onClick={handleMyInfo}>
                내정보 조회/수정
            </Button>
            </HStack>
            <HStack w="full" justifyContent="center" alignItems="center">
            <Icon as={FaShoppingCart} boxSize="11%" />
            <Button w="33%" colorScheme="green" onClick={handleOrderList}>
                주문 조회
            </Button>
            </HStack>
            <HStack w="full" justifyContent="center" alignItems="center">
            <Icon as={FaSignOutAlt} boxSize="11%" />
            <Button w="33%" colorScheme="red" onClick={handleSignOutClick}>
                회원 탈퇴
            </Button>
            </HStack>
        </VStack>
        </Box>
        </Box>
         <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>회원 탈퇴 확인</ModalHeader>
           <ModalCloseButton />
           <ModalBody pb={6}>
             <FormControl>
               <FormLabel>비밀번호</FormLabel>
               <Input type="password" placeholder="비밀번호를 입력해 주세요" onChange={handlePasswordChange} />
             </FormControl>
           </ModalBody>
 
           <ModalFooter>
             <Button colorScheme="blue" mr={3} onClick={onClose}>
               취소
             </Button>
             <Button colorScheme="red" onClick={handleSignOut}>
               탈퇴하기
             </Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
     </>
    );
};

export default withLoginCheck(MyPage);
