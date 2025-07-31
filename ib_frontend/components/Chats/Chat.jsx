import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';
import axios from 'axios';
import Message from './Message';
import MessageInput from './MessageInput';
import { AuthContext } from '../../contextAPI/Context';
import { useParams } from 'react-router-dom';

// Socket.IO client connection with fallback to polling
const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ['polling'], // Fallback if websocket fails (Render free plan issue)
  withCredentials: true,
});

function Chat() {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const { receiver } = useParams();

  // Fetch chat history
  useEffect(() => {
    if (!user || !receiver) return;

    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/message/history/${user.username}/${receiver}`
        );
        console.log("Chat history:", res.data);
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessages([]);
      }
    };

    fetchChatHistory();

    // Listen for new messages
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.off('chat message');
    };
  }, [user, receiver]);

  // Send a message
  const sendMessage = (text, file = null) => {
    if (!text && !file) return;

    const msg = {
      text,
      sender: user.username,
      receiver,
      type: file ? 'file' : 'text',
      attachments: file
        ? [{ url: URL.createObjectURL(file), fileName: file.name }]
        : [],
    };

    socket.emit('chat message', msg);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, i) => (
            <Message key={i} message={msg} isSender={msg.sender === user.username} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No messages yet.</p>
        )}
      </Box>

      {/* Input area */}
      <MessageInput onSend={sendMessage} />
    </Box>
  );
}

export default Chat;
