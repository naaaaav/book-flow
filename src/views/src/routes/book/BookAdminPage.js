import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  Heading,
  useToast,
  HStack
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';
import HomeHeader from '../../components/home/HomeHeader';

const BookAdminPage = () => {
    const { bookId } = useParams(); 
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [bookForm, setBookForm] = useState({
        id: null,
        name: '',
        detail: '',
        price: '',
        stock: '',
        date: '',
        categoryId: '',
        bookImgFiles: [],
        author: '',
        publisher: '',
        tableOfContents: []
    });
    const [categories, setCategories] = useState([]);

    const toast = useToast();

    const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (bookId) {
      const fetchBookDetails = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}`);
          const {id, name, detail, price, stock, date, categoryId, author, publisher, tableOfContents} = await response.json();
          setBookForm(prevBookForm => ({
            ...prevBookForm,
            id,
            name,
            detail,
            price,
            stock,
            date,
            categoryId,
            author,
            publisher,
            tableOfContents: tableOfContents || []
          }));
        } catch (error) {
          console.error('책 정보를 가져오는 중 에러가 발생했습니다:', error);
        }
      };
      fetchBookDetails();
    }
  }, [bookId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tableOfContents') {
      setBookForm({ ...bookForm, tableOfContents: value.split('\n') });
    } else {
      setBookForm({ ...bookForm, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setBookForm({ ...bookForm, bookImgFiles: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(bookForm).forEach(key => {
      if (key !== 'bookImgFiles') {
        formData.append(key, bookForm[key]);
      }
    });
    bookForm.bookImgFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
        const url = bookForm.id ? `${process.env.REACT_APP_API_URL}/api/admin/book/${bookForm.id}` : `${process.env.REACT_APP_API_URL}/api/admin/book`;
        const response = await fetch(url, {
          method: bookForm.id ? 'PUT' : 'POST',
          headers: {
            'access': token, 
          },
          body: formData
        });
        if (!response.ok) {
          throw new Error('책 정보를 저장하는데 문제가 발생했습니다.');
        }
        const data = await response.json();
        toast({
          title: '책정보를 저장했어요.',
          description: "책정보를 저장했어요.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        console.log('책 정보가 저장되었습니다:', data);
      } catch (error) {
        toast({
          title: '책 저장에 실패 했어요.',
          description: error.toString(),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
      
    useEffect(() => {
      if (newCategoryName) {
        createCategory();
      }
    }, [newCategoryName]);

    const createCategory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access': token,
          },
          body: JSON.stringify({
            categoryName: newCategoryName,
            isDeleted: false
          })
        });
  
        if (!response.ok) {
          throw new Error('카테고리를 생성하는데 문제가 발생했습니다.');
        }
  
        const data = await response.json();
        toast({
          title: '카테고리를 만들었어요..',
          description: `카테고리 '${data.categoryName}'(을)를 만들었어요.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
  
  
      } catch (error) {
        toast({
          title: '카테고리를 만들지 못했어요.',
          description: '카테고리를 만들지 못했어요.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };
  
    const handleNewCategory = () => {
      const categoryName = prompt('새 카테고리 이름을 적어주세요:');
      if (categoryName) {
        setNewCategoryName(categoryName); 
      }
    };

    return (
      <Box p={5}>
        <HomeHeader />
      <Link to='/admin/books'>
        <Button colorScheme='gray' leftIcon={<ArrowBackIcon />}> 책 목록</Button>
      </Link>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg" style={{ textAlign: 'left' }}>
          {bookForm.id ? '책 수정' : '책 추가'}
        </Heading>
        <form onSubmit={handleSubmit}>
          <HStack spacing={4} align="center">
            <FormControl id="category" isRequired>
              <FormLabel>카테고리</FormLabel>
              <HStack>
                <Select name="categoryId" value={bookForm.categoryId} onChange={handleInputChange} placeholder="카테고리를 골라주세요.">
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Select>
                <Button colorScheme='green' onClick={handleNewCategory}>카테고리 추가</Button>
              </HStack>
            </FormControl>
          </HStack>
  
            <FormControl id="name" isRequired>
              <FormLabel>책 제목</FormLabel>
              <Input type="text" name="name" value={bookForm.name} onChange={handleInputChange} placeholder="책 이름을 적어주세요." />
            </FormControl>
  
            <FormControl id="author">
              <FormLabel>저자</FormLabel>
              <Input type="text" name="author" value={bookForm.author} onChange={handleInputChange} placeholder="저자 이름을 적어주세요." />
            </FormControl>

            <FormControl id="publisher">
              <FormLabel>출판사</FormLabel>
              <Input type="text" name="publisher" value={bookForm.publisher} onChange={handleInputChange} placeholder="출판사 이름을 적어주세요." />
            </FormControl>

            <FormControl id="tableOfContents">
              <FormLabel>목차</FormLabel>
              <Textarea name="tableOfContents" value={bookForm.tableOfContents.join('\n')} onChange={handleInputChange} placeholder="목차를 입력해주세요. 각 항목은 줄바꿈으로 구분해주세요." />
            </FormControl>

            <FormControl id="detail" isRequired>
              <FormLabel>책 설명</FormLabel>
              <Textarea name="detail" value={bookForm.detail} onChange={handleInputChange} placeholder="책 설명을 적어주세요." />
            </FormControl>
  
            <FormControl id="price" isRequired>
              <FormLabel>가격</FormLabel>
              <Input type="number" name="price" value={bookForm.price} onChange={handleInputChange} placeholder="책 가격을 적어주세요." />
            </FormControl>
  
            <FormControl id="stock" isRequired>
              <FormLabel>재고</FormLabel>
              <Input type="number" name="stock" value={bookForm.stock} onChange={handleInputChange} placeholder="재고수량을 적어주세요." />
            </FormControl>
  
            <FormControl id="date">
              <FormLabel>출판일</FormLabel>
              <Input type="text" name="date" value={bookForm.date} onChange={handleInputChange} placeholder="출판일을 적어주세요." />
            </FormControl>
  
            <FormControl id="file">
              <FormLabel>표지나 사진을 올려주세요.</FormLabel>
              <Input type="file" multiple onChange={handleFileChange} />
            </FormControl>
  
            <HStack spacing={4} mt={4}>
              <Button colorScheme="blue" type="submit">
                {bookForm.id ? '책 수정' : '책 추가'}
              </Button>
              <Link to='/admin/books'>
                <Button colorScheme='gray'>확인</Button>
              </Link>
            </HStack>
          </form>
        </VStack>
      </Box>
    );
  };
  
  export default withAdminCheck(BookAdminPage);