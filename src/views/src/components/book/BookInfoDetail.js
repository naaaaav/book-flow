import {ChakraProvider, Divider, Stack, Text, Button} from '@chakra-ui/react';
import {Link} from "react-router-dom";

function BookInfoDetail({book}){
    const Divider = ({ width, color }) => (
        <div style={{ width: `${width}px`, height: '1px', backgroundColor: color }} />
    );

    return (
        <ChakraProvider>
            <div>
                <Stack spacing={10} direction='column' ml={110}>
                    <Stack spacing={1} direction='column'>
                        <Text fontSize='lg'> 책 소개 </Text>
                        <Divider width={53} color="darkgray" />
                        <Text fontSize='md' mt={1}> {book.book_detail} </Text>
                    </Stack>
                    <Stack spacing={1} direction='column'>
                        <Text fontSize='lg'> 목차 </Text>
                        <Divider width={35} color="darkgray"/>
                        <ul>
                            {book.book_content && book.book_content.map((content, index) => (
                                <Text key={index} fontSize='md' mt={1}> {content} </Text>
                            ))}
                        </ul>
                    </Stack>
                    <Stack spacing={1} direction='column'>
                        <Text fontSize='lg'> 관련 분류 </Text>
                        <Divider width={66} color="darkgray"/>
                        <Text fontSize='md' mt={1}> {book.book_category} </Text>
                        {/* 카테고리 페이지 이동 추가
                        <Link to={`경로`}>
                            <Text fontSize='sm' mt={1}>
                                {book.category_name}
                             </Text>
                        </Link> */}
                    </Stack>
                </Stack>
            </div>
        </ChakraProvider>
    );
}

export default BookInfoDetail;