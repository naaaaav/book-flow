import { Button, Flex, Heading } from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';

function NoAccess({ history }) {
  const handleLoginRedirect = () => {
    history.push('/login');
  };

  const handleJoinRedirect = () => {
    history.push('/join');
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      <Heading mb="20px" as="h2" size="lg">로그인이 필요해요</Heading>
      <Button colorScheme="teal" onClick={handleLoginRedirect}>
        로그인 페이지로 가기
      </Button>
      <Button mt="20px" colorScheme="green" onClick={handleJoinRedirect}>
        회원가입
      </Button>
    </Flex>
  );
}

export default withRouter(NoAccess);
