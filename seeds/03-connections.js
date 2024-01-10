/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("connections").del();
  await knex("connections").insert([
    {
      id: "1",
      user_id: "1",
      user_first_name: "Michaél",
      user_last_name: "Dichmael",
      user_known_as: "Mick",
      connect_id: "1",
      connect_first_name: "Michaél",
      connect_last_name: "Dichmael",
      connect_known_as: "Mikey",
      status: "approved",
    },
    {
      id: "2",
      user_id: "1",
      user_first_name: "Michaél",
      user_last_name: "Dichmael",
      user_known_as: "Mick",
      connect_id: "2",
      connect_first_name: "Samuel",
      connect_last_name: "Bamuel",
      connect_known_as: "Sam",
      status: "approved",
    },
    {
      id: "3",
      user_id: "1",
      user_first_name: "Michaél",
      user_last_name: "Dichmael",
      user_known_as: "Mick",
      connect_id: "3",
      connect_first_name: "Dom",
      connect_last_name: "Wom",
      connect_known_as: "Dom",
      status: "approved",
    },
  ]);
};
