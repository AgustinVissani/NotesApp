var express = require("express");
var router = express.Router();

const categories_controller = require("../controllers/categories_controller");

/* GET home page. */
router.get("/", categories_controller.getCategories);

router.post("/", categories_controller.addCategory);

router.put("/:id", categories_controller.updateCategory);

router.delete("/:id", categories_controller.deleteCategory);

module.exports = router;
