const router = require("express").Router();

const {
    renderCatalogPage,
    renderSingleThreadPage
} = require("../controllers/viewController");

router.get("/", renderCatalogPage);
router.get("/:threadNo", renderSingleThreadPage);

module.exports = router;