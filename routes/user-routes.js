const express = require("express");
const router = express.Router();
require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const {
  fetchUser,
  fetchConnections,
  fetchUsersConnections,
} = require("../controllers/users-controller");

router.route("/connections").get(async (req, res) => {
  const connectionsObj = await fetchConnections();
  res.send(connectionsObj);
});

router
  .route("/connections/:userId")
  .get(async (req, res) => {
    const connectionsObj = await fetchUsersConnections(req.params.userId);
    if (!connectionsObj) {
      res
        .status(404)
        .send(
          "Connections for that user cannot be found, please check the user ID"
        );
    }
    res.send(connectionsObj);
  })
  .post(async (req, res) => {})
  .delete(async (req, res) => {});

router.route("/:userId").get(async (req, res) => {
  if (!req.params.userId) {
    return res.status(400).send("please provide a valid userId");
  }
  const userObj = await fetchUser(req.params.userId);

  if (!userObj) {
    return res
      .status(404)
      .send(
        "We cannot find the user you are looking for, please double check the user ID you have provided"
      );
  }
  res.send(userObj);
});

module.exports = router;
