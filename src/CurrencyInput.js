import { useState, useEffect } from "react";
import axios from "axios";
import './currencyInput.css';

function CurrencyInput() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('AUD');
  const [rates, setRates] = useState([])


  useEffect(() => {
    axios.get(`https://altexchangerateapi.herokuapp.com/latest`)
      .then(response => {
        setRates(response.data.rates);
      })
  }, [])

  useEffect(() => {
    if (!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (

    <div className="group">


      <input
        type="number"
        value={amount1}
        onChange={event => handleAmount1Change(event.target.value)}
      />
      <select

        currencies={Object.keys(rates)}
        value={currency1}
        onChange={event => handleCurrency1Change(event.target.value)}>
        {Object.keys(rates).map((currency => (
          <option
            key={currency}
            currency={currency1}
            value={currency}>{currency}</option>
        )))}
      </select>
      <input type="number"

        value={amount2}

        onChange={event => handleAmount2Change(event.target.value)} />
      <select

        currencies={Object.keys(rates)}
        value={currency2}
        onChange={event => handleCurrency2Change(event.target.value)}>
        {Object.keys(rates).map((currency => (
          <option
            key={currency}
            currency={currency2}
            value={currency}>{currency}</option>
        )))}
      </select>
    </div>
  );
}




export default CurrencyInput;