// build your `/api/resources` router here
const express = require("express");
const Resource = require("./model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resource = await Resource.getResources();
    res.status(200).json(resource);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newResource = await Resource.createResource(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    next(err)
  }
});

module.exports = router;
