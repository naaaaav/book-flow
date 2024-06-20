import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';
import { ChakraProvider, Box, Input, Button, VStack, Heading, Text, Image, LinkBox, LinkOverlay, Pagination, Flex } from '@chakra-ui/react';
import HomeHeader from '../../components/home/HomeHeader';

const SearchPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      setKeyword(params.get('keyword') || '');
    } else {
      setKeyword('');
    }
  }, [location.search]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <VStack p={4} spacing={4} mx="auto" maxW="80%">
      <HomeHeader/>
      <form onSubmit={handleSearch} style={{ width: '100%' }}>
        <Flex>
          <Input
            flex="1"
            type="text"
            value={keyword}
            onChange={handleInputChange}
            placeholder="책 검색..."
          />
          <Button colorScheme="blue" type="submit" ml={2}>
            검색
          </Button>
        </Flex>
      </form>
      <SearchResult keyword={keyword} />
    </VStack>
  );
};

export default SearchPage;
