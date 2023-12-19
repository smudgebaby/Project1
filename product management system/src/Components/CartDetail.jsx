import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Cart({ open, handleClose, cartItems }) {
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
      <List>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
            {/* Add Quantity Selector */}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(item.id)}>
                {/* You can add a remove icon here */}
              </IconButton>
            </ListItemSecondaryAction>
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