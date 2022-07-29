import React, { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios'
import * as ReactBootStrap from 'react-bootstrap'


const Table = (props) => {

  const [rates, setRates] = useState([])

  useEffect(() => {
    axios.get(`https://altexchangerateapi.herokuapp.com/latest`)
      .then(response => {
        setRates(response.data.rates);
        console.log(rates);
      })
  }, [])

  console.log(props);


  return (
    <div>
      <h2>Exchange Rates</h2>
      <input type="number" value={props.amount} onChange={event => props.onAmountChange(event.target.value)} />
      <select value={props.currency} onChange={event => props.onCurrencyChange(event.target.value)}>
        {props.currencies.map((currency => (
          <option value={currency}>{currency}</option>
        )))}
      </select>

      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              props.currencies.map((currency) => (
                <td>{currency}</td>
              ))}
          </tr>
          <tr>

            {

              props.amount.map((amount) => (
                <td>{amount}</td>

              ))}


          </tr>














        </tbody>
      </ReactBootStrap.Table>
    </div>
  )
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>



export default Table