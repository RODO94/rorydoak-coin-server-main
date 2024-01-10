const knex = require("knex")(require("../knexfile"));

const fetchUser = async (id) => {
  try {
    userObj = await knex("users").where({ id: id }).first();
    return userObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchConnections = async () => {
  try {
    const connectionsObj = await knex("connections");
    return connectionsObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchUsersConnections = async (id) => {
  try {
    connectionsObj = await knex("connections").where({ user_id: id });
    return connectionsObj;
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  fetchUser,
  fetchConnections,
  fetchUsersConnections,
};
