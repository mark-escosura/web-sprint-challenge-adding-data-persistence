// build your `Task` model here
const db = require("../../data/dbConfig.js");

const getTasks = () => {
  /**
     * SELECT
      task_id,
      task_description,
      task_notes,
      task_completed,
      project_name,
      project_description
    FROM task as t
    LEFT JOIN projects as p
      ON p.project_id = t.task_id
    WHERE task_id = 1
     */
  return db("task as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select("t.*", "p.project_name", "p.project_description");
};

async function getById(id) {
  const row = await db("tasks").where("task_id", id).first();

  return {
    ...row,
    task_completed: row.task_completed ? true : false,
  };
}

async function createTask(task) {
  const [id] = await db("tasks").insert(task);
  return getById(id);
}

module.exports = {
  getTasks,
  createTask,
};
