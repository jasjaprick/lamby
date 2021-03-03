const express = require('express');
const router = require('./router');
const cors = require('cors');
connection = require('./model/index');

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
}

const PORT = 3001;

app.use(cors(corsConfig))
app.use(express.json());
app.use(router);

(async function () {
try {
await connection;
app.listen(port, () => {
console.log(`Server listening at http://localhost:${PORT} 🚀`)
});
} catch (x_X) {
console.log('Error while connecting to server', x_X)
}
})();