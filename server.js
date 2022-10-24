const mongoose = require("mongoose");

const app = require("./app");

DB_HOST =
  "mongodb+srv://BelayaElena:SGJYdPuSqmEzvcne@cluster0.hhwzkli.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
