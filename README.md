# Buy-Sell Portal

A comprehensive web application for buying and selling items within the IIIT community.

## Overview

The Buy-Sell Portal is a full-stack web application that allows users to buy and sell items. It features user authentication, item listings, search functionality, cart management, order tracking, and a chatbot support system.

## Features

- **User Authentication**: Register with IIIT email and login securely
- **Dashboard**: Central hub for accessing all application features
- **Item Management**: Add items to sell with details like name, price, and stock
- **Search & Filter**: Find items by name or category
- **Shopping Cart**: Add items to cart and proceed to checkout
- **Order Processing**: Complete purchases with OTP verification
- **Order History**: Track bought and sold items
- **Item Delivery**: Verify deliveries with OTP system
- **Profile Management**: View and update user information
- **Chatbot Support**: Get assistance with AI-powered chat support

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Material UI for user interface components
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt.js for password hashing

### AI Integration
- Google Generative AI (Gemini) for chatbot functionality

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Gemini API key (for chatbot)

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Buy-Sell-Portal.git
   cd Buy-Sell-Portal
   ```

2. **Install backend dependencies:**
   ```bash
   cd buy-sell-app/backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend/my-react-app
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd buy-sell-app/backend
   node app.js
   ```
   The backend server will run on `http://localhost:5000`

2. **Start the frontend development server:**
   ```bash
   cd buy-sell-app/frontend/my-react-app
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another available port)

3. **Open your browser and navigate to `http://localhost:5173`**

## Application Flow

### Registration/Login
Users register with IIIT email address and log in to access the platform

### Dashboard
After login, users can access all features from the dashboard

### Buying Items
1. Search for items using the search bar or category filters
2. View item details and add to cart
3. Checkout from the cart to place an order
4. Receive OTP for verification during delivery

### Selling Items
1. Add items to sell with details
2. View pending deliveries
3. Verify delivery with OTP

### Order Management
- Track order history for both bought and sold items
- View pending orders awaiting delivery

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Items
- `GET /api/items` - Get all items with optional search and category filters
- `POST /api/items` - Add a new item for sale
- `GET /api/items/:id` - Get item details by ID

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `POST /api/cart/checkout` - Place order for items in cart

### Orders
- `GET /api/orders-history` - Get user's order history
- `GET /api/deliver-items` - Get items to deliver (as seller)
- `POST /api/deliver-items` - Mark item as delivered with OTP verification

### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot and get response

## Security Features

- JWT authentication for secure API access
- Password hashing with bcrypt
- Email validation for IIIT domain
- OTP verification for item delivery

## Project Structure

```
Buy-Sell-Portal/
├── buy-sell-app/
│   ├── backend/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── app.js
│   │   └── package.json
│   └── frontend/
│       └── my-react-app/
│           ├── src/
│           │   ├── components/
│           │   ├── pages/
│           │   ├── utils/
│           │   └── App.jsx
│           ├── public/
│           ├── package.json
│           └── vite.config.js
├── README.md
└── .gitignore
```
