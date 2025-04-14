import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';
import axios from 'axios'; // Import axios for API requests
import Message from './Message';
import MessageInput from './MessageInput';
import { AuthContext } from '../../contextAPI/Context';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:8015');

function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext); // Get current user from context
  const { receiver } = useParams();
  
  // Fetch chat history from the backend when component mounts
  useEffect(() => {
    // Fetch messages between current user and receiver
    if(user){
        const fetchChatHistory = async () => {
            try {
              console.log(user,receiver)
              const response = await axios.get(
                `http://localhost:8015/api/message/history/${user?.username}/${receiver}`
              );
              setMessages(response.data); // Set the fetched messages
            } catch (error) {
              console.error('Error fetching chat history:', error);
            }
          };
          fetchChatHistory();
    }

    

    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('chat message');
  }, [user, receiver]); // Dependency array ensures it runs only when user or receiver changes
  if(messages){
    console.log(messages)
  }
  const sendMessage = (text, file = null) => {
    const msg = {
      text,
      sender: user.username, // Use user._id from context
      receiver, // Replace with receiver
      type: file ? 'file' : 'text',
      attachments: file ? [{ url: URL.createObjectURL(file), fileName: file.name }] : [],
    };
    socket.emit('chat message', msg);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 1, p: 1, backgroundColor: '#e5ddd5', borderRadius: 2 }}>
        {messages.map((msg, i) => (
          <Message key={i} message={msg} isSender={msg.sender === user.id} />
        ))}
      </Box>
      <MessageInput onSend={sendMessage} />
    </Box>
  );
}

export default Chat;
