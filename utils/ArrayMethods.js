const knex = require("knex")(require("../knexfile"));
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const { default: OpenAI } = require("openai");
const openai = new OpenAI();

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
  console.log(roryUnitChange);
  newArray[0].data = roryUnitChange;
  const sortedArray = newArray.map((person) => {
    return person.data.sort((a, b) => {
      return a.x - b.x;
    });
  });
  console.log(sortedArray);
  return newArray;
};

const structureMessageList = (messageList) => {
  const filteredImageArray = messageList.body.data.filter(
    (response) => response.content.length > 1
  );
  const filteredMessageArray = messageList.body.data.filter(
    (response) => response.content.length === 1
  );

  const structuredMessageArray = filteredMessageArray.map((response) => ({
    id: response.id,
    role: response.role,
    created_at: response.created_at,
    content: response.content[0].text.value,
    type: response.content[0].type,
  }));

  if (filteredImageArray.length > 0) {
    const separatedFilteredImageArray = filteredImageArray.flatMap(
      (response) => [
        {
          id: response.id,
          role: response.role,
          created_at: response.created_at,
          type: response.content[0].type,
          file_id: response.content[0].image_file.file_id,
        },
        {
          id: response.id,
          role: response.role,
          created_at: response.created_at,
          type: response.content[1].type,
          content: response.content[1].text.value,
        },
      ]
    );
    const separateImageArray = separatedFilteredImageArray.filter(
      (response) => response.type === "image_file"
    );
    const separateTextArray = separatedFilteredImageArray.filter(
      (response) => response.type === "text"
    );
    const restructuredMessageArray = [
      ...structuredMessageArray,
      separateTextArray,
    ].flat();
    const responseArray = [...restructuredMessageArray, ...separateImageArray];
    return responseArray;
  }
  const responseArray = structuredMessageArray;
  return responseArray;
};
module.exports = { weekArrayRestructure, structureMessageList };
