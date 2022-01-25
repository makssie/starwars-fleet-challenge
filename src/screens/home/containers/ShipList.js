import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'

import Ship from '../components/Ship'

const renderShipList = (data, query) => {
  if (isEmpty(data)) {
    return null;
  }
  let { results: starships , count: totalItems  } = data;
  return (
    <>
      <h3>Search results for: {query}</h3>
      <p>Total results: {totalItems}</p>
      <div className="ships-list">
        {starships.map(ship =>  <Ship key={ship.url} ship={ship} />)} 
      </div>
    </>
  )
}


const Ships = ({ data, isFetching, query, error }) => {
  let jsxStr = ''
  if (isFetching) {
    jsxStr = <p>Loading...</p>
  } else if (!isEmpty(error)) {
    jsxStr = JSON.stringify(error)
  } else {
    jsxStr = renderShipList(data, query);
  }
  return (
    <div className="ships">
      {jsxStr}
    </div>
  )
}

const mapStateToProps = (state) => {
  let { data, isFetching, query, error } = state.ships
  return {
    data,
    isFetching,
    query,
    error
  }
}

export default connect(
  mapStateToProps,
  null
)(Ships);