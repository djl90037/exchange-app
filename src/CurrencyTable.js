// CurrencyTable.js

import React from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import { Link } from "react-router-dom";


const CurrencyTable = (props) => {
    const { base, rates } = props;
    if (!rates) {
        return null;
    }
    return (
        <React.Fragment>

            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rates.map((currency) => (
                            <tr key={currency.acronym}>
                                <td>{currency.name} <small>{currency.acronym}</small></td>
                                <td>{currency.rate.toFixed(6)}</td>
                            </tr>
                        ))}
                </tbody>


            </ReactBootStrap.Table>

        </React.Fragment>

    )
}

export default CurrencyTable