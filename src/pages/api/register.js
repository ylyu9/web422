import { connectToDatabase } from '../../utils/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ username });

    // Check if username is already taken
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
    };

    // Insert the new user into the database
    await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
