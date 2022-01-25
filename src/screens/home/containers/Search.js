import React from 'react';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import SearchIcon from "@mui/icons-material/Search";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getShips } from '../../../actions'
import debounce from 'lodash/debounce'
import { IconButton, InputAdornment, TextField } from '@mui/material';

const Search = ({ query, getShips  }) => {
  const debouncedGetShips = debounce(query => {
    getShips(query);
  }, 700);

  const onInputChange = e => {
    debouncedGetShips(e.target.value)
  }

  return (
    <div className="search-ships">
    <TextField
      label="Type a star wars shipstar name."
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      onChange={onInputChange}
    />
    </div>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    query: state.ships.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getShips,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);