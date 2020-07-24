import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/user.routes";

const app = express();

// use cors for CORS issue
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API status: OK" });
});

userRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
