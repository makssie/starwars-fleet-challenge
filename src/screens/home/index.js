import React from 'react';
import Search from './containers/Search'
import ShipList from './containers/ShipList'
import Fleet from './containers/Fleet'
import './home.css'


const Home = () => (
  <div id="home" className="page">
    <h1>Star Fleet Manager</h1>
    <div className="home-container">
      <div style={{flexGrow: 2, paddingRight: 30}}>
        <Search />
        <ShipList />
      </div>
      <div className="fleet-container">
        <h2>Your Fleet</h2>
        <Fleet />
      </div>
      
    </div>
  </div>
)
export default Home;