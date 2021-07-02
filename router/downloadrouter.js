const express = require("express");
const router = express.Router();
const excelController = require("../controller/dwonloadController");

  router.get("/download", excelController.download);



module.exports = router;