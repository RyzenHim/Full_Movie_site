const express = require("express");
const router = express.Router();

const {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} = require("../controllers/watchlistController");

router.get("/:userId", getWatchlist);
router.post("/:userId", addToWatchlist);
router.delete("/:userId/:movieId", removeFromWatchlist);

module.exports = router;
