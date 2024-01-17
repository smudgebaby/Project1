import {useState, useEffect} from 'react';
import {
    Button,
    Card, CardMedia, CardContent, CardActions,
    Container, Box,
    Pagination,
    IconButton,
    Grid, InputAdornment, InputLabel, MenuItem, Select, styled,
    TextField,
    Typography, useMediaQuery, useTheme,
  } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartItems} from '../../Store/Cart/cartSelector.js';
import { useNavigate } from 'react-router-dom';
import {selectCurrentUser} from '../../Store/User/userSelector.js';
import {
    addItemToCart,
    removeItemFromCart,
     updateItemToCart,
  } from '../../Store/Cart/cartAction.js';
import LoadSpinner from '../../Components/LoadSpinner.jsx';
import './Products.css'

function formatPrice(price) {
return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);
}


function Products({searchInfo, products, setProducts}){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [sort, setSort] = useState("low-high");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        const sortCriteria = sort === 'low-high' ? 'priceLowToHigh' : sort === 'high-low' ? 'priceHighToLow' : 'newest';
        try {
            console.log(searchInfo);
            const response = await fetch(`http://localhost:3000/product/page/${currentPage}/${sortCriteria}/${searchInfo}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        } finally {
        setLoading(false);
        }
    };
    const handleDeleteProduct = async (productId) => {
        try {
         
          const response = await fetch(`http://localhost:3000/product/delete/${productId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete the product');
          }
      
          alert('Product successfully deleted.');
      
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
          alert('Error deleting product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sort, currentPage, searchInfo]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/create');
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    }

    const handleEditProduct = (product) => {
        navigate('/edit', { state: { product } });
    };

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectCurrentUser);

    return(
        <>
            <Container maxWidth="xl" sx={{mt: isMobile ? 0: 5, mb:5}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  flexWrap: isMobile ? 'wrap': '', mt: isMobile ? 2 : 2, mb:3 }}>
                    <Typography variant="h3" component="h2" gutterBottom 
                        sx={{ 
                            fontSize: '2rem', 
                            fontWeight: 'bold' 
                        }}>
                        Products
                    </Typography>
                    <Box>
                        {/* <InputLabel id="sort-price-label">Price:</InputLabel> */}
                        <Select
                        labelId="sort-price-label"
                        id="sort-price-select"
                        value={sort}
                        label="Price"
                        onChange={handleSortChange}
                        sx={{ height:40, mr: 2, minWidth: 160 }}
                        >
                        <MenuItem value="last-added">Last Added</MenuItem>
                        <MenuItem value="low-high">Price: low to high</MenuItem>
                        <MenuItem value="high-low">Price: high to low</MenuItem>
                        </Select>

                        {currentUser && currentUser.role === 2 && <Button variant="contained" color="primary" sx= {{height:40, mt:-0.5}} onClick={handleAddProduct}>
                            Add Product
                        </Button>}
                    </Box>
                </Box>
                {loading? <LoadSpinner /> : (
                <Grid container pt= {isMobile ? 0: 0} spacing={4}>
                    {products.map((product) => {
                    
                        const cartItem = cartItems.find(item => item._id === product._id);
                        const isInCart = cartItem && cartItem.quantity > 0;

                    return (
                    
                        <Grid item xs={12} sm={6} md={4} lg= {isMobile ? 12: 12/5} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ mt: 1, mr: 1, mb: 1, ml: 1, width:'92%', height: '15rem', cursor: 'pointer' }}
                                    onClick={() => navigate('detail', { state: { product } })}
                                    />
                                <CardContent sx={{mt: -2, mb:-2}}>
                                    <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{
                                        fontWeight: 'bold'
                                    }}>
                                        {formatPrice(product.price)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                <Box sx={{display: 'flex', justifyContent: 'space-between',  gap: 1, mb:1}}>
                                    {!isInCart ? (
                                        <Button variant="contained" sx={{ width: currentUser && currentUser.role === 2 ? '75px': '122px'}} onClick={() => dispatch(addItemToCart(cartItems, product))}>Add</Button>
                                    ) : (
                                        <Box sx={{ width: currentUser && currentUser.role === 2 ? '75px': '122px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0 }}>
                                            <IconButton onClick={() => dispatch(removeItemFromCart(cartItems, cartItem))} size="small">
                                                <RemoveIcon fontSize='small'/>
                                            </IconButton>
                                            <TextField
                                                size="small"
                                                value={cartItem.quantity}
                                                inputProps={{ min: 1, style: { textAlign: 'center', padding: '6px 0', fontSize: '0.8rem'} }}
                                                onChange={(event) => {
                                                    event.preventDefault();
                                                    const newQuantity = parseInt(event.target.value);
                                                    if (newQuantity) {
                                                        dispatch(updateItemToCart(cartItems, cartItem, newQuantity));
                                                    }
                                                }}
                                                sx={{ width: '30px', '& .MuiInputBase-input': { padding: '6px 0', fontSize: '0.8rem' } }}
                                            />
                                            <IconButton onClick={() => dispatch(addItemToCart(cartItems, cartItem))} size="small">
                                                <AddIcon fontSize='small'/>
                                            </IconButton>
                                        </Box>
                                    )}
                                    {currentUser && currentUser.role === 2 && (
                                    <>
                                        <Button variant="outlined" sx={{width: '75px'}} size="small" onClick={() => handleEditProduct(product)}>Edit</Button>
                                        <Button variant="outlined" color="error" sx={{ width: '75px' }} size="small" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    </>
                                    )}
                                </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
                
                </Grid>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Pagination 
                    count={totalPages}
                    color="primary" 
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ width: 'auto' , mt:5}} 
                />
                </Box>    
            </Container>
        </>
    )
}
export default Products;