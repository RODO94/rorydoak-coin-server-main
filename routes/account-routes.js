const express = require("express");
const {
  fetchUserDailySpend,
  fetchConnectionBalances,
  fetchUsersBalance,
  fetchUsersAccounts,
} = require("../controllers/accounts-controller");
const router = express.Router();

require("dotenv").config();

// A Users Daily Spend
router.route("/daily/:userId").get(async (req, res) => {
  const dailySpend = await fetchUserDailySpend(req.params.userId);
  res.send(dailySpend);
});

// Balances from all a Users Connections
router.route("/connections/:userId").get(async (req, res) => {
  const connectionsBalancesObj = await fetchConnectionBalances(
    req.params.userId
  );
  const connectionsBalancesObjStructured = connectionsBalancesObj.map(
    (balance) => {
      return {
        account_balance: balance.account_balance / 100,
        savings_balance: balance.savings_balance / 100,
        available_balance: balance.available_balance / 100,
        user_known_as: balance.user_known_as,
        connect_known_as: balance.connect_known_as,
      };
    }
  );
  res.send(connectionsBalancesObjStructured);
});

// A Users Balance
router.route("/balance/:userId").get(async (req, res) => {
  const usersBalance = await fetchUsersBalance(req.params.userId);
  res.send(usersBalance);
});

// A Users Account
router.route("/:userId").get(async (req, res) => {
  const usersAccounts = await fetchUsersAccounts(req.params.userId);
  res.send(usersAccounts);
});

module.exports = router;
