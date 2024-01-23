import { Box } from '@chakra-ui/react';
import Chatbox from '../components/Chats/Chatbox';
import MyChats from '../components/Chats/MyChats';
import SideDrawer from '../components/Commons/SideDrawer';
import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  const { user } = ChatState();
  console.log('Logged in User: ', user);
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats />
        <Chatbox />
      </Box>
    </div>
  );
};

export default Chatpage;
