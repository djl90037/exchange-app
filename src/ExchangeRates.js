import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'
import './Table.css'


function Table(props) {

  const [rates, setRates] = useState([])
  const [base, setBase] = useState('EUR');
  const [baseAmount, setBaseAmount] = useState(1)


  function format(number) {
    return number.toFixed(4);
  }

  useEffect(() => {
    axios.get(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(response => {
        setRates(response.data.rates);

      })
  }, [])

  console.log(base);
  console.log(rates)



  return (
    <div>
      <h1>Exchange Rates</h1>
      <div className="input">

        {/* input amount */}
        <input type="number" value={baseAmount} onChange={e => setBaseAmount(e.target.value)} />

        {/* select currency */}
        <select

          value={base}
          onChange={e => setBase(e.target.value)} >
          {Object.keys(rates).map((currency => (
            <option
              key={currency}
              value={currency}>{currency}</option>
          )))}
        </select>
      </div>

      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(rates).map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{format(rates[currency] * baseAmount)}</td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  )
}

export default Table