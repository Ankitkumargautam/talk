import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  const { user } = ChatState();
  console.log('Logged in User: ', user);
  return <div>Chat</div>;
};

export default Chatpage;
