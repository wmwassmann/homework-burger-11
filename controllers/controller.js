const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// When the main page is loaded, GET
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    let hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// POST to be used to add a new burger
router.post("/api/burgers", (req, res) => {
    console.log(req.body);
    burger.insertOne(req.body.burger_name, req.body.digesting, (result) => {
      res.json({ id: result.insertId });
    });
});

// PUT to be used to update a burgers status as being digesting or not
router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log("Burger digesting!");

  burger.updateOne(
    req.body.digesting, condition, (result) => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

  router.delete("/api/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;

    burger.delete(
      condition, (result) => {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  
});

module.exports = router;