

const exchangeRates = {
  'USD,MEX': 1,
  'USD,UAD': 1,
  'USD,EUR': 1,
  'MEX,USD': 1,
  'MEX,UAD': 1,
  'MEX,EUR': 1,
  'UAD,USD': 1,
  'UAD,MEX': 1,
  'UAD,EUR': 1,
}

// The top table should be simplified into this
const table = {
  USD: {MEX: 1, UAD: 1, EUR: 1},
  UAD: {USD: 1, MEX: 1, EUR: 1},
  MEX: {USD: 1, UAD: 1, EUR: 1},
  EUR: {USD: 1, MEX: 1, UAD: 1},
}

USD = {'MEX': 1, 'UAD': 1, 'EUR': 1}
// if USD then => return Math.max(arb(MEX, left - 1), arb(USA, left - 1), ARB(EUR, left - 1))


const currencies = Object.keys(table);

function findBestArbitrage(startCurrency="USD") {
  
}