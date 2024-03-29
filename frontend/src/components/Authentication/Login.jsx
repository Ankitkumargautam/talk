import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import useShow from '../../hooks/useShow';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useShow();
  const [loading, setLoading] = useState(false);

  const { setUser } = ChatState();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/users/login`,
        formData
      );
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', JSON.stringify(data.token));

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      // if (!userInfo) navigate('/');
      setUser(data);

      navigate('/chats');
    } catch (error) {
      toast({
        title: `${error.response.data.message} error`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
    setLoading(false);
  };

  const handleGuestUser = (e) => {
    e.preventDefault();
    setValue('email', 'jane@example.com');
    setValue('password', '123456');
  };

  return (
    <VStack spacing="5px" as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter Your Email Address" />
          )}
        />
        {errors.email && (
          <Text color="red" px={3}>
            {errors.email.message}
          </Text>
        )}
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type={show ? 'text' : 'password'}
                placeholder="Enter Password"
              />
            )}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow()}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Text color="red" px={3}>
            {errors.password.message}
          </Text>
        )}
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: '15px' }}
        type="submit"
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: '15px' }}
        onClick={(e) => handleGuestUser(e)}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
