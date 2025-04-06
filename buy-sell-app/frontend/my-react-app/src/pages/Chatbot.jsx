

// ChatBot.jsx
import React, { useState } from 'react';
import {
    Paper,
    TextField,
    IconButton,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import { Send, SupportAgent } from '@mui/icons-material';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([{
        role: 'assistant',
        content: 'Hello! How can I help you today?'
    }]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        const userMessage = newMessage.trim();
        setNewMessage('');
        setIsLoading(true);

        // Add user message immediately
        setMessages(prev => [...prev, {
            role: 'user',
            content: userMessage
        }]);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/chatbot/message',
                { message: userMessage },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.data.message
                }]);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            // Add error message to chat
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                width: '100%', 
                maxWidth: 600, 
                mx: 'auto', 
                height: 500,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header */}
            <Box sx={{ 
                p: 2, 
                borderBottom: 1, 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <SupportAgent />
                <Typography variant="h6">Support Chat</Typography>
                {isLoading && <CircularProgress size={20} sx={{ ml: 'auto' }} />}
            </Box>

            {/* Messages */}
            <Box sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            maxWidth: '80%',
                            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                            bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                            color: message.role === 'user' ? 'white' : 'text.primary',
                            p: 2,
                            borderRadius: 2
                        }}
                    >
                        <Typography>{message.content}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Input */}
            <Box 
                component="form" 
                onSubmit={sendMessage}
                sx={{ 
                    p: 2, 
                    borderTop: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 1
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <IconButton 
                    type="submit" 
                    color="primary"
                    disabled={isLoading || !newMessage.trim()}
                >
                    <Send />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ChatBot;

