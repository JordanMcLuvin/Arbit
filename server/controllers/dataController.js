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
  // arbitrage().then(data => data.create)
const ratesTemplate = {
  MXN: {USD: 0.053, AUD: 0.077, EUR: 0.04944, JPY: 6.90994},
  AUD: {USD: 0.69, MXN: 13.06, EUR: 0.64665, JPY: 90.3798},
  USD: {MXN: 18.92, AUD: 1.45, EUR: 0.92499, JPY: 129.283},
  EUR: {MXN: 20.2159, AUD: 1.54613, USD: 1.08093, JPY: 139.755},
  JPY: {MXN: 0.14464, AUD: 0.01106, USD: 0.00773, EUR: 0.00715}
}
  inpData = req.body.data;
  inpData.push('USD');
  arbitrage(inpData, ratesTemplate).then(response => {
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
