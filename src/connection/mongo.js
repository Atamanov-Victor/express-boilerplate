const mongoose = require('mongoose');

const connectString = process.env.MONGODB_URL;

const dbState = {
  0: 'DB disconnected',
  1: 'DB connected',
  2: 'connecting to DB',
  3: 'disconnecting from DB',
};
mongoose
  .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then((connection) => {
    console.log(dbState[mongoose.connection.readyState]);
  });
console.log(dbState[mongoose.connection.readyState]);

module.exports = mongoose;
