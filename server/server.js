import express from "express";
import session from "express-session";
import passport from "./middleware/passport.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // HTTPS Required
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

import authRoute from "./routers/authRoute.js";
import indexRoute from "./routers/indexRoute.js";

app.use('/', indexRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
