const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    "SELECT id, text, author FROM task OFFSET $1 LIMIT $2",
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(task) {
  const result = await db.query(
    "INSERT INTO task(text, author) VALUES ($1, $2) RETURNING *",
    [task.text, task.author]
  );
  let message = "Error in creating task";

  if (result.length) {
    message = "Task created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create
};
