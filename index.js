const db = require("./config/mysql");
const initialiseApp = require("./app.js");
require("dotenv").config();
const port = process.env.SECRET_PORT;

const app = initialiseApp(db);

app.listen(port, () => {
  console.log(`App running on port ${port} on production server \n`);
});
