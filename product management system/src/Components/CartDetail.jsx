import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
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
  selectCartCount, selectCartDiscount,
  selectCartItems, selectCartTotal, selectEstimateTotal,
  selectIsCartOpen,
} from '../Store/Cart/cartSelector.js';
import {
  addItemToCart,
  clearItemFromCart, removeItemFromCart, setCartDiscount,
  setIsCartOpen, updateItemToCart,
} from '../Store/Cart/cartAction.js';
import {useState} from 'react';

function Cart() {

  const [couponCode, setCouponCode] = useState('');
  const [isInvalidCoupon, setIsInvalidCoupon] = useState(false);

  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartDiscount = useSelector(selectCartDiscount);
  const estimateTotal = useSelector(selectEstimateTotal);

  const handleCouponApply = async () => {
    try {
      const response = await fetch(`http://localhost:3000/coupon/getByCode/${couponCode}`, {
        method: 'GET',
      });
      const body = await response.json();
      if (body.res === 'Invalid Coupon!') {
        setIsInvalidCoupon(true);
        dispatch(setCartDiscount(0));
      } else {
        setIsInvalidCoupon(false);
        dispatch(setCartDiscount(body.discountValue));
      }
    } catch (error) {
      console.error('Error fetching coupon data:', error);
    }
  }

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
                  width: 100,
                  height: 100, 
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
                        if (!event.target.value === false) {
                          dispatch(updateItemToCart(cartItems, item, parseInt(event.target.value)));
                        }
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
      {isInvalidCoupon && (
        <span style={{
          'color': 'red',
          'margin': '0.5rem'
        }}>Invalid Coupon!</span>
      )}
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Apply Discount Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          InputProps={{
            endAdornment: <Button variant="contained" onClick={handleCouponApply}>Apply</Button>,
          }}
        />
      </Box>
      {/* Add other cart summary details */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Subtotal: ${cartTotal}</Typography>
        <Typography variant="body1">Tax: $0</Typography>
        <Typography variant="body1">Discount: -${cartDiscount}</Typography>
        <Typography variant="h6">Estimated total: ${estimateTotal}</Typography>
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