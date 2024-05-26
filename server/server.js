import express from "express";
import session from "express-session";
import passport from "./middleware/passport.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

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

import authRoute from "./routes/authRoute.js";
import indexRoute from "./routes/indexRoute.js";
import appointmentRouters from './routes/appointmentRoute.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/', indexRoute);
app.use("/auth", authRoute);
app.use('/appointment', appointmentRouters);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
