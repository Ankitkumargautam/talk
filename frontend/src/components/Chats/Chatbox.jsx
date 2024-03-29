import { Box } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import SingleChat from './SingleChat/SingleChat';

const Chatbox = ({
  fetchAgain,
  setFetchAgain,
  socketConnected,
  setSocketConnected,
  socket,
}) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      d={{
        base: Object.keys(selectedChat).length > 0 ? 'flex' : 'none',
        md: 'flex',
      }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {Object.keys(selectedChat).length > 0 && (
        <SingleChat
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          socketConnected={socketConnected}
          setSocketConnected={setSocketConnected}
          socket={socket}
        />
      )}
    </Box>
  );
};

export default Chatbox;
