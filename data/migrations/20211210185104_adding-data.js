exports.up = async function (knex) {
  await knex.schema
    .createTable("project", (table) => {
      table.increments("project_id");
      table.string("project_name", 128).notNullable();
      table.string("project_description", 256);
      table.boolean("project_completed").defaultTo(false);
    })
    .createTable("resource", (table) => {
      table.increments("resource_id");
      table.string("resource_name", 128).notNullable().unique();
      table.string("resource_description", 256);
    })
    .createTable("task", (table) => {
      table.increments("task_id");
      table.string("task_description", 256).notNullable();
      table.string("task_notes");
      table.boolean("task_completed").defaultTo(false);
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("project")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("project_resources", (table) => {
      table.increments("project_resources_id");
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("project")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resource")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExist("project_resources")
    .dropTableIfExist("task")
    .dropTableIfExist("resource")
    .dropTableIfExist("project");
};
