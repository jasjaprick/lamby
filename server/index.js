require('dotenv').config();
const express = require('express');
const router = require('./router');
const cors = require('cors');
const db = require('./model/index');

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(router);

if (process.env.NODE_ENV !== 'test') {
  (async function () {
    try {
      await db.sequelize.sync();
      console.log(`${process.env.SQL_DATABASE} connected`);
    } catch (error) {
      console.log('Error while connecting to server', error);
    }
  })();
}

let server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} 🚀`);
});

module.exports = server;
