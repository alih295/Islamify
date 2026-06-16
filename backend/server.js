const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app");
const dbConnection = require('./src/config/Database/db')

dbConnection()


const port = process.env.PORT;

app.listen(port || 4000, () => {
  console.log(`server is running on port ${port}`);
});
