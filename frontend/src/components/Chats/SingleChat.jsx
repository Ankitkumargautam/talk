import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { ChatState } from '../../Context/ChatProvider';
import useModal from '../../hooks/useModal';
import { getSender, getSenderFull } from '../../utils/ChatLogics';
import MyProfileModalFull from '../MyProfileModal/MyProfileModalFull';
import UpdateGroupChatModal from './UpdateGroupChatModal/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, openModal, closeModal } = useModal();

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
