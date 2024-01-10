/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("accounts").insert([
    {
      id: "1",
      bank_name: "Monzo",
      account_balance: 780195,
      savings_balance: 14000,
      available_balance: 780195 - 14000,
      is_savings: false,
      created_on: new Date(2018 - 12 - 20),
      type: "uk_retail",
      currency: "GBP",
      country_code: "GB",
      is_closed: false,
      spend_today: -69022,
      user_id: "1",
      monzo_account_id: "2003",
    },
    {
      id: "2",
      bank_name: "Monzo",
      account_balance: 6500195,
      savings_balance: 100000,
      available_balance: 6500195 - 100000,
      is_savings: false,
      created_on: new Date(2020 - 12 - 20),
      type: "uk_retail",
      currency: "GBP",
      country_code: "GB",
      is_closed: false,
      spend_today: -700,
      user_id: "2",
      monzo_account_id: "2003",
    },
    {
      id: "3",
      bank_name: "Monzo",
      account_balance: 70195,
      savings_balance: 0,
      available_balance: 70195 - 0,
      is_savings: false,
      created_on: new Date(2016 - 12 - 20),
      type: "uk_retail",
      currency: "GBP",
      country_code: "GB",
      is_closed: false,
      spend_today: -90022,
      user_id: "3",
      monzo_account_id: "2003",
    },
    {
      id: "4",
      bank_name: "Monzo",
      account_balance: 540195,
      savings_balance: 30000,
      available_balance: 540195 - 30000,
      is_savings: false,
      created_on: new Date(2022 - 12 - 20),
      type: "uk_retail",
      currency: "GBP",
      country_code: "GB",
      is_closed: false,
      spend_today: -14022,
      user_id: "4",
      monzo_account_id: "2003",
    },
  ]);
};
