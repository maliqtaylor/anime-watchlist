const router = require("express").Router();
const indexCtrl = require("../controllers/index");

router.get("/", indexCtrl.index);

module.exports = router;