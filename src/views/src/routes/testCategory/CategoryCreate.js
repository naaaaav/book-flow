import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  useToast,
  Heading
} from '@chakra-ui/react';
import HomeHeader from '../../components/home/HomeHeader';

const CategoryCreate = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
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

  const handleParentCategoryChange = (event) => {
    setParentCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const data = {
      categoryName,
      isDeleted: false,
      parentCategory: parentCategoryId ? { id: parentCategoryId } : null,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access': token
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('카테고리 생성 실패');
      }
      return response.json();
    })
    .then(data => {
      toast({
        title: '카테고리 생성 성공',
        description: '새로운 카테고리를 만들었어요.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setCategoryName('');
      setParentCategoryId('');
      setCategories([...categories, data]);
    })
    .catch(error => {
      console.error('카테고리 생성 실패', error);
      toast({
        title: '카테고리 생성 중 문제가 발생했어요.',
        description: '카테고리를 만들지 못했어요.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Box p={5}>
      <HomeHeader />
      <Box mx="auto" maxW="80%">
      <Heading as="h2" size="lg" mb={6}>새 카테고리 생성</Heading>
        <form onSubmit={handleSubmit}>
        <FormControl isRequired mt={4}>
          <FormLabel>카테고리 이름</FormLabel>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="새 카테고리 이름 입력"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>상위 카테고리</FormLabel>
          <Select placeholder="상위 카테고리 선택" value={parentCategoryId} onChange={handleParentCategoryChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">생성하기</Button>
      </form>
      </Box>
      
    </Box>
  );
};

export default CategoryCreate;
