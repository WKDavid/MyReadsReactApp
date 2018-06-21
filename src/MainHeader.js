import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainHeader extends Component {
  render() {
    return (
      <div className="mainHeader">
        <h1>MyReads</h1>
        <Link className="searchButton" to="/search"></Link>
      </div>
    )
  }
}

export default MainHeader;
