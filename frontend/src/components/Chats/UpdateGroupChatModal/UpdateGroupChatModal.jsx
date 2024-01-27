import './UpdateGroupChatModal.css';
import useModal from '../../../hooks/useModal';
import { useState } from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import { CloseIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import UserBadgeItem from '../../Commons/UserAvatar/UserBadgeItem';
import UserListItem from '../UserListItem';
import axios from 'axios';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const handleSearch = async (query) => {
    if (!query) {
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
        }/api/users/allUser?search=${JSON.stringify(query)}`,
        config
      );
      setSearchResult(data);
      // console.log('setSearchResult data: ', data);
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
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: 'User Already in group!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/chat/goupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      console.log('add user: ', data);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  const handleRemove = async (user1) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/chat/goupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      console.log('remove user: ', data);
      setSelectedChat(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      console.log('rename: ', data);
      setSelectedChat(data);
      // setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setRenameLoading(false);
    }
    setGroupChatName('');
  };
  return (
    <>
      <IconButton
        d={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={openModal}
      />
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">{selectedChat.chatName}</span>
              <button className="close-button" onClick={closeModal}>
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    admin={selectedChat.groupAdmin}
                    handleFunction={() => handleRemove(u)}
                  />
                ))}
              </Box>
              <FormControl d="flex">
                <Input
                  placeholder="Chat Name"
                  mb={3}
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Button
                  variant="solid"
                  colorScheme="teal"
                  ml={1}
                  isLoading={renameloading}
                  onClick={handleRename}
                >
                  Update
                </Button>
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Add User to group"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              {loading ? (
                <Box d="flex" alignItems="center" justifyContent="center">
                  <Spinner size="lg" />
                </Box>
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
              )}
            </div>
            <div className="modal-footer">
              <Button colorScheme="red" onClick={() => handleRemove(user)}>
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateGroupChatModal;
