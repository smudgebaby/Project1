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

function Cart({ open, handleClose, cartItems, setCartItems }) {
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 0) return;

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}
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
      Cart ({cartItems.length})
      <IconButton
        onClick={handleClose}
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
                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} size="small">
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <TextField
                      size="small"
                      value={item.quantity}
                      inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      onChange={(event) => handleUpdateQuantity(item.id, parseInt(event.target.value))}
                      sx={{ width: '40px' }}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={7.8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="text" onClick={() => handleRemoveItem(item.id)}>
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
        <Typography variant="body1">Subtotal: $499.00</Typography>
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