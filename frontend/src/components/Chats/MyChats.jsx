import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { getSender } from '../../utils/ChatLogics';
import ChatLoading from '../Chats/ChatLoading';
import GroupChatModal from './GroupChatModal';

const MyChats = ({ fetchAgain, openModalGroup }) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const fetchChats = async () => {
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error fetching chats',
        description: error?.response?.data?.message || error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [selectedChat]);

  return (
    <Box
      d={{
        base: Object.keys(selectedChat).length > 0 ? 'none' : 'flex',
        md: 'flex',
      }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '20px', lg: '30px' }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Text onClick={() => openModalGroup()}>
          <Button
            d="flex"
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </Text>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats.length > 1 ? (
          <Stack overflowY="scroll">
            {chats.map((chat, index) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bgGradient={
                  selectedChat === chat &&
                  'linear(to-l, #f9ce34, #ee2a7b, #6228d7)'
                }
                bg={selectedChat !== chat && '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={index}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
