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

const Signup = () => {
  return (
    <VStack spacing="5px">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" />
      </FormControl>
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
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input placeholder="Confirm Password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Show
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input type="file" p={1.5} accept="image/*" />
      </FormControl>
      <Button colorScheme="blue" width="100%" style={{ marginTop: '15px' }}>
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
