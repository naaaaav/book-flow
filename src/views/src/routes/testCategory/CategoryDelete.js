import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
  Heading
} from '@chakra-ui/react';
import HomeHeader from '../../components/home/HomeHeader';

const CategoryDelete = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('카테고리 목록 조회 실패', error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories/${selectedCategoryId}`, {
      method: 'DELETE',
      headers: {
        'access': token
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('카테고리 삭제 실패');
      }
      return response.json();
    })
    .then(() => {
      toast({
        title: '카테고리 삭제 성공',
        description: '선택한 카테고리가 삭제되었어요.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setCategories(categories.filter(category => category.id.toString() !== selectedCategoryId));
      setSelectedCategoryId('');
    })
    .catch(error => {
      console.error('카테고리 삭제 실패', error);
      toast({
        title: '카테고리 삭제 중 문제가 발생했어요.',
        description: '카테고리 삭제를 실패했어요.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  if(!categories.length) {
    return <Heading as="h1" my="auto" size="lg">삭제할 카테고리가 없어요.</Heading>
  }

  return (
    <Box p={5}>
      <HomeHeader />
      <Heading as="h2" size="lg" mb={6}>카테고리 삭제</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mt={4}>
          <FormLabel>삭제할 카테고리 선택</FormLabel>
          <Select placeholder="카테고리 선택" value={selectedCategoryId} onChange={handleCategoryChange}>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="red" type="submit">삭제하기</Button>
      </form>
    </Box>
  );
};

export default CategoryDelete;
