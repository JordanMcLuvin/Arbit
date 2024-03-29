function getBestArbitrage(currencies, rates) {
  let bestArbitrage = 1;
  let bestPath = [];

  function helper(current_currency, arb, cumm, skip){
      if (current_currency === "USD" && skip["USD"]) {
          if (arb  > bestArbitrage) {
              bestArbitrage = arb;
              bestPath = JSON.parse(JSON.stringify(cumm));
          }
          return;
      }

      for(let currency in currencies){
          currency = currencies[currency];
          if(!skip[currency]) {
              let s = JSON.parse(JSON.stringify(skip));
              s[currency] = true;
              let c = JSON.parse(JSON.stringify(cumm));
              c.push(currency);

              helper(currency, arb * rates[current_currency][currency], c, s);
          }
      }
  }

  helper("USD", 1, [], {});
  return [bestArbitrage, bestPath];
}

async function getRate(from, to) {

  let requestOptions = {
      method: 'GET',
      redirect: 'follow',
  };

  const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from.toLowerCase()}/${to.toLowerCase()}.json`, requestOptions);
  return response.json();

}

async function arbitrage(currs) {

    let rates;

    rates = {

    };

    let index2;
    for (let index in currs) {
        index = +index;
        console.log(`current index: ${index}`);
        index2 = index + 1;
        console.log(`After assignemtn: ${index2}`);
        while(index2 < currs.length) {
            console.log(`INDEX2: ${index2}`);
            // Add entries
            if(!rates[currs[index]]){
                rates[currs[index]] = {};
            }
    
            if(!rates[currs[index2]]){
                rates[currs[index2]] = {};
            }

            // get values.
            let to = currs[index2];
            let from = currs[index];

            console.log(`CALLING: ${from}:${to}`);
            rates[from][to] = (await getRate(from.toLowerCase(), to.toLowerCase()))[to.toLowerCase()];

            to = currs[index];
            from = currs[index2];
            rates[from][to] = (await getRate(from.toLowerCase(), to.toLowerCase()))[to.toLowerCase()];

            index2++;
        }
    }

  result = getBestArbitrage(currs, rates);
  result[1].unshift('USD')
  return({arbitrage: result[0], path: result[1], rates: rates})
}

// const rates = {
//   MXN: {USD: 0.053, AUD: 0.077, EUR: 0.04944, JPY: 6.90994},
//   AUD: {USD: 0.69, MXN: 13.06, EUR: 0.64665, JPY: 90.3798},
//   USD: {MXN: 18.92, AUD: 1.45, EUR: 0.92499, JPY: 129.283},
//   EUR: {MXN: 20.2159, AUD: 1.54613, USD: 1.08093, JPY: 139.755},
//   JPY: {MXN: 0.14464, AUD: 0.01106, USD: 0.00773, EUR: 0.00715}
// }

// const rates = process.env.API_KEY === "" ? rates : getRate
// process.env.API_KEY === "" ? rates : getRate

// const currs = ["JPY", "EUR", "MXN", "AUD", "USD"];
// arbitrage(currs, rates).then((data) => console.log(data));

module.exports = arbitrage;
