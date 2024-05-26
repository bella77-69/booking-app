import express from 'express';
import { ensureAuthenticated } from '../middleware/checkAuth.js'; // Adjust the path as needed

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

// Admin route
router.get("/admin", ensureAuthenticated, (req, res) => {
  try {
    if (req.user.role === "admin") {
      res.render("admin", {
        user: req.user,
      });
    } else {
      res.status(403).redirect("/dashboard"); // 403 Forbidden for non-admin users
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handle server errors
  }
});

// Revoke admin route
router.get("/revoke", ensureAuthenticated, (req, res) => {
  res.render("revoke", {
    user: req.user,
  });
});

export default router;
