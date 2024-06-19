import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Box, Text, VStack, HStack, Button, Link } from '@chakra-ui/react';
import HomeHeader from "../../components/home/HomeHeader";
import { CheckCircleIcon } from '@chakra-ui/icons';

function OrderCompleted() {
  return (
    <Box className="root" maxW="1200px" mx="auto" px={4}>
      <HomeHeader />
      <HStack
        spacing={8}
        align="center"
        justify="center"
        p={8}
        mt={10}
        bg="white"
        boxShadow="xl"
        borderRadius="lg"
      >
        {/* 체크마크 아이콘 */}
        <Box color="green.500" boxSize="10rem">
          <CheckCircleIcon w="100%" h="100%" />
        </Box>
        {/* 텍스트 및 링크 버튼 */}
        <VStack
          spacing={4}
          p={5}
          bg="gray.100"
          borderRadius="md"
          shadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold">감사합니다. 결제가 완료되었어요.</Text>
          <Text>빠르게 배송해 드릴게요.</Text>
          <Text>배송이 시작되면 결제 내역에서</Text>
          <Text>확인 하실 수 있어요.</Text>
          <Link as={RouterLink} to='/order-list'>
            <Button colorScheme="teal" size="lg">결제 내역을 확인해 볼까요?</Button>
          </Link>
          <Link as={RouterLink} to='/'>
            <Button colorScheme="teal" size="lg">메인 페이지로 갈까요?</Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
}

export default OrderCompleted;
