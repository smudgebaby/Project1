import {IconButton, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';
import {useState} from 'react';

function SearchBox({setSearchInfo}) {
  const [text, setText] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInfo(text);
  }


  return (
    <Paper elevation='2' className='search-box'>
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='input-box'
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon onClick={(event) => handleSearch(event)}/>
      </IconButton>
    </Paper>
  );
}

export default SearchBox;