import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Flex, Heading, Image, SimpleGrid, Text, useBreakpointValue
} from "@chakra-ui/react";
import defaultBookCover from "../../resources/book/default book cover.png";

function Books() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState({});
  const columnCount = useBreakpointValue({ base: 2, md: 5 });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('백엔드 에러 11');
            }
            return response.json();
          })
          .then((json) => {
            setCategories(json);
            json.forEach((category) => {
              fetch(`${process.env.REACT_APP_API_URL}/api/books/category/${category.id}`)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("백엔드 접속 에러2");
                  }
                  return response.json(); // 여기를 수정했습니다.
                })
                .then((data) => {
                  setBooks(prevBooks => ({
                    ...prevBooks,
                    [category.id]: data.bookMainDtoList.slice(0, 5) // 여기를 수정했습니다.
                  }));
                })
                .catch((e) => {
                  console.log("백엔드 접속 에러3", e);
                });
            });
          })
          .catch((e) => {
            console.log("백엔드 접속 에러4", e);
          });
      }, []);
      

      return (
        <Box>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Box key={category.id} mb="10">
                <Flex justify="space-between" align="center" mb="4">
                  <Heading as="h3" size="lg">{category.categoryName}</Heading>
                  <RouterLink to={`/category/${category.id}`}>더보기</RouterLink>
                </Flex>
                <SimpleGrid columns={columnCount} spacing="5">
                  {books[category.id]?.length > 0 ? (
                    books[category.id].map((book) => (
                      <Box key={book.id} bg="white" shadow="md" borderRadius="lg" overflow="hidden">
                        <RouterLink to={`/bookDetail/${book.id}`}>
                          <Image
                            src={book.bookImgDtoList && book.bookImgDtoList.length > 0 && book.bookImgDtoList[0].imgUrl ? book.bookImgDtoList[0].imgUrl : defaultBookCover}
                            alt={book.bookName || 'Default book cover'}
                            objectFit="cover"
                            w="100%"
                            h="300px"
                          />
                        </RouterLink>
                        <Box p="4">
                          <Text fontWeight="bold" noOfLines={1}><RouterLink to={`/bookDetail/${book.id}`}>{book.bookName}</RouterLink></Text>
                          <Text fontSize="sm">{book.author}</Text>
                          <Text>{book.bookPrice.toLocaleString()}원</Text>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Heading as="h2" size="md">책이 없습니다.</Heading>
                  )}
                </SimpleGrid>
              </Box>
            ))
          ) : (
            <Heading as="h2" size="md">카테고리가 없습니다.</Heading>
          )}
        </Box>
      );
    }
    
    export default Books;

