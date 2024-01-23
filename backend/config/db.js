const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DBString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(
      colors.blue.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(colors.red(`Error: ${error.message}`));
    process.exit(); //The process.exit() method is used to end the process which is running at the same time with an exit code in NodeJS.
  }
};

module.exports = connectDB;
