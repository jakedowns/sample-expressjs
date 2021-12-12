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

// TODO: keyed error bag for input field highlighting
function validateCreate(task) {
  let messages = [];

  if (!task) {
    messages.push('No object is provided')
  }

  if (!task.text) {
    messages.push('task.text is empty')
  }

  if (!task.author) {
    messages.push('task.author missing')
  }

  if (task.text && task.text.length > 255) {
    messages.push('task.text cannot be longer than 255 characters')
  }

  if (task.author && !parseInt(task.author)) {
    messages.push('task.author must be integer id')
  }

  if (messages.length) {
    let error = new Error(messages.join())
    error.statusCode = 400;

    throw error;
  }
}

async function create(task) {
  validateCreate(task)

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
