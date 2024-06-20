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
import withAdminCheck from '../../components/adminCheck/withAdminCheck';

const CategoryEdit = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const category = categories.find(c => c.id.toString() === categoryId);
    setSelectedCategory(category);
    setCategoryName(category.categoryName);
    setParentCategoryId(category.parentCategory?.id || '');
  };

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

    fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories/${selectedCategory.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'access': token
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('카테고리 수정 실패');
      }
      return response.json();
    })
    .then(data => {
        toast({
            title: '카테고리 수정 성공',
            description: '카테고리를 수정 했어요.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
    })
    .catch(error => {
      console.error('카테고리 수정 실패', error);
      toast({
        title: '카테고리 수정 중 문제가 발생했어요.',
        description: '카테고리 수정을 실패했어요.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  if (!categories.length) {
    return <Heading as="h1" my="auto" size="lg">수정할 카테고리가 없어요.</Heading>
  }

  return (
    <Box p={5}>
        <HomeHeader />
        <Box mx="auto" maxW="80%">
          <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>카테고리 선택</FormLabel>
          <Select placeholder="카테고리 선택" onChange={handleCategoryChange}>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>카테고리 이름</FormLabel>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>상위 카테고리</FormLabel>
          <Select placeholder="상위 카테고리 선택" value={parentCategoryId} onChange={handleParentCategoryChange}>
            {categories?.map(category => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">수정하기</Button>
      </form>
        </Box>
      
    </Box>
  );
};

export default withAdminCheck(CategoryEdit);
