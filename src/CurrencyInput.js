import  React  from "react";
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';
import Footer from './Footer'
import './App.css';
import Chart from 'chart.js'


class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: 109.55,
      baseAcronym: 'USD',
      baseValue: 1,
      quoteAcronym: 'JPY',
      quoteValue: 1 * 109.55,
      loading: false,
    };

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { baseAcronym, quoteAcronym } = this.state;
    this.getRate(baseAcronym, quoteAcronym);
    this.getHistoricalRates(baseAcronym, quoteAcronym)
  }

  getRate = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      const rate = data.rates[quote];

      this.setState({
        rate,
        baseValue: 1,
        quoteValue: Number((1 * rate).toFixed(3)),
        loading: false,
      });
    })
    .catch(error => console.error(error.message));
  }

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    console.log(startDate)
    console.log(endDate)

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
    .then(checkStatus)
    .then(json)
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      const chartLabels = Object.keys(data.rates);
      const chartData = Object.values(data.rates).map(rate => rate[quote]);
      const chartLabel = `${base}/${quote}`;
      this.buildChart(chartLabels, chartData, chartLabel);
    })
    .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    Chart.defaults.global.defaultFontColor = '#bbb6b6';
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {

      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
            borderColor: '#bbb6b6',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              color: "#bbb6b6"
            },
            display: true,
          }],
          yAxes: [{
            gridLines: {
              color: "#bbb6b6"
            },
            display: true,
          }],
        }
      }
    })
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toQuote(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if(Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }

  changeBaseAcronym = (event) => {
    const baseAcronym = event.target.value;
    this.setState({ baseAcronym })
    this.getRate(baseAcronym, this.state.quoteAcronym);
    this.getHistoricalRates(baseAcronym, this.state.quoteAcronym)
  }

  changeBaseValue = (event) => {
    const quoteValue = this.convert(event.target.value, this.state.rate, this.toQuote);
    this.setState({
      baseValue: event.target.value,
      quoteValue,
    });
  }

  changeQuoteAcronym = (event) => {
    const quoteAcronym = event.target.value;
    this.setState({ quoteAcronym });
    this.getRate(this.state.baseAcronym, quoteAcronym);
    this.getHistoricalRates(this.state.baseAcronym, quoteAcronym)
  }

  changeQuoteValue = (event) => {
    const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
    this.setState({
      quoteValue: event.target.value,
      baseValue,
    });
  }

  render() {
    const { rate, baseAcronym, baseValue, quoteAcronym, quoteValue, loading } = this.state;
    const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);

    return (
      <React.Fragment>
        <div>
          <div className="group">
            <input
              id="base"
              type="number"
              value={baseValue}
              onChange={this.changeBaseValue}
            />

            <select
              value={baseAcronym}
              onChange={this.changeBaseAcronym}
              disabled={loading}>
              {currencyOptions}
            </select>

            <input 
              id="quote"
              type="number"
              value={quoteValue}
              onChange={this.changeQuoteValue} />

            <select

              value={quoteAcronym}
              onChange={this.changeQuoteAcronym}
              disabled={loading}>
                {currencyOptions}
            </select>
            

          </div>

          <div className ="text-center p-3">
            <h4>1 {baseAcronym} to 1 {quoteAcronym} = {rate} {currencies[quoteAcronym].name}</h4>
          </div>
          <canvas ref={this.chartRef} />
          <Footer data={'view2'} />
        </div>
      </React.Fragment>
    )
  }
}


export default CurrencyInput;