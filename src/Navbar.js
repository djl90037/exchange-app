import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = (props) => {
  return (
    <React.Fragment>
      <nav className="nav">
        <Link to="/" className="site-title">
          Currency Conversion
        </Link>
        <ul>
          <CustomLink to="/">Currency Converter</CustomLink>
          <CustomLink to="/ExchangeRates">Exchange Rates</CustomLink>
        </ul>
      </nav>
      {/* <div className="container">
        {props.children}
      </div> */}
    </React.Fragment>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar