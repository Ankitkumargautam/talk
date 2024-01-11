import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Login = () => {
  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter Your Email Address" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input placeholder="Enter Password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: '15px' }}>
        Login
      </Button>
      <Button colorScheme="red" width="100%" style={{ marginTop: '15px' }}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
