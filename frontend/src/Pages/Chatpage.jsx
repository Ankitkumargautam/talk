import { Box } from '@chakra-ui/react';
import { useState } from 'react';
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

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpenGroup, openModalGroup, closeModalGroup } = useModalGroup();
  const { isOpenDrawer, openModalDrawer, closeModalDrawer } = useSideDrawer();

  return (
    <div style={{ width: '100%' }}>
      {user && (
        <Navbar openModal={openModal} openModalDrawer={openModalDrawer} />
      )}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats fetchAgain={fetchAgain} openModalGroup={openModalGroup} />
        <Chatbox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
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
