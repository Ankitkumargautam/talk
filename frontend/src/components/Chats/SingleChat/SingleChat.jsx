import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import useModal from '../../../hooks/useModal';
import { getSender, getSenderFull } from '../../../utils/ChatLogics';
import MyProfileModalFull from '../../MyProfileModal/MyProfileModalFull';
import ScrollableChat from '../ScrollableChat';
import UpdateGroupChatModal from '../UpdateGroupChatModal/UpdateGroupChatModal';
import './SingleChat.css';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../../animations/typing.json';

let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, openModal, closeModal } = useModal();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${
              user && user.token
                ? user?.token
                : JSON.parse(localStorage.getItem('token'))
            }`,
          },
        };
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/message`,
          {
            chatId: selectedChat._id,
            content: newMessage,
          },
          config
        );
        setNewMessage('');
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    }
  };
  const typeingHandler = (e) => {
    setNewMessage(e.target.value);
    console.log('new msg: ', newMessage);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            user && user.token
              ? user?.token
              : JSON.parse(localStorage.getItem('token'))
          }`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);
      console.log('msg: ', messages);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error on fetching chats',
        description: error?.response?.data?.message || error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_BASEURL);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      console.log('newMessageReceived: ', newMessageReceived);
      setMessages([...messages, newMessageReceived]);

      // if chat is not selected or doesn't match current chat
      // if (
      //   !selectedChatCompare ||
      //   selectedChatCompare._id !== newMessageReceived.chat._id
      // ) {
      //   setMessages([...messages, newMessageReceived]);
      // }
    });
  });

  return (
    <>
      {Object.keys(selectedChat).length > 0 ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat({})}
            />
            {selectedChat.isGroupChat ? (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            ) : (
              <>
                {getSender(user, selectedChat.users)}
                <MyProfileModalFull
                  isOpen={isOpen}
                  openModal={openModal}
                  closeModal={closeModal}
                  user={getSenderFull(user, selectedChat.users)}
                />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              d="flex"
              flexDir="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping && (
                <div style={{ marginBottom: '15px', marginLeft: 0 }}>
                  <Lottie options={defaultOptions} width={70} />
                </div>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typeingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
