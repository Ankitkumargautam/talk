import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatpage = () => {
  const [chats, setChats] = useState([]);
  const loadChat = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
  };
  useEffect(() => {
    loadChat();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <h5>{chat.chatName}</h5>
      ))}
    </div>
  );
};

export default Chatpage;
