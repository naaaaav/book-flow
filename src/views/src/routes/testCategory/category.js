import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Image, Text, VStack, SimpleGrid, Button } from '@chakra-ui/react';
import HomeHeader from '../../components/home/HomeHeader';
import Footer from '../../components/home/Footer';

const Category = () => {
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/categories/${categoryId}/books`);
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.categoryName);

        const booksUrl = `${process.env.REACT_APP_API_URL}/api/books/category/${categoryId}?page=${currentPage}&size=${booksPerPage}`;
        const booksResponse = await fetch(booksUrl);
        const booksData = await booksResponse.json();
  
        setBooks(booksData.bookMainDtoList);
        setTotalPages(booksData.totalPages);
      } catch (e) {
        console.error('조회 에러', e);
      }
    };
  
    fetchCategoryData();
  }, [categoryId, currentPage]);
  

  const renderPageNumbers = totalPages => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          mx={1}
          colorScheme={currentPage === i ? 'teal' : 'gray'}
          variant={currentPage === i ? 'solid' : 'outline'}
        >
          {i + 1}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Box>
      <HomeHeader />
      <VStack spacing={8}>
        <Text fontSize="2xl">{categoryName}</Text>
        {books.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            {books.map(book => (
              <Box key={book.id} as={Link} to={`/bookDetail/${book.id}`} boxShadow="md" p="6" rounded="md" bg="white">
                <Image src={book.bookImgDtoList[0].imgUrl} alt={book.title} />
                <Text fontWeight="bold">{book.name}</Text>
                <Text>{book.author}</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>카테고리에 속한 책이 없습니다.</Text>
        )}
        <Box display="flex" justifyContent="center" mt="4">
          {renderPageNumbers(totalPages)}
        </Box>
      </VStack>
      <Footer />
    </Box>
  );
};

export default Category;
