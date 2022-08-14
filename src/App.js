import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar.js"
import './App.css';
import CurrencyInput from "./CurrencyInput";
import Table from "./ExchangeRates"


function App() {



  return (
    <div>
      <Navbar />
      <Routes>

        {/* Home page (currency converter) */}
        <Route path={"/"} element={[<h1>Currency Converter</h1>,
        <CurrencyInput
        />
        ]} />

        {/* Exchange Rate Table */}
        <Route path="/ExchangeRates" element={(<Table />)} />
      </Routes>
    </div>
  );
}

export default App;
