const fs = require('fs');
const express = require('express');
// const { mongo, Mongoose } = require('mongoose');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.get("/", dataController.getData ,(req, res) => {
  return res.status(200).json({
    data: res.locals.data
  })
});

router.post("/", dataController.setData, (req, res) => {
  res.status(200).json({data: res.locals.data});
}) 

module.exports = router;