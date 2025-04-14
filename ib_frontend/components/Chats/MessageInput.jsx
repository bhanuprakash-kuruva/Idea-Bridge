import React, { useState } from 'react';
import { Box, TextField, IconButton, Button, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = () => {
    if (!text && !file) return;
    onSend(text, file);
    setText('');
    setFile(null);
  };

  const handleFileClear = () => {
    setFile(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        padding: '8px',
        borderTop: '1px solid #ddd',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* File Attachment */}
      <IconButton component="label" sx={{ mr: 1 }}>
        <AttachFileIcon />
        <input
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </IconButton>

      {/* Text Field */}
      <TextField
        fullWidth
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        multiline
        minRows={1}
        maxRows={4}
        variant="outlined"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#fff',
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            padding: '4px 10px',
          },
        }}
        InputProps={{
          endAdornment: file && (
            <InputAdornment position="end">
              <IconButton onClick={handleFileClear}>
                <ClearIcon sx={{ color: 'gray' }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Send Button */}
      <IconButton
        color="primary"
        onClick={handleSend}
        sx={{ ml: 1 }}
        disabled={!text && !file}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
