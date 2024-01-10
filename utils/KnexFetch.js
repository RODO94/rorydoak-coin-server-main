const knex = require("knex")(require("../knexfile"));
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekOfYear);

const weekArrayRestructure = (array) => {
  const transactionArray = array;
  const transactionsByWeekArray = transactionArray.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        week: dayjs(transaction.created).week(),
      })
  );
  let newArray = [];
  transactionsByWeekArray.map((transaction) => {
    let foundIndex = newArray.findIndex(
      (obj) => obj.id === transaction.first_name
    );
    if (
      transaction.category === "transfers" ||
      transaction.category === "income" ||
      transaction.category === "savings"
    ) {
      return;
    }
    if (foundIndex === -1) {
      // If you can't find the name
      newArray = [
        ...newArray,
        {
          id: transaction.first_name,
          data: [{ x: transaction.week, y: transaction.amount }],
        },
      ];
      return;
    }
    let weekIndex = newArray[foundIndex].data.findIndex(
      (obj) => obj.x === transaction.week
    );

    // If you can find the name and the week you are looking for is there
    if (foundIndex !== -1 && weekIndex !== undefined && weekIndex !== -1) {
      let newAmount = 0;
      newAmount = newArray[foundIndex].data[weekIndex].y + transaction.amount;
      newArray[foundIndex].data[weekIndex].y = newAmount;
      return;
    }
    // If you can find the name, but the week you are looking for is not there
    if (foundIndex !== -1 && weekIndex === -1) {
      newArray[foundIndex].data = [
        ...newArray[foundIndex].data,
        { x: transaction.week, y: transaction.amount },
      ];
      return;
    }
  });
  const roryUnitChange = newArray[0].data.map((week) => {
    return (newObj = { ...week, y: week.y / 100 });
  });
  newArray[0].data = roryUnitChange;
  const sortedArray = newArray.map((person) => {
    return person.data.sort((a, b) => {
      return a.x - b.x;
    });
  });
  console.log(sortedArray);
  return newArray;
};
module.exports = { weekArrayRestructure };
// Knex CRUD operations - route - callback function gets
// replaced with the Fetch functions
