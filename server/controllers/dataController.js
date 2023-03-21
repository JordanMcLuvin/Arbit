const { mongo, Mongoose } = require('mongoose');
const data = require('../models/mainModels');
const arbitrage = require('../algos/arbitrage')

const dataController = {};


dataController.getData = (req, res, next) => {
  const holder = [];
  data.find({}).exec()
  .then((data) => {
    for(const item of data){
      holder.push({"input": item.inputData, "calculated": item.resultRecord});
    }
    res.locals.data = holder;
    return next();
  })
  .catch(err => {
    return next({status: 400, log: 'error in getData', messgae: {err: 'error in getData'}});
  })
}

dataController.setData = (req, res, next) => {

  inpData = req.body.data;
  inpData.push('USD');
  arbitrage(inpData).then(response => {
    data.create({inputData: inpData, resultRecord: JSON.stringify(response)})
  .then((data) => {
    console.log(data)
    res.locals.data = data;
    return next();
  })
  .catch(err => {
    return next({status: 400, log: 'error in getData', messgae: {err: 'error in getData'}});
  })
  });
}

module.exports = dataController;
