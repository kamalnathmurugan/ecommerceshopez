const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Product, User } = require('./models/Schema');

const sampleProducts = [
  {
    title: 'iPhone 12',
    description: 'Apple iPhone with 6GB ram and 128GB storage',
    mainImg: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['128GB', '256GB'],
    category: 'Mobiles',
    gender: 'Unisex',
    price: 67999,
    discount: 15
  },
  {
    title: 'Realme buds',
    description: 'TWS buds with 10.2mm drivers giving you premium sound quality',
    mainImg: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['One Size'],
    category: 'Electronics',
    gender: 'Unisex',
    price: 2599,
    discount: 35
  },
  {
    title: 'MRF cricket bat',
    description: 'Popular willow wood cricket bat from MRF. Suitable for your all format plays in all conditions.',
    mainImg: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['M', 'L'],
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 1308,
    discount: 23
  },
  {
    title: 'Carrom board',
    description: 'Quality carrom board along with necessary equipment to make your free time more joyful',
    mainImg: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['Standard'],
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 4798,
    discount: 32
  },
  {
    title: 'Kokobura cricket bat',
    description: 'Imported cricket bat made with English willow wood. Premium bat to enhance your playing experience.',
    mainImg: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['M', 'L'],
    category: 'Sports-Equipment',
    gender: 'Unisex',
    price: 2355,
    discount: 0
  },
  {
    title: 'Men\'s Casual Shirt',
    description: 'Comfortable cotton casual shirt for men',
    mainImg: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Fashion',
    gender: 'Men',
    price: 1299,
    discount: 20
  },
  {
    title: 'Women\'s Dress',
    description: 'Elegant dress for women, perfect for casual and formal occasions',
    mainImg: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Fashion',
    gender: 'Women',
    price: 2499,
    discount: 30
  },
  {
    title: 'Laptop',
    description: 'High-performance laptop for work and gaming',
    mainImg: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['15 inch', '17 inch'],
    category: 'Electronics',
    gender: 'Unisex',
    price: 45999,
    discount: 10
  },
  {
    title: 'Organic Rice',
    description: 'Premium quality organic basmati rice',
    mainImg: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['1kg', '5kg', '10kg'],
    category: 'Groceries',
    gender: 'Unisex',
    price: 299,
    discount: 5
  },
  {
    title: 'Fresh Vegetables Pack',
    description: 'Fresh mixed vegetables pack for daily cooking',
    mainImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center',
    carousel: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&crop=center'
    ],
    sizes: ['1kg', '2kg'],
    category: 'Groceries',
    gender: 'Unisex',
    price: 199,
    discount: 0
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopezDB");
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Insert sample data
    await Product.insertMany(sampleProducts);
    
    // Create users with hashed passwords
    const adminPassword = await bcrypt.hash('admin123', 12);
    const customerPassword = await bcrypt.hash('password123', 12);
    
    const sampleUsers = [
      {
        username: 'admin',
        email: 'admin@shopez.com',
        password: adminPassword,
        userType: 'Admin'
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: customerPassword,
        userType: 'Customer'
      }
    ];
    
    await User.insertMany(sampleUsers);

    console.log("Sample data inserted successfully!");
    console.log(`Inserted ${sampleProducts.length} products`);
    console.log(`Inserted ${sampleUsers.length} users`);
    console.log("Admin credentials: admin@shopez.com / admin123");
    console.log("Customer credentials: john@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();