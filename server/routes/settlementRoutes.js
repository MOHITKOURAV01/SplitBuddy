const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getBalances,
    createSettlement,
    markAsPaid,
    approveSettlement,
} = require("../controllers/settlementController");
const { protect } = require("../middleware/auth");

router.get("/balances", protect, getBalances);
router.post("/", protect, createSettlement);


router.post("/:id/pay", protect, markAsPaid);
router.post("/:id/approve", protect, approveSettlement);

module.exports = router;
