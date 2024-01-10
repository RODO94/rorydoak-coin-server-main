const knex = require("knex")(require("../knexfile"));

const fetchAccounts = async (id) => {
  try {
    accountObj = await knex("accounts").where({ id: id });
  } catch (error) {}
};

const fetchUserDailySpend = async (id) => {
  try {
    const dailySpend = await knex("accounts")
      .where({ user_id: id })
      .select("spend_today");
    return dailySpend;
  } catch (error) {}
};

const fetchConnectionBalances = async (id) => {
  try {
    const connectionsBalancesObj = await knex("accounts")
      .join("connections", "accounts.user_id", "=", "connections.connect_id")
      .select(
        "accounts.account_balance",
        "accounts.savings_balance",
        "accounts.available_balance",
        "user_first_name",
        "user_last_name",
        "user_known_as",
        "connect_first_name",
        "connect_last_name",
        "connect_known_as"
      )
      .where("connections.user_id", id);
    return connectionsBalancesObj;
  } catch (error) {}
};

const fetchUsersBalance = async (id) => {
  try {
    const usersBalance = await knex("accounts")
      .where({ user_id: id })
      .select("account_balance", "savings_balance", "available_balance");
    return usersBalance;
  } catch (error) {}
};

const fetchUsersAccounts = async (id) => {
  try {
    const usersAccounts = await knex("accounts").where({ user_id: id });
    return usersAccounts;
  } catch (error) {}
};

const fetchDailySpend = async () => {
  try {
    const dailySpend = await knex("accounts")
      .join("users", "accounts.user_id", "=", "users.id")
      .select("accounts.spend_today", "users.first_name");
    return dailySpend;
  } catch (error) {
    resizeBy.status(400).send(error);
    return console.error(error);
  }
};
module.exports = {
  fetchAccounts,
  fetchUserDailySpend,
  fetchConnectionBalances,
  fetchUsersBalance,
  fetchUsersAccounts,
  fetchDailySpend,
};
