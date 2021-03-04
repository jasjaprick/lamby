const express = require('express');
const router = require('./router');
const cors = require('cors');
const db = require('./model/index');

const app = express();

// const corsConfig = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// }

const PORT = 3001;

app.use(cors())
app.use(express.json());
app.use(router);

(async function () {
try {
await db.sequelize.sync();
app.listen(PORT, () => {
console.log(`Server listening at http://localhost:${PORT} 🚀`)
});
} catch (x_X) {
console.log('Error while connecting to server', x_X)
}
})();