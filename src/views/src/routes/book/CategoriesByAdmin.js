import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Box, List, ListItem, ListIcon, Heading, Button } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';
import HomeHeader from '../../components/home/HomeHeader';

function CategoriesByAdmin() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('카테고리를 가져오는 중 에러가 발생했습니다:', error));
  }, []);

  return (
    <Box className="category-container" p={5} width="100%">
      <HomeHeader />
      <Heading as="h2" size="lg" mb={4}>
        *관리자 책조회*<br/>책을 조회할 카테고리를 선택해 주세요.
      </Heading>
      <List spacing={3}>
        {categories.map(category => (
          <ListItem key={category.id} fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            <Link to={`/admin/books/category/${category.id}`}>{category.categoryName}</Link>
          </ListItem>
        ))}
      </List>
      <Link to='/product/add'><Button>책 추가</Button></Link>
    </Box>
  );
}

export default withAdminCheck(CategoriesByAdmin);