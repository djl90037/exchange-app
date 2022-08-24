import React from 'react'
import './Table.css'
import { checkStatus, json } from './utils/fetchUtils'
import currencies from './utils/currencies'
import './currencyInput.css';
import CurrencyTable from './CurrencyTable'


class ExchangeRates extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      rates: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }

  getRatesData = (base) => {
    this.setState({ loading: true })
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      if (data.error) {
        throw new Error(data.error)
      }

      const rates = Object.keys(data.rates) // extract keys from the rates object
      .filter(acronym => acronym !== base) // filtering out the base currency
      .map(acronym => ({ // map the array, return an object containing acronym, exchange rate, name
        acronym,
        rate: data.rates[acronym],
        name: currencies[acronym].name,
        symbol: currencies[acronym].symbol,
      }))

      this.setState( { rates, loading: false })
    })
    .catch(error => console.error(error.message));
  }
  
  render() {
    const { base, rates, loading } = this.state;

    return (
      <React.Fragment>
        <h3 className="mb-2">Base currency: 1</h3>
        <div className='groupB'>


          <select value={base} onChange={this.changeBase} disabled={loading}>
            {Object.keys(currencies).map(currencyAcronym =>
              <option key={currencyAcronym} value={currencyAcronym}>
                {currencyAcronym}
              </option>)}
            <option value="USD">USD</option>
            <option value="USD">EUR</option>
          </select>
        </div>
        <CurrencyTable base={base} rates={rates} />
      </React.Fragment>
    )

  }

}

export default ExchangeRates



// return (
//   <div>
//     <h1>Exchange Rates</h1>
//     <div className="input">

//       {/* input amount */}
//       <input type="number" value={baseAmount} onChange={e => setBaseAmount(e.target.value)} />

//       {/* select currency */}
//       <select

//         value={base}
//         onChange={e => setBase(e.target.value)} >
//         {Object.keys(rates).map((currency => (
//           <option
//             key={currency}
//             value={currency}>{currency}</option>
//         )))}
//       </select>
//     </div>

    // <ReactBootStrap.Table striped bordered hover>
    //   <thead>
    //     <tr>
    //       <th>Currency</th>
    //       <th>Amount</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {
    //       Object.keys(rates).map((currency) => (
    //         <tr key={currency}>
    //           <td>{currency}</td>
    //           <td>{format(rates[currency] * baseAmount)}</td>
    //         </tr>
    //       ))}
    //   </tbody>
    // </ReactBootStrap.Table>
//   </div>
// )