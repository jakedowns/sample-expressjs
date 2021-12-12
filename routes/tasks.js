const express = require("express");
const router = express.Router();
const tasks = require("../services/tasks");

/* GET tasks listing. */
router.get("/", async function (req, res, next) {
  //   res.json({
  //     data: [
  //       {
  //         quote: "First, solve the problem. Then, write the code.",
  //         author: "John Johnson",
  //       },
  //     ],
  //     meta: {
  //       page: 1,
  //     },
  //   });

  try {
    res.json(await tasks.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting tasks`, err.message);
    next(err);
  }
});

/* POST tasks */
router.post("/", async function (req, res, next) {
  try {
    res.json(await tasks.create(req.body));
  } catch (err) {
    console.error(`Error while posting tasks `, err.message);
    next(err);
  }
});

module.exports = router;
