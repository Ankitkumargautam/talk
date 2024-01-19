import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useShow from '../../hooks/useShow';
import useImageUploader from '../../hooks/useImageUploader';

const Signup = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const toast = useToast();

  //hooks
  const [show, setShow] = useShow();
  const [showConfirm, setShowConfirm] = useShow();
  const { picLoading, uploadPic } = useImageUploader('pic', setValue);

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    const formData = getValues();

    console.log('signup data: ', formData);

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return toast({
        title: "Passwords don't match",
        duration: 5000,
        status: 'warning',
        isClosable: true,
        position: 'bottom',
      });
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/users/register`,
        formData
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      return toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    } catch (error) {
      setLoading(false);
      return toast({
        title: 'Error Occured!',
        description: error.response.data.message, //this will show the error came from backend
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <VStack spacing="5px" as="form" onSubmit={handleSubmit(submitHandler)}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: 'Name is required',
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter Your Name" />
          )}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Controller
          name="email"
          defaultValue=""
          control={control}
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
        {errors.email && <span>{errors.email.message}</span>}
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be atleast 6 characters',
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
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            rules={{
              required: 'Confirm password is required',
              minLength: {
                value: 6,
                message: 'Confirm password should be atleast 6 characters',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
            )}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShowConfirm()}>
              {showConfirm ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => uploadPic(e.target.files[0])}
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        width="100%"
        style={{ marginTop: '15px' }}
        isLoading={loading || picLoading}
      >
        Signup
      </Button>
    </VStack>
  );
};

export default Signup;
