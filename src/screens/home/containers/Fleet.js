import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty'

import FleetShip from '../components/FleetShip'

const renderShipList = (fleet) => {
  return (
    <>
      <div className="ships-list-fleet">
        {fleet.map((ship, index) => <FleetShip key={index} selectedNumber={index} starship={ship} />)}
      </div>
    </>
  )
}


const Fleet = ({ fleet }) => {
  let jsxStr = ''

  if (isEmpty(fleet)) {
    return <p> Add a ship </p>;
  } else {
    jsxStr = renderShipList(fleet);
  }
  return (
    <div className="ships">
      {jsxStr}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fleet: state.ships.fleet
  }
}

export default connect(
  mapStateToProps,
  null
)(Fleet);