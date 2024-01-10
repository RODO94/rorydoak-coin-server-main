const knex = require("knex")(require("../knexfile"));
const dayjs = require("dayjs");
const { weekArrayRestructure } = require("../utils/KnexFetch");

const fetchWeeklySpend = async (req, res) => {
  try {
    const usersWeeklySpend = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.user_id",
        "transactions.account_id",
        "transactions.category",
        "transactions.created",
        "users.first_name",
        "users.last_name",
        "users.known_as"
      )
      .whereBetween("transactions.created", ["2023-10-16", "2023-11-19"]);

    const weeklySpendArray = weekArrayRestructure(usersWeeklySpend);
    res.send(weeklySpendArray);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const fetchCategorisedSpend = async (req, res) => {
  // Each part of the radar is a category
  // We need category then all the values for that category per month
  // index by month
  // {groceries, eating_out,transport, entertainment, shopping}
  try {
    const usersWeeklySpend = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.user_id",
        "transactions.account_id",
        "transactions.category",
        "transactions.created",
        "users.first_name",
        "users.last_name",
        "users.known_as"
      )
      .whereBetween("transactions.created", ["2023-01-01", "2023-11-19"]);
    let janObj = {
      month: "january",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let febObj = {
      month: "february",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let marObj = {
      month: "march",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let aprObj = {
      month: "april",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let mayObj = {
      month: "may",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let junObj = {
      month: "june",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let julObj = {
      month: "july",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let augObj = {
      month: "august",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let sepObj = {
      month: "september",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let octObj = {
      month: "october",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let novObj = {
      month: "november",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    let decObj = {
      month: "december",
      groceries: 0,
      eating_out: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
    };
    const januaryArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 0
    );
    const februaryArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 1
    );
    const marchArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 2
    );
    const aprilArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 3
    );
    const mayArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 4
    );
    const juneArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 5
    );
    const julyArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 6
    );
    const augustArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 7
    );
    const septemberArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 8
    );
    const octoberArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 9
    );
    const novemberArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 10
    );
    const decemberArray = usersWeeklySpend.filter(
      (transaction) => dayjs(transaction.created).get("month") === 11
    );

    const categorisedJanuaryArray = januaryArray.map((transaction) => {
      if (transaction.category === "groceries") {
        return (janObj = {
          ...janObj,
          groceries: janObj.groceries + transaction.amount,
        });
      }
      if (transaction.category === "eating_out") {
        return (janObj = {
          ...janObj,
          eating_out: janObj.eating_out + transaction.amount,
        });
      }
      if (transaction.category === "entertaiment") {
        return (janObj = {
          ...janObj,
          entertainment: janObj.entertainment + transaction.amount,
        });
      }
      if (transaction.category === "transport") {
        return (janObj = {
          ...janObj,
          transport: janObj.transport + transaction.amount,
        });
      }
      if (transaction.category === "shopping") {
        return (janObj = {
          ...janObj,
          shopping: janObj.shopping + transaction.amount,
        });
      }
    });
    res.send(categorisedJanuaryArray);
    // Filter by month
    // Group by category for each month
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const fetchTransactions = async (req, res) => {
  try {
    const usersTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.user_id",
        "users.first_name",
        "users.known_as",
        "transactions.account_id",
        "transactions.category",
        "transactions.created"
      )
      .where("transactions.user_id", "57581dd2-96b8-4402-912b-c669c16f21a2");
    res.send(usersTransactions);
  } catch (error) {
    console.error(error);
    res.status(400).send("We can't find the transactions for that user");
  }
};

const fetchMonthlyTransactions = async (req, res) => {
  try {
    const monthlyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created",
        "transactions.user_id"
      )
      .where("transactions.created", ">", "2023-10-31")
      .andWhere("transactions.user_id", "=", req.params.userId);

    const monthlyTransactionsStructured = monthlyTransactions.map(
      (transactions) => {
        return {
          amount: transactions.amount / 100,
          category: transactions.category,
          date: transactions.created,
          user_id: transactions.user_id,
          currency: "GBP",
        };
      }
    );
    res.send(monthlyTransactionsStructured);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const fetchYearlyTransactions = async (req, res) => {
  try {
    const yearlyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created",
        "transactions.user_id"
      )
      .where("transactions.created", ">", "2022-12-31")
      .andWhere("transactions.user_id", "=", req.params.userId);
    const yearlyTransactionsMapped = yearlyTransactions.map((transactions) => {
      return {
        amount: transactions.amount / 100,
        category: transactions.category,
        date: transactions.created,
        user_id: transactions.user_id,
        currency: "GBP",
      };
    });

    res.send(yearlyTransactionsMapped);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const fetchWeeklyTransactions = async (req, res) => {
  try {
    const weeklyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created",
        "transactions.user_id"
      )
      .where("transactions.created", ">", "2023-11-12")
      .andWhere("transactions.user_id", "=", req.params.userId);

    const weeklyTransactionsStructured = weeklyTransactions.map(
      (transactions) => {
        return {
          amount: transactions.amount / 100,
          category: transactions.category,
          date: transactions.created,
          user_id: transactions.user_id,
          currency: "GBP",
        };
      }
    );

    res.send(weeklyTransactionsStructured);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  fetchWeeklySpend,
  fetchTransactions,
  fetchMonthlyTransactions,
  fetchYearlyTransactions,
  fetchWeeklyTransactions,
  fetchCategorisedSpend,
};
