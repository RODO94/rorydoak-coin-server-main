/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("connections", (table) => {
    table.string("user_first_name").notNullable();
    table.string("user_last_name").notNullable();
    table.string("user_known_as");
    table.string("connect_first_name").notNullable();
    table.string("connect_last_name").notNullable();
    table.string("connect_known_as");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("connections", (table) => {
    table.dropColumn("user_first_name");
    table.dropColumn("user_last_name");
    table.dropColumn("user_known_as");
    table.dropColumn("connect_first_name");
    table.dropColumn("connect_last_name");
    table.dropColumn("connect_known_as");
  });
};
