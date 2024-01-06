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
                  width: 'auto',
                  height: 'auto', 
                  borderRadius: 0,
                  mr:1
                  
                  }}/>
                </ListItemAvatar>
              </Grid>
              <Grid item xs={9} 
              // sx={{ display: 'flex', justifyContent: 'space-between', flexWrap:'wrap'}}
              >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 'auto', height: 50, mt:-2, mb:3 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="subtitle1">{`$${item.price.toFixed(2)}`}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 'auto', height: 50, }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    size="small"
                    value={item.quantity}
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                    onChange={(event) => handleUpdateQuantity(item.id, parseInt(event.target.value))}
                    sx={{ width: '40px' }}
                  />
                  <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button variant="text" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </Box>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">$400.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Tax:</Typography>
          <Typography variant="body1">$49.90</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Discount:</Typography>
          <Typography variant="body1">-$20.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6">Estimated total:</Typography>
          <Typography variant="h6">$429.90</Typography>
        </Box>
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