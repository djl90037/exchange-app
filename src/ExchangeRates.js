import React, { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'


const Table = (props) => {


  const [rates, setRates] = useState([])
  console.log(props);
  useEffect(() => {
    axios.get(`https://altexchangerateapi.herokuapp.com/latest`)
      .then(response => {
        setRates(response.data.rates);
        console.log(response.data.rates);
      })
  }, [])

  console.log();


  return (
    <div>
      <h1>Exchange Rates</h1>
      <div className="input">
        <input type="number" value={props.amount} onChange={event => props.onAmountChange(event.target.value)} />
        <select value={props.currency} onChange={event => props.onCurrencyChange(event.target.value)}>
          {props.currencies.map((currency => (
            <option value={currency}>{currency}</option>
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
            props.currencies.map((currency) => (
              <tr>
                <td>{currency}</td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  )
}





export default Table