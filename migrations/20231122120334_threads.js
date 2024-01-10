/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("threads", (table) => {
    table.string("id").primary();
    table.string("thread_id").notNullable().unique();
    table
      .string("user_id")
      .notNullable()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.foreign("user_id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("threads");
};
