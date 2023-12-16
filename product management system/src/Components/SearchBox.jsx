import {IconButton, InputBase, Paper} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.css';

function SearchBox() {
  return (
    <Paper elevation='2' className='search-box'>
      <InputBase
        sx={{ ml: 1, flex: 1}}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products' }}
        className='input-box'
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBox;