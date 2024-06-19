import {ChakraProvider, Stack, Text, Spacer, Flex} from '@chakra-ui/react';


function Footer() {
    return (
            <ChakraProvider>
                <Flex direction="column" justify="flex-end" width="full">            <Spacer />
                    <Stack className="footer" spacing={2} mt={10} p={5} background='rgba(0, 0, 0, 0.05)' direction='column' align='center'>
                        <Text fontSize='sm' fontWeight='bold'>북플로우(주)</Text>
                        <Stack spacing={2} direction='row' color='dimgray'>
                            <Text fontSize='xs'>대표: 엘리스</Text>
                            <Text fontSize='xs'>사업자번호: 999-99-99999</Text>
                        </Stack>
                        <Stack spacing={2} direction='row' color='dimgray'>
                            <Text fontSize='xs'>전화번호: 9999-9999</Text>
                            <Text fontSize='xs'>이메일: bookflow@elice.com</Text>
                        </Stack>
                        <Text fontSize='xs'>주소: 서울 성동구 아차산로17길 48 성수낙낙</Text>
                    </Stack>
                </Flex>
            </ChakraProvider>
    )
}

export default Footer;