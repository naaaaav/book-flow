import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Text, VStack, HStack, Button, Link } from '@chakra-ui/react';
import HomeHeader from "../../components/home/HomeHeader";
import {CheckCircleIcon} from '@chakra-ui/icons';
import "./OrderCompleted.css";
function OrderCompleted() {
  return (
    <Box className="root">
      <HomeHeader />
      <HStack className="content" spacing={8} align="center" justify="center" p={8}>
        {/* 체크마크 아이콘 */}
        <Box color="green.500" fontSize="4xl">
          <CheckCircleIcon />
        </Box>
        {/* 텍스트 및 링크 버튼 */}
        <VStack
          className="textContainer"
          spacing={4}
          p={5}
          bg="gray.100" // 배경색 추가
          borderRadius="md" // 모서리 둥글게
          shadow="md" // 그림자 효과
        >
          <Text lineHeight="0" fontSize="lg">감사합니다. 결제가 완료되었어요.</Text>
          <Text lineHeight="0">빠르게 배송해 드릴게요.</Text>
          <Text lineHeight="0">배송이 시작되면 결제 내역에서</Text>
          <Text lineHeight="0">확인 하실 수 있어요.</Text>
          <Link as={RouterLink} to='/order-list' style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" variant="solid">결제 내역을 확인해 볼까요?</Button>
          </Link>
          <Link as={RouterLink} to='/' style={{ textDecoration: 'none' }}>
            <Button colorScheme="teal" variant="solid">메인 페이지로 갈까요?</Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
}

export default OrderCompleted;
