const express = require("express");
const transactionController = require("../controllers/transactions-controller");
const { fetchDailySpend } = require("../controllers/accounts-controller");
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

const router = express.Router();
require("dotenv").config();
router.route("/weekly").get(transactionController.fetchWeeklySpend);
router
  .route("/weekly/category")
  .get(transactionController.fetchCategorisedSpend);
router.route("/").get(transactionController.fetchTransactions);
router
  .route("/:userId/weekly")
  .get(transactionController.fetchWeeklyTransactions);
router
  .route("/:userId/yearly")
  .get(transactionController.fetchYearlyTransactions);
router
  .route("/:userId/monthly")
  .get(transactionController.fetchMonthlyTransactions);

module.exports = router;
