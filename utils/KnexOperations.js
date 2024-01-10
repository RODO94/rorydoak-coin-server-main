const crypto = require("crypto");
const knex = require("knex")(require("../knexfile"));

const addAccounts = async (objects) => {
  await knex("accounts").insert([
    {
      id: crypto.randomUUID(),
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      monzo_account_id: objects.account,
      bank_name: "Monzo",
      account_balance: objects.total_balance,
      currency: objects.currency,
      country_code: objects.country_code,
      savings_balance: objects.total_balance - objects.balance,
      available_balance: objects.balance,
      created_on: new Date(objects.created),
      type: objects.type,
      is_closed: objects.is_closed,
      spend_today: objects.spend_today,
    },
  ]);
};

const addBalances = async (objects) => {};

const addUsers = async () => {
  await knex("users").insert([
    {
      id: crypto.randomUUID(),
      first_name: "Rory",
      last_name: "Doak",
      email: "rory.doak@gmail.com",
      known_as: "Rory",
      monzo_user_id: "user_00009MTSdOc7grRBUncvNh",
      monzo_token:
        "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6Iitvdm1sSEVlZC9UT1dMM05XcEpsIiwianRpIjoiYWNjdG9rXzAwMDBBYnZJZXNxd2toVnk5QzM4SzIiLCJ0eXAiOiJhdCIsInYiOiI2In0.mmx4VX9VMTuO5kPLNaTnHrPtSCyw74En1H-7VuKJ6_iCaRy7VjAtUrS9zjLSLeCu7ns2tqN1IZ_rrLobyrmu4Q",
    },
  ]);
};

const addTransactions = async (objects) => {
  console.log("starting");
  console.log(objects);
  let savings_bool = false;
  if (objects.category === "savings") {
    savings_bool = true;
  }
  const account_id = await knex("accounts")
    .where({
      monzo_account_id: objects.account_id,
    })
    .first();

  console.log(account_id);
  try {
    await knex("transactions").insert([
      {
        id: crypto.randomUUID(),
        amount: objects.local_amount,
        is_settled: true,
        category: objects.category,
        user_id: account_id.user_id,
        account_id: account_id.id,
        monzo_account_id: objects.account_id,
        monzo_transaction_id: objects.id,
        savings: savings_bool,
        created: new Date(objects.settled),
      },
    ]);
    console.log("finish knex");
  } catch (error) {
    console.error(error);
  }
  return "completed";
};

module.exports = { addAccounts, addBalances, addUsers, addTransactions };
