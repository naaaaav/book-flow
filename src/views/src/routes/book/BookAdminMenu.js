import React from 'react';
import {
  Box, VStack, HStack, Button, Icon, useDisclosure
} from '@chakra-ui/react';
import { FaBook, FaPlus, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../components/home/HomeHeader';

const BookAdminMenu = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBookViewEdit = () => {
    history.push('/admin/books');
  };

  const handleBookCreate = () => {
    history.push('/product/add');
  };


  return (
    <>
      <Box p={5}>
        <HomeHeader />
        <Box mt="5%">
          <VStack spacing={4} align="center">
            <HStack w="full" justifyContent="center" alignItems="center">
              <Icon as={FaBook} boxSize="11%" />
              <Button w="33%" colorScheme="blue" onClick={handleBookViewEdit}>
                책 조회/수정/삭제
              </Button>
            </HStack>
            <HStack w="full" justifyContent="center" alignItems="center">
              <Icon as={FaPlus} boxSize="11%" />
              <Button w="33%" colorScheme="green" onClick={handleBookCreate}>
                책 추가
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default BookAdminMenu;
