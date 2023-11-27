const router = require("express").Router();
let Sector = require("../models/sector.model");

router.route("/").get((req, res) => {
  Sector.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Sector.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Sector.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: 200,
        message: "Sector deleted",
        id: req.params.id,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Sector.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const agree = req.body.agree;
  // Validate required fields
  if (!username) {
    return res.status(400).json({
      status: "error",
      message: "Name is required",
    });
  } else if (!description) {
    return res.status(400).json({
      status: "error",
      message: "Sector sector is required",
    });
  } else if (!agree) {
    return res.status(400).json({
      status: "error",
      message: "Agree to terms and conditions is required",
    });
  }
  const newSector = new Sector({ username, description, agree });

  newSector
    .save()
    .then(() =>
      res.json({
        success: 200,
        message: "Sector added!",
        username: newSector.username,
        description: newSector.description,
        agree: newSector.agree,
        id: newSector._id,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
