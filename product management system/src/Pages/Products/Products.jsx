import {useState, useEffect} from 'react';
import {
    Button,
    Card, CardMedia, CardContent, CardActions,
    Container, Box,
    Pagination,
    Grid, InputAdornment, InputLabel, MenuItem, Select, styled,
    TextField,
    Typography, useMediaQuery, useTheme,
  } from '@mui/material';
import {addItemToCart} from '../../Store/Cart/cartAction.js';
import {useDispatch, useSelector} from 'react-redux';
import {selectCartItems} from '../../Store/Cart/cartSelector.js';
import { useNavigate } from 'react-router-dom';
import {selectCurrentUser} from '../../Store/User/userSelector.js';

function formatPrice(price) {
return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(price);
}


function Products(){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [sort, setSort] = useState("low-high");
    const [products, setProducts] = useState([
        // {
        //     id: 1,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/1.png',

        // },
        // {
        //     id: 2,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/2.png',
        // },
        // {
        //     id: 3,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/3.png',
        // },
        // {
        //     id: 4,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/4.png',

        // },
        // {
        //     id: 5,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/5.png',

        // },
        // {
        //     id: 6,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/6.png',

        // },
        // {
        //     id: 7,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/7.png',

        // },
        // {
        //     id: 8,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/8.png',

        // },
        // {
        //     id: 9,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/9.png',

        // },
        // {
        //     id: 10,
        //     name: 'Apple Iphone 11, 128G',
        //     price: 499,
        //     imageUrl: '/10.png',

        // },
      
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = async () => {
        const sortCriteria = sort === 'low-high' ? 'priceLowToHigh' : sort === 'high-low' ? 'priceHighToLow' : 'newest';
        try {
            console.log(sortCriteria);
            const response = await fetch(`http://localhost:3000/product/page/${currentPage}/${sortCriteria}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sort, currentPage]);

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
                <Grid container pt= {isMobile ? 0: 0} spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg= {isMobile ? 12: 12/5} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ mt: 1, mr: 1, mb: 1, ml: 1, width:'92%' }}
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
                                    <Button variant="contained" sx={{width: '82px', ml:0.5} } onClick={() => dispatch(addItemToCart(cartItems, product))}>Add</Button>
                                    {currentUser && currentUser.role === 2 && <Button variant="outlined" sx={{width: '82px'}} size="small">Edit</Button>}
                                </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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