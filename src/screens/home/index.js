import React from 'react';
import Search from './containers/Search'
import ShipList from './containers/ShipList'
import Fleet from './containers/Fleet'
import './home.css'


const Home = () => (
  <div id="home" className="page">
    <div className="home-container">
      <div>
        <Search />
        <ShipList />
      </div>
      <div>
        Frota
        <Fleet />
      </div>
      
    </div>
  </div>
)
export default Home;