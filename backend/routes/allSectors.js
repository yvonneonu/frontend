const router = require("express").Router();
let Sector = require("../models/allsector.model");

// router.route("/allsectors").get((req, res) => {
//   Sector.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/").get((req, res) => {
  Sector.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
