const { connectToDatabase } = require('./mongodb.js'); // Ensure this path is correct

async function testConnection() {
  try {
    // Call the connectToDatabase function and await its result
    const { db, client } = await connectToDatabase();
    console.log("Database name:", db.databaseName);
    console.log("Connection successful!");

    // Close the database connection after testing
    client.close();
  } catch (error) {
    // Handle any errors that occur during the connection process
    console.error("Connection failed:", error);
  }
}

// Invoke the testConnection function
testConnection();