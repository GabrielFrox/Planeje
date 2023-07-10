const express = require("express");
const cors = require ("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Db connection
const connection = require('./Structure/db/connection');
connection();

// Routes
const routes = require('./Structure/routes/router');

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Servidor Online");
});
