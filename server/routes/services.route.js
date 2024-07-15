const express = require("express");
const {
  getServices,
  findById,
  add,
  update,
} = require("../controllers/service.controller");

const router = express.Router();

router.get("/", getServices);
router.get("/:id", findById);
router.post("/create", add);
router.put("/:id", update);
module.exports = router;
