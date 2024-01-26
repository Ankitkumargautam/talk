import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import ChatLoading from '../Chats/ChatLoading';
import UserListItem from '../Chats/UserListItem';
import './SideDrawer.css';

const SideDrawer = ({ isOpenDrawer, closeModalDrawer }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const toast = useToast();

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${
          process.env.REACT_APP_BASEURL
        }/api/users/allUser?search=${JSON.stringify(search)}`,
        config
      );
      setSearchResult(data);
      console.log('setSearchResult data: ', data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setChatLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/chat`,
        {
          userId: userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log('chat data: ', data);
      setSelectedChat(data);
      setChatLoading(false);
      closeModalDrawer();
    } catch (error) {
      setChatLoading(false);
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };
  return (
    <>
      {isOpenDrawer && (
        <div className="drawer">
          <div className="drawer-content">
            <div className="drawer-header">
              <span className="drawer-title">
                <Text fontSize="2xl" fontFamily="Work sans" fontWeight="800">
                  Search Users
                </Text>
              </span>
              <button
                className="drawer-close-button"
                onClick={closeModalDrawer}
              >
                <CloseIcon m={1} />
              </button>
            </div>
            <div className="drawer-body">
              <Box d="flex" pb={2}>
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user, index) => (
                  <UserListItem
                    key={index}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
              {chatLoading && (
                <Box d="flex" justifyContent="center" alignItems="center">
                  <Spinner />
                </Box>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideDrawer;
