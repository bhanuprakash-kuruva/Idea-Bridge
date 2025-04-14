import React from 'react';
import { Paper, Typography, Box, Chip, Avatar, Button} from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MessageRow = styled(Box)(({ isSender }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: isSender ? 'flex-end' : 'flex-start',
  alignItems: 'flex-end',
  padding: '4px 12px',
}));

const AvatarWrapper = styled(Box)(({ isSender }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginLeft: isSender ? '8px' : '0',
  marginRight: isSender ? '0' : '8px',
}));

const MessageColumn = styled(Box)(({ isSender }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isSender ? 'flex-end' : 'flex-start',
}));

const Bubble = styled(Paper)(({ isSender }) => ({
  maxWidth: '75%',
  padding: '10px 14px',
  backgroundColor: isSender ? '#DCF8C6' : '#F1F0F0',
  color: '#000',
  borderRadius: isSender
    ? '16px 0px 16px 16px'
    : '0px 16px 16px 16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const SenderName = styled(Typography)({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#3f51b5',
  marginBottom: 4,
  marginLeft: 4,
});

const Message = ({ message, isSender }) => {
  const {
    text,
    type,
    attachments,
    timestamp,
    status,
    isDeleted,
    edited,
    reactions,
    sender,
  } = message;
  const navigate = useNavigate()
  const username = sender?.username || 'Unknown';
  const avatarLetter = username[0]?.toUpperCase();
  const time = dayjs(timestamp).format('HH:mm');

  return (
    <MessageRow isSender={isSender}>
      {!isSender && (
        <AvatarWrapper isSender={isSender}>
          <Avatar>{avatarLetter}</Avatar>
        </AvatarWrapper>
      )}

      <MessageColumn isSender={isSender}>
        {!isSender && (
          <Button onClick={()=> navigate(`/user/anotherProfile/${username}`)}>
            <SenderName variant="subtitle2">{username}</SenderName>
          </Button>
        )}

        <Bubble isSender={isSender} elevation={1}>
          {isDeleted ? (
            <Typography variant="body2" fontStyle="italic" color="gray">
              This message was deleted
            </Typography>
          ) : (
            <>
              {type === 'text' && <Typography>{text}</Typography>}

              {type !== 'text' && attachments && attachments.map((att, i) => (
                <Box key={i} sx={{ mt: 1 }}>
                  {att.type?.startsWith('image') ? (
                    <img
                      src={att.url}
                      alt={att.fileName}
                      style={{
                        maxWidth: '100%',
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <Chip
                      label={att.fileName || 'Download file'}
                      component="a"
                      href={att.url}
                      target="_blank"
                      clickable
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              ))}

              {edited && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontStyle="italic"
                >
                  (edited)
                </Typography>
              )}

              <Box display="flex" justifyContent="flex-end" mt={0.5}>
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.7em', color: 'gray' }}
                >
                  {time}
                </Typography>
                {status && isSender && (
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '0.7em', color: 'gray', ml: 1 }}
                  >
                    {status === 'sent' && '✔'}
                    {status === 'delivered' && '✔✔'}
                    {status === 'read' && '✔✔'}
                  </Typography>
                )}
              </Box>

              {reactions && reactions.length > 0 && (
                <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {reactions.map((r, i) => (
                    <Chip key={i} label={r.emoji} size="small" />
                  ))}
                </Box>
              )}
            </>
          )}
        </Bubble>
      </MessageColumn>

      {isSender && (
        <AvatarWrapper isSender={isSender}>
        <Avatar
          src={sender?.profilePicture ? `http://localhost:8015/uploads/${sender.profilePicture}` : undefined}
        >
          {avatarLetter}
        </Avatar>
      </AvatarWrapper>
      
      )}
    </MessageRow>
  );
};

export default Message;
