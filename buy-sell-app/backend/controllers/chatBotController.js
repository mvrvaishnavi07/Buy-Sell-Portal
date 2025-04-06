// chatBotController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatBotController = {
    // Simple message handler
    handleMessage: async (req, res) => {
        try {
            const { message } = req.body;
            
            // Generate response using Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const chat = model.startChat();
            
            const result = await chat.sendMessage(message);
            const response = result.response.text();
            
            res.json({
                success: true,
                message: response
            });

        } catch (error) {
            console.error('Message handling error:', error);
            res.status(500).json({ 
                success: false,
                message: 'Failed to process message' 
            });
        }
    }
};

module.exports = chatBotController;
