const router = require("express").Router();

const {
    renderCatalogPage
} = require("../controllers/viewController");

router.get("/", renderCatalogPage);

module.exports = router;