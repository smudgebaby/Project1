import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  Button,
  Typography,
  Box,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCartCount,
  selectCartItems, selectCartTotal,
  selectIsCartOpen,
} from '../Store/Cart/cartSelector.js';
import {
  addItemToCart,
  clearItemFromCart, removeItemFromCart,
  setIsCartOpen, updateItemToCart,
} from '../Store/Cart/cartAction.js';

function Cart({ setCartItems }) {

  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0) return;

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    dispatch(clearItemFromCart())
  };

  return (
    <Dialog open={isCartOpen} onClose={toggleIsCartOpen} fullWidth={true}
    maxWidth="sm"
    PaperProps={{
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 0,
      },
    }}>
    <DialogTitle sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      Cart ({cartCount})
      <IconButton
        onClick={toggleIsCartOpen}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
        {cartItems.map((item, index) => (
          <ListItem key={item.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Grid container spacing={2} alignItems="flex">
              <Grid item xs = {3}>
                <ListItemAvatar>
                <Avatar src={item.imageUrl} alt={item.name} sx={{ 
                  width: 'auto',
                  height: 'auto', 
                  borderRadius: 0,
                  mr:1
                  
                  }}/>
                </ListItemAvatar>
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={2} alignItems="flex" sx={{minWidth: 400, maxHeight:50}}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1">{`$${item.price.toFixed(2)}`}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex">
                  <Grid item>
                    <IconButton onClick={() => dispatch(removeItemFromCart(cartItems, item))} size="small">
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <TextField
                      size="small"
                      value={item.quantity}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      onChange={(event) => {
                        event.preventDefault();
                        dispatch(updateItemToCart(cartItems, item, parseInt(event.target.value)));
                      }}
                      sx={{ width: '40px' }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => dispatch(addItemToCart(cartItems, item))} size="small">
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={7.8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" onClick={() => dispatch(clearItemFromCart(cartItems, item))}>
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
           
          </ListItem>
        ))}
      </List>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Apply Discount Code"
          InputProps={{
            endAdornment: <Button variant="contained">Apply</Button>,
          }}
        />
      </Box>
      {/* Add other cart summary details */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Subtotal: ${cartTotal}</Typography>
        <Typography variant="body1">Tax: $49.90</Typography>
        <Typography variant="body1">Discount: -$20.00</Typography>
        <Typography variant="h6">Estimated total: $429.10</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" size="large">
          Continue to checkout
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);
}


export default Cart;