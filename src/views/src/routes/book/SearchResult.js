import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { ChakraProvider, Box, Input, Button, VStack, Heading, Text, Image, LinkBox, LinkOverlay, Pagination, HStack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const SearchResult = (props) => {

  const location = useLocation();
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { keyword = '', page = 0 } = queryString.parse(location.search);

  useEffect(() => {
    if (keyword) {
      fetchBooks(page, keyword);
    }
  }, [page, keyword]);
  

  const fetchBooks = (page, searchKeyword) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/books/search?keyword=${encodeURIComponent(searchKeyword)}&page=${page}&size=10`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.bookMainDtoList || []);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setBooks([]);
      });
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    history.push(`/search?keyword=${keyword}&page=${newPage}`);
  };

  return (
    <VStack spacing={4} align="stretch" mx="auto" maxW="80%">
      <Heading as="h1" size="lg">책 제목으로 검색할수 있어요.</Heading>
      {books.length ? (
        <Box as="ul">
          {books.map(book => (
            <LinkBox as="li" key={book.id} p={4} borderWidth="1px" rounded="md">
              <Heading as="h2" size="md">
                <LinkOverlay as={Link} to={`/bookDetail/${book.id}`}>
                  {book.bookName}
                </LinkOverlay>
              </Heading>
              <Text>{book.bookDetail}</Text>
              {book.bookImgDtoList[0] ? (
                <Image src={book?.bookImgDtoList[0]?.imgUrl} alt={`Cover of ${book.bookName}`} />
              ) : (
                <Text>책 표지가 없어요.</Text>
              )}
            </LinkBox>
          ))}
        </Box>
      ) : (
        <Heading as="h2" size="md">검색 결과가 없어요.</Heading>
      )}
       <HStack spacing={1} justifyContent="center">
        <Button onClick={() => handlePageClick({ selected: page - 1 })} disabled={page === 0}>
          <ChevronLeftIcon />
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageClick({ selected: index })}
            isActive={page === index}
          >
            {index + 1}
          </Button>
        ))}
        <Button onClick={() => handlePageClick({ selected: page + 1 })} disabled={page === totalPages - 1}>
          <ChevronRightIcon />
        </Button>
      </HStack>
    </VStack>
  );
};

export default SearchResult;
