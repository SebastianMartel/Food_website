const { conn } = require('./db');
//__________________________________________________


const testDatabaseConnection = async () => {
  try {
    await conn.authenticate();
    console.log('Database connection successful');
    const result = await conn.query('SELECT 1');
    console.log('Query result:', result[0]);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    // Close the database connection
    await conn.close();
  }
};


//__________________________________________________
testDatabaseConnection();