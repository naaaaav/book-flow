import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Image, Text, Button, Flex, Heading } from '@chakra-ui/react';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';
import defaultBookCover from '../../resources/book/default book cover.png';
import HomeHeader from '../../components/home/HomeHeader';

function BooksByAdmin({ match }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage] = useState(10); // 한 페이지에 표시할 책의 수
  const [totalPages, setTotalPages] = useState(0);
  const categoryId = match.params.categoryId;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/category/${categoryId}?page=${currentPage}&size=${booksPerPage}`);
        const data = await response.json();
        setBooks(data.bookMainDtoList);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('책 목록을 가져오는 중 에러가 발생했습니다:', error);
      }
    };

    fetchBooks();
  }, [categoryId, currentPage, booksPerPage]);

  // 페이지네이션 컨트롤러
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box p={5}>
      <HomeHeader />
      <Heading as="h2" size="xl" mb={6}>[관리자]<br/><br/>책 목록</Heading>
      <Flex mb={5} justify="center" align="center">
        <Link to='/admin/books'>
          <Button m={2} colorScheme='gray'>조회할 카테고리 선택하기</Button>
        </Link>
        <Link to='/product/add'>
          <Button m={2} colorScheme='gray'>책 추가</Button>
        </Link>
      </Flex>
      <List spacing={3}>
          {books.map(book => (
      <ListItem key={book.id} p={3} boxShadow="md" borderRadius="md" bg="gray.100">
        <Link to={`/admin/book/${book.id}`}>
          <Flex align="center" justify="space-between" wrap="wrap" p={3} borderRadius="md">
            <Box flexShrink={0}>
              <Image
                borderRadius="md"
                src={book.bookImgDtoList && book.bookImgDtoList.length > 0 ? book.bookImgDtoList[0].imgUrl : defaultBookCover}
                alt={book.bookName}
                boxSize="100px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1" ml={4} my={2}>
              <Flex align="center" justify="space-between">
                <Box bg="teal.100" p={2} borderRadius="md">
                  <Text fontSize="lg" fontWeight="bold" color="teal.800">{book.bookName}</Text>
                </Box>
                <Box bg="orange.100" p={2} borderRadius="md">
                  <Text color="gray.600">카테고리: {book.category.categoryName}</Text>
                </Box>
                <Box bg="yellow.100" p={2} borderRadius="md">
                  <Text color="gray.600">출판사: {book.publisher}</Text>
                </Box>
                <Box bg="green.100" p={2} borderRadius="md">
                  <Text color="gray.600">출판일: {book.date}</Text>
                </Box>
                <Box bg="blue.100" p={2} borderRadius="md">
                  <Text color="gray.600">저자: {book.author}</Text>
                </Box>
                <Box bg="pink.100" p={2} borderRadius="md">
                  <Text color="gray.600">가격: ₩{book.bookPrice}</Text>
                </Box>
                <Box bg="purple.100" p={2} borderRadius="md">
                  <Text color="gray.600">재고: {book.stock}권</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Link>
      </ListItem>
    ))}
      </List>
      <Flex mt={4} justify="center">
        {pageNumbers.map(number => (
          <Button
            key={number}
            onClick={() => setCurrentPage(number - 1)}
            mx={1}
            colorScheme="teal"
            variant="outline"
          >
            {number}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export default withAdminCheck(BooksByAdmin);
