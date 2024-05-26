import express from "express";
import passport from "../middleware/passport.js";
const router = express.Router();

router.get("/login", async (req, res) => {
  res.send("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

export default router;
