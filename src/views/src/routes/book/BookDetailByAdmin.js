import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Box, Image, Heading, Button, useToast, Text, Stack, Divider, Flex } from '@chakra-ui/react';
import withAdminCheck from '../../components/adminCheck/withAdminCheck';
import defaultBookCover from '../../resources/book/default book cover.png';
import HomeHeader from '../../components/home/HomeHeader';

function BookDetailByAdmin({ match }) {
  const [book, setBook] = useState(null);
  const bookId = match.params.bookId;
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/book/${bookId}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('책 상세 정보를 가져오는 중 에러가 발생했습니다:', error));
  }, [bookId]);

  const handleEdit = () => {
    history.push(`/admin/book/edit/${bookId}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/book/${bookId}`, {
        method: 'DELETE',
        headers: {
          'access': localStorage.getItem('token'),
        }
      });

      if (!response.ok) {
        throw new Error('책을 삭제하는데 문제가 발생했습니다.');
      }
      console.log('책이 삭제되었습니다.');
      toast({
        title: '삭제 완료',
        description: '책을 잘 삭제했어요..',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      history.push('/admin/books'); // 삭제 후 책 목록 페이지로 이동
    } catch (error) {
      console.error('책 삭제에 실패했습니다:', error);
      toast({
        title: '삭제 실패',
        description: '책을 삭제하지 못했어요.: ' + error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (!book) {
    return <Box textAlign="center" py={10}>로딩 중...</Box>;
  }

  return (
    <Box p={5}>
      <HomeHeader />
      <Heading as="h2" fontSize="2em" fontWeight="bold">[관리자] 책 상세정보 조회</Heading>
      <Link to='/admin/books'><Button m="5" colorScheme='gray'>책 목록</Button></Link>
      <Stack spacing={3} mb={4}>
        <Heading size="lg">{book.bookName}</Heading>
        <Flex alignItems="center" justifyContent="flex-start">
          <Image
            maxHeight='40vh'
            objectFit="contain"
            src={book?.bookImgDtoList?.[0]?.imgUrl || defaultBookCover}
            alt="책 표지"
            mb={4}
          />
        </Flex>
        <Text fontSize="md"><strong>저자:</strong> {book.author}</Text>
        <Text fontSize="md"><strong>출판일:</strong> {book.publishDate}</Text>
        <Text fontSize="md"><strong>카테고리:</strong> {book.categoryName}</Text>
        <Text fontSize="md"><strong>출판사:</strong> {book.publisher}</Text>
        <Text fontSize="md"><strong>가격:</strong> ₩{book.bookPrice}</Text>
        <Text fontSize="md"><strong>재고:</strong> {book.stock}권</Text>
        <Text fontSize="md"><strong>목차:</strong></Text>
        <Box pl={4}>
          {book.tableOfContents.map((content, index) => (
            <Text key={index}>{content}</Text>
          ))}
        </Box>
        <Divider />
        <Text fontSize="md"><strong>설명:</strong> {book.bookDetail}</Text>
      </Stack>
      <Button colorScheme="blue" onClick={handleEdit} mr={3}>
        수정
      </Button>
      <Button colorScheme="red" onClick={handleDelete}>
        삭제
      </Button>
    </Box>
  );
}

export default withAdminCheck(BookDetailByAdmin);
