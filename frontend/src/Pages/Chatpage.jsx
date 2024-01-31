import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Chatbox from '../components/Chats/Chatbox';
import MyChats from '../components/Chats/MyChats';
import Navbar from '../components/Commons/Navbar';
import CreateGroupModal from '../components/CreateGroupModal/CreateGroupModal';
import MyProfileModal from '../components/MyProfileModal/MyProfileModal';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import { ChatState } from '../Context/ChatProvider';
import useModalGroup from '../hooks/useGroupModal';
import useModal from '../hooks/useModal';
import useSideDrawer from '../hooks/useSideDrawer';
import io from 'socket.io-client';

let socket;
const Chatpage = () => {
  const { user, selectedChat, notification, setNotification } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpenGroup, openModalGroup, closeModalGroup } = useModalGroup();
  const { isOpenDrawer, openModalDrawer, closeModalDrawer } = useSideDrawer();
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket = io(process.env.REACT_APP_BASEURL);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      console.log(
        'newMessageReceived: CP ',
        newMessageReceived,
        'selectedChat: CP ',
        selectedChat
      );

      // if chat is not selected or doesn't match current chat
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
        // setMessages([...messages, newMessageReceived]);
      }

      // else {
      //   setMessages([...messages, newMessageReceived]);
      // }
    });
  });
  console.log('notification: ', notification);

  return (
    <div style={{ width: '100%' }}>
      {user && (
        <Navbar
          openModal={openModal}
          openModalDrawer={openModalDrawer}
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats fetchAgain={fetchAgain} openModalGroup={openModalGroup} />
        <Chatbox
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          socketConnected={socketConnected}
          setSocketConnected={setSocketConnected}
          socket={socket}
        />
      </Box>

      {/* Here is modal for profile */}
      <MyProfileModal isOpen={isOpen} closeModal={closeModal} />

      {/* Here is modal for group creation */}
      <CreateGroupModal
        isOpenGroup={isOpenGroup}
        closeModalGroup={closeModalGroup}
      />

      {/* Here is side drawer component code */}
      <SideDrawer
        isOpenDrawer={isOpenDrawer}
        closeModalDrawer={closeModalDrawer}
      />
    </div>
  );
};

export default Chatpage;
