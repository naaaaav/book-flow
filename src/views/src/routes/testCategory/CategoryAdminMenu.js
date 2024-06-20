import React from 'react';
import {
  Box, VStack, HStack, Button, Icon, useDisclosure
} from '@chakra-ui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../components/home/HomeHeader';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';

const CategoryAdminMenu = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCategoryViewEdit = () => {
    history.push('/category-edit');
  };

  const handleCategoryCreate = () => {
    history.push('/category-create');
  };

  const handleCategoryDelete = () => {
    history.push('/category-delete');
  };


  return (
    <>
      <Box p={5}>
        <HomeHeader />
        <Box mt="5%">
          <VStack spacing={4} align="center">
            <HStack w="full" justifyContent="center" alignItems="center">
              <Icon as={FaEdit} boxSize="11%" />
              <Button w="33%" colorScheme="blue" onClick={handleCategoryViewEdit}>
                카테고리 조회/수정
              </Button>
            </HStack>
            <HStack w="full" justifyContent="center" alignItems="center">
              <Icon as={FaPlus} boxSize="11%" />
              <Button w="33%" colorScheme="green" onClick={handleCategoryCreate}>
                카테고리 생성
              </Button>
            </HStack>
            <HStack w="full" justifyContent="center" alignItems="center">
              <Icon as={FaTrash} boxSize="11%" />
              <Button w="33%" colorScheme="red" onClick={handleCategoryDelete}>
                카테고리 삭제
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default withAdminCheck(CategoryAdminMenu);
