export default function Navbar() {
  return <nav className="nav">
    <a href="/" className="site-title">Currency Conversion</a>
    <ul>
      <li className="active">
        <a href="/CurrencyInput">Currency Converter</a>
      </li>
      <li>
        <a href="/ExchangeRates.js">Exchange Rates</a>
      </li>
    </ul>
  </nav>
}