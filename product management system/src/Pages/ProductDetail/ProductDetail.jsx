import React from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  makeStyles, useMediaQuery,
  useTheme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../../Store/User/userSelector.js';
import {useLocation, useNavigate} from 'react-router-dom';
import {addItemToCart} from '../../Store/Cart/cartAction.js';
import {selectCartItems} from '../../Store/Cart/cartSelector.js';

function ProductDetail() {
  const matches = useMediaQuery("(min-width:950px)");
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const location = useLocation();
  const product = location.state?.product;

  const handleEditProduct = (product) => {
    navigate('/edit', { state: { product } });
  };

  return (
    <Container sx={{m: 10}}>
      <Typography variant="h5" gutterBottom>
        Product Detail
      </Typography>
      <Card sx={matches ? { display: "flex", alignItems: "center" } : {}}>
        <CardMedia
          component="img"
          image={product.image}
          title="Product Image"
          sx={matches ? {maxWidth: "50%"} : {}}
        />
        <CardContent sx={{display: "flex", flexDirection: "column", gap: 2, m: 5}}>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <Typography variant="h6">
            ${product.price}

            {product.quantity === 0 ? <Chip label="Out of Stock" sx={{m: 1, backgroundColor: 'pink'}}/> : <Chip label="In Stock" sx={{m: 1, backgroundColor: 'green', color: 'white'}}/>}
          </Typography>
          <Box sx={matches ? {display: "flex", gap: 2} : {display: "flex", justifyContent: "space-evenly"}}>
            <Button variant="contained" color="primary" sx={{width: 1/3} } onClick={() => dispatch(addItemToCart(cartItems, product))}>Add Product</Button>
            {currentUser && currentUser.role === 2 && <Button variant="outlined" sx={{width: 1/3}} onClick={() => handleEditProduct(product)}>Edit</Button>}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetail;
