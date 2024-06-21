import { Button, Flex, Heading } from '@chakra-ui/react';
function NoAccess() {

    return (
        
        <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
      >
        <Heading mb="20px" as="h2" size="lg">권한이 없어요.</Heading>
      </Flex> 
        
        
    )
}

export default NoAccess;