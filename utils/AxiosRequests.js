const { default: axios } = require("axios");

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IjZ5bEZPNjRJcWdFK2ZNWnZyNXBhIiwianRpIjoiYWNjdG9rXzAwMDBBYnZmMHlyakhBenE5cE1EajciLCJ0eXAiOiJhdCIsInYiOiI2In0.DgGEWZiwpHEltC9Xbtu0e40AV3Ew52gHcN-kQYKtcsGrXCPf7LPUKG1rspwbX06bnDYsYInDScH7iSGhpiL3yQ";
const mainAccountId = "acc_00009QmjwqSXxcVFDU5k81";
const fetchAccountData = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.monzo.com/accounts", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const openAccountObj = data.accounts
      .filter((account) => account.closed === false)
      .map((account) => {
        return (account = {
          account: account.id,
          bank_name: "Monzo",
          created: account.created,
          type: account.type,
          currency: account.currency,
          country_code: account.country_code,
          monzo_user_id: account.owners.user_id,
          is_closed: account.closed,
        });
      });

    return openAccountObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchBalanceData = async (req, res, accountId) => {
  try {
    const { data } = await axios.get(
      `https://api.monzo.com/balance?account_id=${accountId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const balanceObj = {
      balance: data.balance,
      total_balance: data.total_balance,
      currency: data.currency,
      spend_today: data.spend_today,
    };

    // res.send(balanceObj);
    return balanceObj;
  } catch (error) {
    console.error(error);
  }
};

// app.get("/", (req, res) => {
//   const getAccountObj = async () => {
//     const accounts = await fetchAccountData(req, res);
//     return accounts;
//   };

//   let accounts = getAccountObj();

//   const getBalanceObj = async (array) => {
//     array = await array;
//     const balanceObj = await fetchBalanceData(req, res, array[0].account);
//     res.send({ ...array[0], ...balanceObj });
//     return { ...array[0], ...balanceObj };
//   };

//   const newBalanceAccountObj = getBalanceObj(accounts);

//   const addtoDatabase = async () => {
//     addAccounts(await newBalanceAccountObj);
//   };
//   addtoDatabase();
// });

const fetchTransactionData = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.monzo.com/transactions?account_id=${mainAccountId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const transactionArray = data.transactions.map((transaction) => {
      return {
        id: transaction.id,
        account_id: transaction.account_id,
        user_id: transaction.metadata.user_id,
        category: transaction.category,
        currency: transaction.currency,
        local_amount: transaction.local_amount,
        local_currency: transaction.local_currency,
        created: transaction.created,
        settled: transaction.settled,
      };
    });
    console.log("Fetch Transaction Data");
    return transactionArray;
  } catch (error) {
    console.error(error);
  }
  return ["no transactions found"];
};

// app.get("/transactions", (req, res) => {
//   console.log("at the start of the get");
//   const addTransactionsToDatabase = async () => {
//     const transactionArray = await fetchTransactionData(req, res);
//     console.log(transactionArray);
//     transactionArray.map((transaction) => {
//       const success = addTransactions(transaction);
//       return success;
//     });
//   };
//   addTransactionsToDatabase();
//   res.send("complete");
// });

module.exports = { fetchAccountData, fetchBalanceData, fetchTransactionData };
