import React, { useState, useEffect } from 'react';
import NoAccess from './NoAccess'; // 권한 없음 페이지 컴포넌트
import { Button, Flex, Heading } from '@chakra-ui/react';

const withAdminCheck = (WrappedComponent) => {
  return (props) => {
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
      const checkAdminAccess = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/check`,
            {
              headers: {
                'access': token, 
              }
            }
          );
          const data = await response.text();
          if (response.ok) {
            setHasAccess(true);
          }
        } catch (error) {
          console.error('관리자 권한 확인 중 에러가 발생했습니다.', error);
        } finally {
          setIsLoading(false);
        }
      };

      checkAdminAccess();
    }, []);

    if (isLoading) {
      return <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      <Heading mb="20px" as="h2" size="lg">관리자 권한을 확인하고 있어요.</Heading>
    </Flex> ;
    }

    return hasAccess ? <WrappedComponent {...props} /> : <NoAccess />;
  };
};

export default withAdminCheck;
