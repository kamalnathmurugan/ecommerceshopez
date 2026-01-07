# ShopEZ - E-commerce Application

A full-stack e-commerce application built with React.js, Node.js, Express.js, and MongoDB.

## Features

### Customer Features
- User registration and authentication
- Browse products by categories (Fashion, Electronics, Mobiles, Groceries, Sports Equipment)
- Product filtering and sorting
- Shopping cart functionality
- Order placement and tracking
- User profile and order history

### Admin Features
- Admin dashboard with statistics
- Product management (Add, Update, Delete)
- Order management and status updates
- User management
- Banner management

## Tech Stack

### Frontend
- React.js 19.2.0
- React Router DOM for routing
- Bootstrap 5.3.8 for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js 5.2.1
- MongoDB with Mongoose 9.0.2
- CORS enabled
- RESTful API architecture

## Project Structure

```
SHOPEZ E-commerce Application/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── styles/        # CSS files
│   │   └── ...
│   └── ...
├── server/                # Node.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   └── ...
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd "SHOPEZ E-commerce Application/server"
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:6000

### Frontend Setup

1. Navigate to the client directory:
```bash
cd "SHOPEZ E-commerce Application/client"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on http://localhost:5173

## Default Credentials

After running the seed script, you can use these credentials:

### Admin Account
- Email: admin@shopez.com
- Password: admin123

### Customer Account
- Email: john@example.com
- Password: password123

## API Endpoints

### User Routes
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/users - Get all users (admin only)

### Product Routes
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- GET /api/products/category/:category - Get products by category
- POST /api/products - Add new product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Order Routes
- GET /api/orders - Get all orders
- GET /api/orders/user/:userId - Get orders by user
- POST /api/orders - Create new order
- PUT /api/orders/:id - Update order status
- DELETE /api/orders/:id - Cancel order

### Cart Routes
- GET /api/cart/user/:userId - Get cart items by user
- POST /api/cart - Add item to cart
- PUT /api/cart/:id - Update cart item
- DELETE /api/cart/:id - Remove item from cart
- DELETE /api/cart/user/:userId - Clear user cart

### Admin Routes
- GET /api/admin/settings - Get admin settings
- PUT /api/admin/banner - Update banner
- PUT /api/admin/categories - Update categories

## Usage

### For Customers
1. Register a new account or login with existing credentials
2. Browse products by categories or use the search functionality
3. Add products to cart
4. Proceed to checkout and place orders
5. Track order status in the Orders section

### For Admins
1. Login with admin credentials
2. Access the admin dashboard to view statistics
3. Manage products (add, update, delete)
4. Manage orders and update their status
5. Update website banner and categories

## Database Schema

### User Schema
- username: String
- email: String (unique)
- password: String
- userType: String (Customer/Admin)

### Product Schema
- title: String
- description: String
- mainImg: String (URL)
- carousel: Array of image URLs
- sizes: Array of available sizes
- category: String
- gender: String
- price: Number
- discount: Number

### Order Schema
- userId: String
- name, email, mobile, address, pincode: String
- title, description, mainImg, size: String
- quantity: Number
- price, discount: Number
- paymentMethod: String
- orderDate: String
- orderStatus: String

### Cart Schema
- userId: String
- productId: String
- title, description, mainImg, size: String
- quantity: Number
- price, discount: Number

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.